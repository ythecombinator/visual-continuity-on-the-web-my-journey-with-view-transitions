"use client";

import { useCallback, useState } from "react";
import { DemoPanel } from "@/components/DemoPanel";
import { FilterBar } from "@/components/FilterBar";
import { LiveRegion } from "@/components/LiveRegion";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";

interface CategoryPageClientProps {
  products: Product[];
  categoryLabel: string;
  demoConfig: DemoConfig;
}

export function CategoryPageClient({
  products,
  categoryLabel,
  demoConfig,
}: CategoryPageClientProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilteredChange = useCallback((next: Product[]) => {
    setFilteredProducts(next);
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 id="page-heading" tabIndex={-1}>
          {categoryLabel}
        </h1>
        <p>
          Server-routed category page. Navigation here is a full document load with
          cross-document transitions.
        </p>
      </header>

      <FilterBar products={products} onFilteredChange={handleFilteredChange} />

      <ProductGrid products={filteredProducts} />

      <DemoPanel initialConfig={demoConfig} />
      <LiveRegion
        message={`${categoryLabel} category loaded.`}
        focusTargetId="page-heading"
      />
    </>
  );
}
