"use client";
import { useEffect, useState, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import StatsCards from "@/components/admin/StatsCards";
import RecentProducts from "@/components/admin/RecentProducts";
import RecentMessages from "@/components/admin/RecentMessages";
import CategoryChart from "@/components/admin/CategoryChart";
import TopFavorites from "@/components/admin/TopFavorites";
import StatDetailModal from "@/components/admin/StatDetailModal";
import { logger } from "@/lib/logger";
import { env } from "@/env";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  activeOffers: number;
  unreadMessages: number;
  totalFavorites: number;
  totalCategories: number;
  totalUsers: number;
}

type ModalType =
  | "products"
  | "categories"
  | "offers"
  | "messages"
  | "favorites"
  | "users"
  | null;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeOffers: 0,
    unreadMessages: 0,
    totalFavorites: 0,
    totalCategories: 0,
    totalUsers: 0,
  });

  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  const [categoryData, setCategoryData] = useState<any[]>([]);

  const [topFavorites, setTopFavorites] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedModalType, setSelectedModalType] = useState<ModalType>(null);

  // ─── Quick notification widget state ───
  const [notifForm, setNotifForm] = useState({
    title: "",
    message: "",
    type: "manual",
    target_url: "",
  });
  const [notifSending, setNotifSending] = useState(false);

  const handleSendNotification = useCallback(async () => {
    if (!notifForm.title.trim() || !notifForm.message.trim()) {
      toast.error("Título y mensaje son requeridos");
      return;
    }
    setNotifSending(true);
    const supabase = getSupabaseClient();
    try {
      const { data: notif, error } = await supabase
        .from("notifications")
        .insert({
          type: notifForm.type,
          title: notifForm.title.trim(),
          message: notifForm.message.trim(),
          target_url: notifForm.target_url.trim() || null,
        })
        .select("id")
        .single();

      if (error || !notif) throw error ?? new Error("Insert failed");

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const res = await fetch(
          `${env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-push`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token ?? ""}`,
            },
            body: JSON.stringify({ notification_id: notif.id }),
          }
        );
        const result = (await res.json()) as { sent?: number };
        toast.success(`Notificación enviada — ${result.sent ?? 0} push`);
      } catch {
        toast.success("Notificación creada (Push no disponible)");
      }

      setNotifForm({ title: "", message: "", type: "manual", target_url: "" });
    } catch (err) {
      toast.error("Error enviando notificación");
      logger.error("Quick notif error:", err);
    } finally {
      setNotifSending(false);
    }
  }, [notifForm]);

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_dashboard_data");

        if (error) {
          logger.error("RPC Error:", error);
          throw error;
        }
        if (!isMounted) return;

        if (data) {
          const source = data.summary || data;
          setStats({
            totalProducts: Number(source.totalProducts || 0),
            activeOffers: Number(source.activeOffers || 0),
            unreadMessages: Number(source.unreadMessages || 0),
            totalFavorites: Number(source.totalFavorites || 0),
            totalCategories: Number(source.totalCategories || 0),
            totalUsers: Number(source.totalUsers || 0),
          });
          setRecentProducts(data.recentProducts || []);
          setRecentMessages(data.recentMessages || []);
          setCategoryData(data.categoryData || []);
          setTopFavorites(data.topFavorites || []);
        }
      } catch (error) {
        logger.error("Dashboard fetch error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const statCardsData = [
    {
      id: "products",
      label: "Productos",
      value: loading ? "..." : stats.totalProducts,
      icon: "inventory_2",
      colorClass: "bg-primary/10 text-primary dark:bg-primary/20",
    },
    {
      id: "categories",
      label: "Categorías",
      value: loading ? "..." : stats.totalCategories,
      icon: "category",
      colorClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    },
    {
      id: "offers",
      label: "Ofertas Activas",
      value: loading ? "..." : stats.activeOffers,
      icon: "local_offer",
      colorClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      id: "messages",
      label: "Mensajes Nuevos",
      value: loading ? "..." : stats.unreadMessages,
      icon: "mark_email_unread",
      colorClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    },
    {
      id: "favorites",
      label: "Favoritos",
      value: loading ? "..." : stats.totalFavorites,
      icon: "favorite",
      colorClass:
        "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
    },
    {
      id: "users",
      label: "Usuarios",
      value: loading ? "..." : stats.totalUsers,
      icon: "group",
      colorClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-[1400px] space-y-6 pb-10 md:space-y-8">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900 md:mb-2 md:text-3xl dark:text-white">
            Panel de Control
          </h1>
          <p className="text-sm text-slate-500 md:text-base dark:text-slate-400">
            Resumen y estadísticas de Confecciones Liss.
          </p>
        </div>

        <StatsCards
          stats={statCardsData}
          onCardClick={(id) => setSelectedModalType(id as ModalType)}
        />

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Left - 2 cols on XL */}
          <div className="space-y-6 md:space-y-8 xl:col-span-2">
            <div className="h-[400px]">
              <RecentProducts products={recentProducts} loading={loading} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="h-[350px]">
                <CategoryChart data={categoryData} loading={loading} />
              </div>
              <div className="h-[350px]">
                <TopFavorites products={topFavorites} loading={loading} />
              </div>
            </div>
          </div>

          {/* Right - 1 col */}
          <div className="h-[400px] xl:h-[782px]">
            <RecentMessages messages={recentMessages} loading={loading} />
          </div>
        </div>

        <StatDetailModal
          isOpen={!!selectedModalType}
          type={selectedModalType}
          onClose={() => setSelectedModalType(null)}
        />

        {/* ── Quick Notification Widget ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                campaign
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Enviar Notificación
              </h2>
            </div>
            <Link
              href="/admin/notificaciones"
              className="text-primary/70 hover:text-primary text-xs font-medium transition-colors"
            >
              Ver historial →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                id="quick-notif-title"
                type="text"
                placeholder="Título *"
                value={notifForm.title}
                maxLength={120}
                onChange={(e) =>
                  setNotifForm((p) => ({ ...p, title: e.target.value }))
                }
                className="focus:ring-primary/20 focus:border-primary rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <select
                id="quick-notif-type"
                value={notifForm.type}
                onChange={(e) =>
                  setNotifForm((p) => ({ ...p, type: e.target.value }))
                }
                className="focus:ring-primary/20 focus:border-primary rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="manual">📢 Manual</option>
                <option value="new_product">✨ Nuevo producto</option>
                <option value="new_offer">🏷️ Oferta</option>
                <option value="info">ℹ️ Info</option>
              </select>
            </div>
            <textarea
              id="quick-notif-message"
              placeholder="Mensaje *"
              value={notifForm.message}
              maxLength={300}
              rows={2}
              onChange={(e) =>
                setNotifForm((p) => ({ ...p, message: e.target.value }))
              }
              className="focus:ring-primary/20 focus:border-primary w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <div className="flex items-center gap-3">
              <input
                id="quick-notif-url"
                type="text"
                placeholder="URL destino (opcional)"
                value={notifForm.target_url}
                onChange={(e) =>
                  setNotifForm((p) => ({ ...p, target_url: e.target.value }))
                }
                className="focus:ring-primary/20 focus:border-primary min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <button
                id="quick-notif-send"
                type="button"
                disabled={
                  notifSending ||
                  !notifForm.title.trim() ||
                  !notifForm.message.trim()
                }
                onClick={handleSendNotification}
                className="bg-primary hover:bg-primary/90 flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {notifSending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                )}
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
