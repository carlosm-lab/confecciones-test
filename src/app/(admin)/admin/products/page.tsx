"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";
import { useDebounce } from "@/hooks/useDebounce";
import { logger } from "@/lib/logger";
import { applyActiveOfferFilter } from "@/lib/productUtils";
import { useConfirm } from "@/context/ConfirmContext";
import { collectProductImageFiles } from "@/lib/storageUtils";
import type { Product } from "@/lib/productUtils";
import type { Category } from "@/hooks/useCategories";
import { CATALOGS } from "@/config/catalogs";

const PAGE_SIZE = 25;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const pageRef = useRef(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [filterCatalog, setFilterCatalog] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterOnSale, setFilterOnSale] = useState(false);

  // Categorías filtradas por catálogo seleccionado
  const filteredCategoryOptions = filterCatalog
    ? categories.filter((c) => c.catalog === filterCatalog)
    : categories;

  const confirm = useConfirm();

  const fetchCategories = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, catalog, created_at")
        .order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      logger.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      setIsLoading(true);
      try {
        const currentPage = isLoadMore ? pageRef.current + 1 : 0;
        const supabase = getSupabaseClient();

        let query = supabase
          .from("products")
          .select(
            `
        id, name, description, price, old_price, offer_ends_at, category, tags, image_path, images, is_active, slug, created_at,
        category_id,
        categories(name)
      `,
            { count: "exact" }
          )
          .order("created_at", { ascending: false });

        if (debouncedSearchTerm) {
          const esc = debouncedSearchTerm.replace(/[%_\\]/g, "\\$&");
          query = query.ilike("name", `%${esc}%`);
        }
        // FIX B3: apply catalog filter to the actual DB query
        if (filterCatalog) {
          const catalogSlugs = categories
            .filter((c) => c.catalog === filterCatalog)
            .map((c) => c.slug);
          // If we have category slugs for this catalog, filter by them.
          // Otherwise use a impossible condition so 0 results show correctly.
          if (catalogSlugs.length > 0) {
            query = query.in("category", catalogSlugs);
          } else {
            query = query.eq("category", "__no_match__");
          }
        }
        if (filterCategory) query = query.eq("category", filterCategory);
        if (filterOnSale) query = applyActiveOfferFilter(query);

        query = query.range(
          currentPage * PAGE_SIZE,
          (currentPage + 1) * PAGE_SIZE - 1
        );

        const { data, count, error } = await query;
        if (error) throw error;

        if (isLoadMore) {
          setProducts((prev) => [...prev, ...(data || [])]);
        } else {
          setProducts(data || []);
        }
        setTotalCount(count || 0);
        setHasMore((currentPage + 1) * PAGE_SIZE < (count || 0));
        pageRef.current = currentPage;
      } catch (error) {
        logger.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      debouncedSearchTerm,
      filterCategory,
      filterOnSale,
      filterCatalog,
      categories,
    ]
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      const supabase = getSupabaseClient();
      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id!);
        if (error) throw error;
        showToast("Producto actualizado correctamente.");
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        showToast("Producto creado correctamente.");
      }
      handleCloseModal();
      fetchData();
    } catch (error: unknown) {
      logger.error("Error saving product:", error);
      showToast(`Error guardando: ${(error as Error).message}`, false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const isConfirmed = await confirm({
      title: "Eliminar producto",
      message:
        "¿Estás seguro de que quieres eliminar este producto de forma permanente? Esta acción no se puede deshacer.",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const validFiles = collectProductImageFiles(product);
      if (validFiles.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("product-images")
          .remove(validFiles);
        if (storageError) logger.error("Error deleting images:", storageError);
      }
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id!);
      if (error) throw error;
      showToast("Producto eliminado permanentemente.");
      fetchData(false);
    } catch (error) {
      logger.error("Error deleting product:", error);
      showToast("Error eliminando el producto.", false);
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    const isConfirmed = await confirm({
      title: "Eliminar productos masivamente",
      message: `¿Estás seguro de que quieres eliminar ${ids.length} productos de forma permanente?`,
      confirmText: "Sí, eliminar todos",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const productsToDelete = products.filter((p) => ids.includes(p.id || ""));
      const validFiles = productsToDelete.flatMap((p) =>
        collectProductImageFiles(p)
      );

      if (validFiles.length > 0) {
        const { error } = await supabase.storage
          .from("product-images")
          .remove(validFiles);
        if (error) logger.error("Error deleting images from storage:", error);
      }

      const { error } = await supabase.from("products").delete().in("id", ids);
      if (error) throw error;
      showToast(`${ids.length} productos eliminados.`);
      fetchData(false);
    } catch (error) {
      logger.error("Error deleting products:", error);
      showToast("Error eliminando los productos.", false);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-[1400px] flex-col">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[300] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all ${toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.ok ? "check_circle" : "error"}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Header & Actions */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">
            Productos
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gestiona tu catálogo y ofertas.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nuevo Producto
        </button>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-col flex-wrap gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row dark:border-white/5 dark:bg-white/5">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-transparent dark:text-white"
          />
        </div>

        {/* Catalog Filter */}
        <div className="relative w-full md:w-48">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              layers
            </span>
          </span>
          <select
            value={filterCatalog}
            onChange={(e) => {
              setFilterCatalog(e.target.value);
              setFilterCategory(""); // reset subcategory on catalog change
            }}
            className="focus:ring-primary/20 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-transparent dark:text-white"
          >
            <option value="">Todos los catálogos</option>
            {CATALOGS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-56">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="focus:ring-primary/20 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-transparent dark:text-white"
          >
            <option value="">Todas las subcategorías</option>
            {filteredCategoryOptions.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* On Sale Filter */}
        <div className="flex items-center gap-2 px-2 md:ml-auto">
          <input
            type="checkbox"
            id="onSaleFilter"
            checked={filterOnSale}
            onChange={(e) => setFilterOnSale(e.target.checked)}
            className="text-primary focus:ring-primary/20 h-5 w-5 cursor-pointer rounded border-slate-300 outline-none dark:border-white/10"
          />
          <label
            htmlFor="onSaleFilter"
            className="cursor-pointer text-sm font-medium text-slate-700 select-none dark:text-slate-300"
          >
            Solo ofertas activas
          </label>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        isLoading={isLoading && products.length === 0}
        onEdit={(product) => handleOpenModal(product)}
        onDelete={(id) => {
          const product = products.find((p) => p.id === id);
          if (product) handleDeleteProduct(product);
        }}
        onBulkDelete={handleBulkDelete}
      />

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchData(true)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-2.5 font-bold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent"></span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">
                expand_more
              </span>
            )}
            Cargar más productos
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-slate-500">
        Mostrando {products.length} de {totalCount} productos
      </div>

      {/* Create/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSaveProduct}
        categories={categories}
      />
    </div>
  );
}
