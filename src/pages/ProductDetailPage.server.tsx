import { Layout } from "@/components/Layout";
import { ProductDetailClient } from "@/pages/ProductDetailPage";
import type { Product } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";

interface ProductDetailPageProps {
  product: Product;
  demoConfig: DemoConfig;
  backHref: string;
}

export function ProductDetailPage({
  product,
  demoConfig,
  backHref,
}: ProductDetailPageProps) {
  return (
    <Layout
      currentPath={`/products/${product.id}`}
      pageTitle={`${product.title} · Product detail`}
    >
      <ProductDetailClient
        product={product}
        demoConfig={demoConfig}
        backHref={backHref}
      />
    </Layout>
  );
}
