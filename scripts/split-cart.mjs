import { readFileSync, writeFileSync } from "fs";

const fullContent = readFileSync("src/context/CartContext.tsx", "utf8");

// Find where CartContext ends and generateId/CartProvider begins
const splitMarker = "/**\n * Genera un UUID v4";
const splitIndex = fullContent.indexOf(splitMarker);
if (splitIndex === -1) {
  console.error("Marker not found!");
  process.exit(1);
}

const contextPart = fullContent.slice(0, splitIndex).trim() + `
// Export types
export type { CartProduct, CartItem, CartContextValue };
export { CartContext, CART_EMPTY_DEFAULT };
`;

const providerPart = `"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { logger } from "@/lib/logger";
import { useDebounce } from "@/hooks/useDebounce";
import {
  CART_SELECT_COLUMNS,
  MAX_CART_QUANTITY,
  MAX_TOTAL_ITEMS,
  STORAGE_CART_KEY,
  STORAGE_CART_TIMESTAMP_KEY,
  STORAGE_CART_EXPIRED_KEY,
} from "@/lib/constants";
import type { ShippingInfo } from "@/lib/shipping";
import { useNotifications } from "@/context/NotificationContext";
import {
  CartContext,
  type CartItem,
  type CartProduct,
  type CartContextValue,
} from "./CartContext";

` + fullContent.slice(splitIndex);

writeFileSync("src/context/CartContext.tsx", contextPart, "utf8");
writeFileSync("src/context/CartProvider.tsx", providerPart, "utf8");
console.log("Successfully split CartContext and CartProvider!");
