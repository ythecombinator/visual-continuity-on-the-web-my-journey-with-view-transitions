"use client";

import { useState } from "react";
import { DemoPanel } from "@/components/DemoPanel";
import { LiveRegion } from "@/components/LiveRegion";
import { ProductHero } from "@/components/ProductHero";
import type { Product } from "@/data/products";
import { formatPrice, productTransitionName, productTransitionNameStaleDetail } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";
import { runViewTransition } from "@/shared/view-transition";

interface ProductDetailClientProps {
  product: Product;
  demoConfig: DemoConfig;
  backHref: string;
}

export function ProductDetailClient({
  product,
  demoConfig,
  backHref,
}: ProductDetailClientProps) {
  const [expanded, setExpanded] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const stale = demoConfig.staleSharedName;
  const transitionName = (part: "image" | "title" | "price") =>
    stale
      ? productTransitionNameStaleDetail(product.id, part)
      : productTransitionName(product.id, part);

  const handleAddToCart = () => {
    runViewTransition(() => {
      setCartMessage(`${product.title} added to cart`);
    });
  };

  const toggleDescription = () => {
    runViewTransition(() => setExpanded((value) => !value));
  };

  return (
    <>
      <a href={backHref} className="back-link">
        ← Back to catalog
      </a>

      <div className="product-detail">
        <ProductHero
          product={product}
          slowImageDecode={demoConfig.slowImageDecode}
          transitionName={transitionName("image")}
        />

        <section className="product-detail__info">
          <header className="page-header">
            <h1
              id="page-heading"
              tabIndex={-1}
              style={{
                viewTransitionName: transitionName("title"),
              }}
            >
              {product.title}
            </h1>
            <p className="product-detail__description">{product.description}</p>
          </header>

          <p
            className="product-detail__price"
            style={{
              viewTransitionName: transitionName("price"),
            }}
          >
            {formatPrice(product.price)}
          </p>

          <div className="product-actions">
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button type="button" className="btn btn-secondary" onClick={toggleDescription}>
              {expanded ? "Hide details" : "Show details"}
            </button>
          </div>

          {cartMessage ? (
            <p className="cart-toast" role="status">
              {cartMessage}
            </p>
          ) : null}

          {expanded ? (
            <p className="product-detail__long">{product.longDescription}</p>
          ) : null}
        </section>
      </div>

      <DemoPanel initialConfig={demoConfig} />
      <LiveRegion
        message={`${product.title} detail page loaded.`}
        focusTargetId="page-heading"
      />
    </>
  );
}
