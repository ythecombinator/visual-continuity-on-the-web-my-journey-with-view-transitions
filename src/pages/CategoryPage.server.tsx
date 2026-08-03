import { Layout } from "@/components/Layout";
import { CategoryPageClient } from "@/pages/CategoryPage";
import type { Category, Product } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";

interface CategoryPageProps {
  products: Product[];
  category: Category;
  categoryLabel: string;
  demoConfig: DemoConfig;
}

export function CategoryPage({
  products,
  category,
  categoryLabel,
  demoConfig,
}: CategoryPageProps) {
  return (
    <Layout
      currentPath={`/categories/${category}`}
      pageTitle={`${categoryLabel} · Category`}
    >
      <CategoryPageClient
        products={products}
        categoryLabel={categoryLabel}
        demoConfig={demoConfig}
      />
    </Layout>
  );
}
