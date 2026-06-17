# 📦 Sistema de Precios Avanzado + WhatsApp Natural

**Fecha:** 2026-06-17  
**Commit:** `ccd9543`  
**Branch:** `desarrollo`

---

## Resumen

Se implementó el sistema completo de precios avanzados para Confecciones Liss, incluyendo:

- **Tipos de oferta**: 5 tipos (temporal, indefinida, nuevos usuarios, clientes frecuentes, por talla)
- **Oferta indefinida**: Toggle que elimina la fecha de vencimiento de la oferta
- **Precios de mayoreo**: Precio especial con cantidad mínima requerida (mín. 2 unidades)
- **Precios de mano de obra**: Para cuando el cliente trae su propia tela
- **Envíos regionalizados**: 14 departamentos + municipios de El Salvador
- **Mensaje WhatsApp natural**: Un solo párrafo fluido con validación anti-tampering en DB

---

## Archivos Modificados

| Archivo                                 | Tipo      | Descripción                                           |
| --------------------------------------- | --------- | ----------------------------------------------------- |
| `src/lib/shipping.ts`                   | NUEVO     | Zonas de envío El Salvador: LOCAL, ORIENTAL, NACIONAL |
| `src/lib/productUtils.ts`               | MOD       | Nuevos tipos: OfferType, campos wholesale/labor       |
| `src/lib/catalogService.ts`             | MOD       | DbProduct extendido con nuevos campos                 |
| `src/context/CartContext.tsx`           | MOD       | shippingInfo + setShippingInfo en contexto            |
| `src/components/cart/CartDrawer.tsx`    | REESCRITO | Flujo 4 pasos con selector de envío                   |
| `src/components/admin/ProductModal.tsx` | MOD       | Sección precios avanzados + tipos de oferta           |
| Supabase DB                             | MIGRACIÓN | 4 columnas nuevas en `products`                       |
| Supabase RPC                            | NUEVO     | `generate_whatsapp_message` con párrafo natural       |

---

## Flujo de Checkout Nuevo

```
1. Carrito (items, precios)
   ↓ "Continuar con el pedido"
2. Selección de envío (departamento → municipio)
   ↓ "Confirmar ubicación"
3. Confirmación (resumen + total con envío)
   ↓ "Confirmar e Ir a WhatsApp"
4. Enviado → ¿Pudiste enviar? Sí/No
```

---

## Ejemplo de Mensaje WhatsApp Generado

> ¡Hola! Quisiera hacer un pedido: 2 x Scrubs Médicos Unisex a $12.00 c/u ($24.00 total) y 1 x Uniforme UNIVO a $38.00. El subtotal es $62.00. El envío a Soyapango, San Salvador tiene un costo estimado de $4.00 (Envío nacional). Gran total (con envío): $66.00. ¿Me pueden confirmar disponibilidad? ¡Gracias!

---

## Lógica de Envíos

| Zona     | Departamentos               | Costo Estimado   |
| -------- | --------------------------- | ---------------- |
| LOCAL    | San Miguel                  | Gratis           |
| ORIENTAL | Usulután, La Unión, Morazán | $2 (rango $1-$3) |
| NACIONAL | Resto del país (10 dep.)    | $4 (rango $3-$5) |

---

## Seguridad

- La RPC `generate_whatsapp_message` valida precios en DB antes de generar el mensaje (anti-tampering)
- Productos inactivos son ignorados en el mensaje
- El precio de mayoreo se aplica automáticamente si la cantidad cumple el mínimo
- Validaciones en `ProductModal`: mayoreo < precio regular, mínimo ≥ 2 uds
