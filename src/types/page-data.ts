import type { Category, Product } from "@/data/products";

export type HomePageData = {
  products: Product[];
};

export type ProductDetailPageData = {
  product: Product;
  backHref: string;
};

export type CategoryPageData = {
  products: Product[];
  category: Category;
  categoryLabel: string;
};
