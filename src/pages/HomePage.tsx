"use client";

import { useCallback, useState } from "react";
import { DemoPanel } from "@/components/DemoPanel";
import { FilterBar } from "@/components/FilterBar";
import { LiveRegion } from "@/components/LiveRegion";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";

interface HomePageClientProps {
  products: Product[];
  demoConfig: DemoConfig;
}

export function HomePageClient({ products, demoConfig }: HomePageClientProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilteredChange = useCallback((next: Product[]) => {
    setFilteredProducts(next);
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 id="page-heading" tabIndex={-1}>
          Product catalog
        </h1>
        <p>
          Click any card for a hard refresh to the detail page with cross-document
          shared element morphs.
        </p>
      </header>

      <FilterBar products={products} onFilteredChange={handleFilteredChange} />

      <ProductGrid products={filteredProducts} />

      <DemoPanel initialConfig={demoConfig} />
      <LiveRegion message="Product catalog loaded." focusTargetId="page-heading" />
    </>
  );
}
