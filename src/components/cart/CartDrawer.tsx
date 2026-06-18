"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { env } from "@/env";
import toast from "react-hot-toast";
import FocusLock from "react-focus-lock";
import { DEPARTMENTS, getShippingInfo } from "@/lib/shipping";

// Pasos del checkout
type DrawerStep = "cart" | "shipping" | "confirm" | "sent";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    isRefreshingPrices,
    arePricesStale,
    refreshCartPrices,
    shippingInfo,
    setShippingInfo,
  } = useCart();

  const [step, setStep] = useState<DrawerStep>("cart");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  const municipalities = useMemo(() => {
    const dept = DEPARTMENTS.find((d) => d.name === selectedDept);
    return dept?.municipalities ?? [];
  }, [selectedDept]);

  useEffect(() => {
    setSelectedMunicipality("");
  }, [selectedDept]);

  useEffect(() => {
    if (!isCartOpen) {
      setStep("cart");
      setSelectedDept("");
      setSelectedMunicipality("");
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      refreshCartPrices();
    }
  }, [isCartOpen, refreshCartPrices]);

  useBodyScrollLock(isCartOpen);

  const closeDrawer = useCallback(() => {
    setStep("cart");
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isCartOpen, closeDrawer]);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price || 0) * item.quantity;
  }, 0);

  const shippingCost = shippingInfo?.cost ?? 0;
  const grandTotal = subtotal + shippingCost;

  const handleConfirmShipping = () => {
    if (!selectedDept) {
      toast.error("Por favor selecciona un departamento.");
      return;
    }
    if (!selectedMunicipality) {
      toast.error("Por favor selecciona un municipio.");
      return;
    }
    const info = getShippingInfo(selectedDept, selectedMunicipality);
    setShippingInfo(info);
    setStep("confirm");
  };

  const handleWhatsAppOrder = async () => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    let whatsappWindow: Window | null = null;
    if (!isMobileDevice) {
      whatsappWindow = window.open("about:blank", "_blank");
    }

    setIsGeneratingMessage(true);
    let rawMessage = "";

    try {
      const supabase = getSupabaseClient();
      const { data: serverMessage, error } = await supabase.rpc(
        "generate_whatsapp_message",
        {
          items: cartItems,
          store_domain: window.location.origin,
          shipping_department: shippingInfo?.department ?? null,
          shipping_municipality: shippingInfo?.municipality ?? null,
          shipping_cost: shippingInfo?.cost ?? 0,
          shipping_label: shippingInfo?.label ?? null,
        }
      );

      if (error) throw error;
      rawMessage = serverMessage as string;
    } catch (err) {
      logger.error("Error generando mensaje seguro:", err);
      toast.error("Error al generar el pedido. Intenta nuevamente.", {
        duration: 5000,
      });
      if (whatsappWindow) whatsappWindow.close();
      return;
    } finally {
      setIsGeneratingMessage(false);
    }

    if (!rawMessage) {
      toast.error("Error al generar el mensaje. Verifica tu carrito.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    let url = "";
    const rawPhoneNumber = env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    try {
      const { url: safeUrl, usedFallback } = buildWhatsAppUrl(
        rawPhoneNumber,
        rawMessage
      );
      url = safeUrl;
      if (usedFallback) {
        toast.error("El pedido es muy extenso, enviando resumen...", {
          duration: 5000,
        });
      }
    } catch (err) {
      logger.error("Error de configuracion de WhatsApp:", err);
      toast.error("Error de configuracion: Numero de vendedor invalido.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    setStep("sent");

    setTimeout(() => {
      try {
        if (isMobileDevice) {
          window.location.href = url;
        } else {
          if (whatsappWindow) {
            whatsappWindow.location.href = url;
          } else {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }
      } catch (e) {
        logger.error("Error al redirigir a WhatsApp:", e);
        toast(`Abre WhatsApp manualmente al ${rawPhoneNumber}`, { icon: "📱" });
      }
    }, 100);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setShippingInfo(null);
    setStep("cart");
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={`fixed inset-0 z-50 w-full cursor-default bg-slate-900/40 backdrop-blur-sm transition-opacity ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-label="Cerrar carrito"
        tabIndex={isCartOpen ? 0 : -1}
      />

      {/* Drawer */}
      <div
        data-testid="cart-drawer"
        className={`fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-[28rem] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FocusLock
          returnFocus
          disabled={!isCartOpen}
          className="flex h-[100dvh] w-full flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-[var(--space-lg)]">
            <h2 className="flex items-center gap-[var(--space-xs)] font-bold text-[var(--text-xl)] text-slate-900">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "var(--icon-lg)" }}
              >
                shopping_cart
              </span>
              {step === "shipping" ? "Datos de Entrega" : "Tu Carrito"}
            </h2>
            <button
              data-testid="close-cart"
              onClick={closeDrawer}
              className="rounded-full p-[var(--space-xs)] text-gray-400 transition-colors hover:bg-gray-50 hover:text-slate-900"
              aria-label="Cerrar carrito"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="relative flex-1 overflow-y-auto p-[var(--space-lg)]">
            {/* PASO: ENVIADO */}
            {step === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "32px" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  ¡Pedido generado!
                </h3>
                <p className="mb-8 max-w-[250px] text-slate-600">
                  Te hemos redirigido a WhatsApp. ¿Pudiste enviar el mensaje
                  correctamente?
                </p>
                <button
                  onClick={handleFinishAndClear}
                  className="mb-3 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Sí, ya hice mi pedido (Limpiar carrito)
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  No, volver al carrito
                </button>
              </div>
            ) : /* PASO: CONFIRMACIÓN */
            step === "confirm" ? (
              <div className="flex h-full flex-col">
                <button
                  onClick={() => setStep("shipping")}
                  className="mb-6 flex w-max items-center gap-1 font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </button>

                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  Confirmar Pedido
                </h3>
                <div className="mb-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="border-primary mb-4 border-l-2 pl-3 text-sm leading-relaxed text-slate-600">
                    Serás redirigido a WhatsApp para enviar el pedido.
                  </p>

                  {/* Productos */}
                  <div className="mb-4 space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="line-clamp-1 pr-2 text-slate-700">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="shrink-0 font-medium text-slate-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info de envío */}
                  {shippingInfo && (
                    <div className="mb-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px] text-slate-400">
                        local_shipping
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">
                          Entrega a {shippingInfo.municipality},{" "}
                          {shippingInfo.department}
                        </p>
                        <p>{shippingInfo.label}</p>
                      </div>
                    </div>
                  )}

                  {/* Totales */}
                  <div className="space-y-1 border-t border-slate-200 pt-3">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal productos</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Envío estimado</span>
                      <span>
                        {shippingCost === 0
                          ? "Gratis"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold">
                      <span className="text-slate-900">Total Estimado</span>
                      <span className="text-primary">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isGeneratingMessage || cartItems.length === 0}
                    className="flex w-full items-center justify-center gap-[var(--space-xs)] rounded-xl bg-[var(--color-whatsapp)] py-[var(--space-md)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-whatsapp-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "var(--icon-md)" }}
                    >
                      {isGeneratingMessage ? "hourglass_top" : "chat"}
                    </span>
                    {isGeneratingMessage
                      ? "Verificando..."
                      : "Confirmar e Ir a WhatsApp"}
                  </button>
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full rounded-xl py-2 font-bold text-slate-600 transition-colors hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : /* PASO: ENVÍO */
            step === "shipping" ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep("cart")}
                  className="flex w-max items-center gap-1 font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </button>

                <div>
                  <h3 className="mb-1 text-xl font-bold text-slate-900">
                    ¿A dónde enviamos?
                  </h3>
                  <p className="text-sm text-slate-500">
                    Selecciona tu ubicación para calcular el costo de envío.
                  </p>
                </div>

                {/* Referencia de zonas */}
                <div className="grid grid-cols-1 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-slate-700">
                      <strong>San Miguel</strong> — Gratis (punto de entrega)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-slate-700">
                      <strong>Zona Oriental</strong> (Usulután, La Unión,
                      Morazán) — $1 a $3
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-slate-700">
                      <strong>Resto del país</strong> — $3 a $5
                    </span>
                  </div>
                </div>

                {/* Selector departamento */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="shipping-dept"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Departamento
                  </label>
                  <select
                    id="shipping-dept"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none"
                  >
                    <option value="">Selecciona tu departamento...</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector municipio */}
                {selectedDept && (
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="shipping-muni"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Municipio
                    </label>
                    <select
                      id="shipping-muni"
                      value={selectedMunicipality}
                      onChange={(e) => setSelectedMunicipality(e.target.value)}
                      className="focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none"
                    >
                      <option value="">Selecciona tu municipio...</option>
                      {municipalities.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Preview costo */}
                {selectedDept && selectedMunicipality && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm">
                    <p className="font-semibold text-green-800">
                      Costo estimado a {selectedMunicipality}:
                    </p>
                    <p className="text-green-700">
                      {
                        getShippingInfo(selectedDept, selectedMunicipality)
                          .label
                      }
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <button
                    onClick={handleConfirmShipping}
                    disabled={!selectedDept || !selectedMunicipality}
                    className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Confirmar ubicación
                  </button>
                </div>
              </div>
            ) : /* CARRITO VACÍO */
            cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                <span
                  className="material-symbols-outlined mb-[var(--space-md)] text-gray-200"
                  style={{ fontSize: "var(--icon-hero)" }}
                >
                  remove_shopping_cart
                </span>
                <p className="mb-[var(--space-lg)]">Tu carrito está vacío.</p>
                <button
                  onClick={closeDrawer}
                  className="rounded-full border border-slate-100 bg-white px-8 py-3 font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              /* ITEMS DEL CARRITO */
              <div className="flex flex-col gap-[var(--space-sm)]">
                {cartItems.map((item) => {
                  if (!item || !item.product) return null;
                  return (
                    <div
                      data-testid="cart-item"
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-[var(--color-primary-container)] bg-white p-3 shadow-[0_1px_3px_rgba(20,48,103,0.06)]"
                    >
                      <Link
                        href={
                          item.product.slug
                            ? `/catalogo/${item.product.slug}`
                            : "#"
                        }
                        onClick={closeDrawer}
                        className={`aspect-[4/5] w-[clamp(4rem,14vw,5.5rem)] shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-container-low)] ${
                          !item.product.slug && "pointer-events-none opacity-80"
                        }`}
                      >
                        <Image
                          loading="lazy"
                          src={
                            item.product.image_path ||
                            item.product.images?.[0] ||
                            "https://placehold.co/200x240?text=Sin+Imagen"
                          }
                          alt={item.product.name}
                          width={88}
                          height={110}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between gap-1">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-sm font-bold text-[var(--color-on-surface)]">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Eliminar producto"
                              className="shrink-0 rounded-md p-1 text-[var(--color-outline)] transition-colors hover:bg-red-50 hover:text-[var(--color-tertiary)]"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                delete
                              </span>
                            </button>
                          </div>
                          <p className="text-primary mt-0.5 text-base font-extrabold">
                            {formatPrice(item.product.price)}
                          </p>
                          {(item.color || item.note) && (
                            <div className="mt-1 space-y-0.5 text-[11px] text-[var(--color-on-surface-variant)]">
                              {item.color && <p>Color: {item.color}</p>}
                              {item.note && (
                                <p className="line-clamp-1 italic">
                                  {item.note}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-1 flex items-center">
                          <div className="flex w-max items-center rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)]">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Disminuir cantidad"
                              disabled={item.quantity <= 1}
                              className="hover:text-primary flex aspect-square w-8 items-center justify-center text-[var(--color-on-surface-variant)] transition-colors disabled:opacity-30"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                              >
                                remove
                              </span>
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-[var(--color-on-surface)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="hover:text-primary flex aspect-square w-8 items-center justify-center text-[var(--color-on-surface-variant)] transition-colors"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                              >
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer — solo en paso carrito con items */}
          {step === "cart" && cartItems.length > 0 && (
            <div className="mt-auto border-t-2 border-[var(--color-primary-container)] bg-white p-[var(--space-lg)]">
              <div className="mb-[var(--space-md)] flex items-start gap-2 rounded-lg border border-[var(--color-primary-container)] bg-[var(--color-surface-container-low)] p-3 text-xs text-[var(--color-on-surface-variant)]">
                <span className="material-symbols-outlined text-primary mt-0.5 shrink-0 text-[16px]">
                  schedule
                </span>
                <p>
                  Tus productos están reservados en este dispositivo por{" "}
                  <strong className="text-[var(--color-on-surface)]">
                    7 días
                  </strong>
                  .
                </p>
              </div>

              {arePricesStale && (
                <div className="mb-[var(--space-md)] flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px]">
                      error
                    </span>
                    <p>
                      <strong>Atención:</strong> No pudimos verificar los
                      precios actualizados.
                    </p>
                  </div>
                  <button
                    onClick={() => refreshCartPrices()}
                    className="mt-1 flex items-center gap-1 self-start rounded bg-red-100 px-3 py-1.5 font-bold text-red-900 transition-colors hover:bg-red-200"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      refresh
                    </span>
                    Reintentar conexión
                  </button>
                </div>
              )}

              <div className="mb-[var(--space-md)] flex items-end justify-between">
                <span className="text-sm font-medium text-[var(--color-on-surface-variant)]">
                  Subtotal:
                </span>
                <span className="text-primary font-black text-[var(--text-2xl)]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                data-testid="checkout-button"
                onClick={() => setStep("shipping")}
                disabled={isRefreshingPrices}
                className={`flex w-full items-center justify-center gap-[var(--space-xs)] rounded-xl bg-[var(--color-whatsapp)] py-[var(--space-md)] font-bold text-white shadow-md transition-colors hover:bg-[var(--color-whatsapp-hover)] ${
                  isRefreshingPrices ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isRefreshingPrices
                  ? "Actualizando precios..."
                  : "Continuar con el pedido"}
                {!isRefreshingPrices && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "var(--icon-md)" }}
                  >
                    arrow_forward
                  </span>
                )}
              </button>
            </div>
          )}
        </FocusLock>
      </div>
    </>
  );
}
