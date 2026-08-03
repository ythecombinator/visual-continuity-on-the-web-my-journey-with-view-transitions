import { HomePageClient } from "@/pages/HomePage";
import { Layout } from "@/components/Layout";
import type { Product } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";

interface HomePageProps {
  products: Product[];
  demoConfig: DemoConfig;
}

export function HomePage({ products, demoConfig }: HomePageProps) {
  return (
    <Layout currentPath="/" pageTitle="Product catalog">
      <HomePageClient products={products} demoConfig={demoConfig} />
    </Layout>
  );
}
