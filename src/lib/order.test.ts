import { describe, expect, it } from "vitest";
import { buildOrderMessage, cartTotal, whatsappUrl } from "./order";

const lines = [
  { id: "a", name: "Clássico", price: 24.9, qty: 2 },
  { id: "b", name: "Batata", price: 16.9, qty: 1 },
];

describe("pedido", () => {
  it("soma o total pelas quantidades", () => {
    expect(cartTotal(lines)).toBe(66.7);
  });
  it("inclui endereço apenas na entrega", () => {
    const base = { customer: "Ana", notes: "", address: "Rua X, 1" };
    expect(buildOrderMessage(lines, { ...base, mode: "entrega" }, "Loja")).toContain("Endereço: Rua X, 1");
    expect(buildOrderMessage(lines, { ...base, mode: "retirada" }, "Loja")).not.toContain("Endereço");
  });
  it("não gera link sem telefone configurado", () => {
    expect(whatsappUrl("", "oi")).toBeNull();
    expect(whatsappUrl("+55 (85) 99999-0000", "oi")).toBe("https://wa.me/5585999990000?text=oi");
  });
});
