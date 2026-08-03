"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { runViewTransition } from "@/shared/view-transition";

interface ProductHeroProps {
  product: Product;
  slowImageDecode?: boolean;
  transitionName: string;
}

export function ProductHero({
  product,
  slowImageDecode = false,
  transitionName,
}: ProductHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroSrc, setHeroSrc] = useState(
    slowImageDecode ? product.thumbnail : product.gallery[0],
  );

  useEffect(() => {
    if (!slowImageDecode) return;

    const timer = window.setTimeout(() => {
      setHeroSrc(product.gallery[activeIndex] ?? product.hero);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [slowImageDecode, product, activeIndex]);

  useEffect(() => {
    if (!slowImageDecode) {
      setHeroSrc(product.gallery[activeIndex] ?? product.hero);
    }
  }, [activeIndex, product, slowImageDecode]);

  const selectImage = (index: number) => {
    if (index === activeIndex) return;
    runViewTransition(() => setActiveIndex(index));
  };

  return (
    <section className="product-hero">
      <div className="product-hero__main">
        <img
          src={heroSrc}
          alt={product.title}
          width={1200}
          height={800}
          style={{ viewTransitionName: transitionName }}
        />
      </div>
      <div className="product-hero__thumbs" aria-label="Product gallery">
        {product.gallery.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`product-hero__thumb${index === activeIndex ? " is-active" : ""}`}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => selectImage(index)}
          >
            <img src={src} alt="" width={72} height={72} />
          </button>
        ))}
      </div>
    </section>
  );
}
