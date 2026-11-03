import { useContext } from "react";
import { ProductContext } from "./ProductContextValue";

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts harus digunakan di dalam ProductProvider.");
  }

  return context;
}
