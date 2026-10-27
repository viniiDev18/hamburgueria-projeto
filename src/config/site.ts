/**
 * Configuração central da Estação Amora.
 * Edite aqui os dados do negócio, categorias e produtos.
 * Campos vazios ("") ficam ocultos no site até serem preenchidos.
 */
import classic from "@/assets/p-classic.jpg";
import special from "@/assets/p-special.jpg";
import sandwich from "@/assets/p-sandwich.jpg";
import fries from "@/assets/p-fries.jpg";
import salgado from "@/assets/p-salgado.jpg";
import tapioca from "@/assets/p-tapioca.jpg";
import drink from "@/assets/p-drink.jpg";

export const site = {
  name: "Estação Amora",
  tagline: "Hambúrgueres e lanches em Messejana",
  address: {
    street: "Rua Angélica Gurgel, 380",
    district: "Messejana",
    city: "Fortaleza",
    state: "CE",
    zip: "60871-030",
    reference: "Próxima à Praça Paulo Benevides",
  },
  /** WhatsApp comercial só com números, com DDI e DDD. Ex.: "5585999999999". */
  whatsapp: "",
  phone: "",
  email: "",
  instagram: "",
  /** Link do perfil no Google para avaliações. Vazio = busca pelo nome e endereço. */
  googleReviewsUrl: "",
  rating: { value: 4.8, count: 11 },
  hours: {
    summary: "Fecha às 22h",
    note: "Dias e horários completos a confirmar diretamente com o estabelecimento.",
  },
  /** null = ainda não confirmado; true/false quando o estabelecimento confirmar. */
  deliveryAvailable: null as boolean | null,
};

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`;
const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const reviewsUrl = site.googleReviewsUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export type CategoryId =
  | "classicos"
  | "especiais"
  | "sanduiches"
  | "acompanhamentos"
  | "salgados"
  | "bebidas"
  | "tapiocas";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "classicos", label: "Hambúrgueres clássicos" },
  { id: "especiais", label: "Hambúrgueres especiais" },
  { id: "sanduiches", label: "Sanduíches" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
  { id: "salgados", label: "Salgados" },
  { id: "bebidas", label: "Cafés e bebidas" },
  { id: "tapiocas", label: "Tapiocas" },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Preço em reais. DEMONSTRAÇÃO — substituir pelo cardápio real. */
  price: number;
  category: CategoryId;
  image: string;
};

/** ATENÇÃO: itens e preços de DEMONSTRAÇÃO. Substitua pelo cardápio real. */
export const products: Product[] = [
  { id: "classico-1", name: "Clássico da Casa", description: "Pão macio, carne grelhada, queijo derretido e salada fresca.", price: 0, category: "classicos", image: classic },
  { id: "classico-2", name: "Cheese Clássico", description: "O básico bem feito: carne suculenta e muito queijo.", price: 0, category: "classicos", image: classic },
  { id: "especial-1", name: "Especial Amora", description: "Blend duplo, cebola caramelizada e um toque de molho de amora.", price: 0, category: "especiais", image: special },
  { id: "especial-2", name: "Especial da Estação", description: "Combinação especial para quem quer mais sabor na parada.", price: 0, category: "especiais", image: special },
  { id: "sanduiche-1", name: "Misto Prensado", description: "Pão tostado na chapa com recheio cremoso.", price: 0, category: "sanduiches", image: sandwich },
  { id: "acomp-1", name: "Batata Frita", description: "Crocante por fora, macia por dentro, com molhos.", price: 0, category: "acompanhamentos", image: fries },
  { id: "salgado-1", name: "Salgados Variados", description: "Opções douradas e crocantes para acompanhar.", price: 0, category: "salgados", image: salgado },
  { id: "bebida-1", name: "Bebidas e Cafés", description: "Refrescos e cafés para completar o pedido.", price: 0, category: "bebidas", image: drink },
  { id: "tapioca-1", name: "Tapioca Recheada", description: "Tapioca quentinha com recheio derretido.", price: 0, category: "tapiocas", image: tapioca },
].map((p, i) => ({ ...p, price: [24.9, 27.9, 34.9, 36.9, 14.9, 16.9, 8.9, 7.9, 12.9][i] }));
