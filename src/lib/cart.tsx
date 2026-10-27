import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/config/site";
import { cartCount, cartTotal, type CartLine } from "./order";

type Ctx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      count: cartCount(lines),
      total: cartTotal(lines),
      open,
      setOpen,
      add: (p) => {
        setLines((ls) => {
          const ex = ls.find((l) => l.id === p.id);
          if (ex) return ls.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l));
          return [...ls, { id: p.id, name: p.name, price: p.price, qty: 1 }];
        });
        toast.success(`${p.name} adicionado ao pedido`);
      },
      setQty: (id, qty) =>
        setLines((ls) =>
          qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((ls) => ls.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    }),
    [lines, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
}
