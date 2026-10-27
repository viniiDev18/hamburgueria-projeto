export type CartLine = { id: string; name: string; price: number; qty: number };
export type OrderInfo = {
  customer: string;
  notes: string;
  mode: "retirada" | "entrega";
  address: string;
};

export const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const cartTotal = (lines: CartLine[]) =>
  Math.round(lines.reduce((s, l) => s + l.price * l.qty, 0) * 100) / 100;

export const cartCount = (lines: CartLine[]) => lines.reduce((s, l) => s + l.qty, 0);

export function buildOrderMessage(lines: CartLine[], info: OrderInfo, storeName: string) {
  const items = lines
    .map((l) => `• ${l.qty}x ${l.name} — ${formatBRL(l.price * l.qty)}`)
    .join("\n");
  const parts = [
    `Olá, ${storeName}! Gostaria de fazer um pedido:`,
    "",
    items,
    "",
    `*Total: ${formatBRL(cartTotal(lines))}*`,
    "",
    `Nome: ${info.customer.trim()}`,
    `Forma: ${info.mode === "entrega" ? "Entrega" : "Retirada no local"}`,
  ];
  if (info.mode === "entrega") parts.push(`Endereço: ${info.address.trim()}`);
  if (info.notes.trim()) parts.push(`Observações: ${info.notes.trim()}`);
  return parts.join("\n");
}

export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
