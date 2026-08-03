"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { Category, Product } from "@/data/products";
import { categories } from "@/data/products";
import { runViewTransition } from "@/shared/view-transition";

type SortOption = "title-asc" | "title-desc" | "price-asc" | "price-desc";

interface FilterBarProps {
  products: Product[];
  onFilteredChange: (products: Product[]) => void;
}

export function FilterBar({ products, onFilteredChange }: FilterBarProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("title-asc");
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    let next = [...products];

    if (category !== "all") {
      next = next.filter((product) => product.category === category);
    }

    if (query.trim()) {
      const normalized = query.trim().toLowerCase();
      next = next.filter(
        (product) =>
          product.title.toLowerCase().includes(normalized) ||
          product.description.toLowerCase().includes(normalized),
      );
    }

    next.sort((a, b) => {
      switch (sort) {
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return next;
  }, [products, category, query, sort]);

  useEffect(() => {
    onFilteredChange(filtered);
  }, [filtered, onFilteredChange]);

  const applyFilters = (updater: () => void) => {
    runViewTransition(() => {
      startTransition(() => {
        updater();
      });
    });
  };

  return (
    <section className="toolbar" aria-label="Filter products">
        <label>
          Search
          <input
            type="search"
            value={query}
            placeholder="Filter in-page…"
            onChange={(event) =>
              applyFilters(() => setQuery(event.target.value))
            }
          />
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(event) =>
              applyFilters(() =>
                setCategory(event.target.value as Category | "all"),
              )
            }
          >
            <option value="all">All</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select
            value={sort}
            onChange={(event) =>
              applyFilters(() => setSort(event.target.value as SortOption))
            }
          >
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="price-asc">Price low–high</option>
            <option value="price-desc">Price high–low</option>
          </select>
        </label>
        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          {filtered.length} item{filtered.length === 1 ? "" : "s"} · same-document VT
        </p>
      </section>
  );
}
