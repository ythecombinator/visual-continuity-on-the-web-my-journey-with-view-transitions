import type { ReactNode } from "react";
import type { Category } from "@/data/products";
import { categories } from "@/data/products";

interface LayoutProps {
  children: ReactNode;
  currentPath: string;
  pageTitle: string;
}

export function Layout({ children, currentPath, pageTitle }: LayoutProps) {
  const activeCategory = currentPath.startsWith("/categories/")
    ? (currentPath.split("/")[2] as Category)
    : null;

  return (
    <div className="app-shell">
      <header className="site-header" style={{ viewTransitionName: "site-header" }}>
        <div className="site-header__inner">
          <a href="/" className="site-brand">
            <p className="site-brand__title">Legacy Catalog</p>
            <p className="site-brand__subtitle">Visual Continuity MPA Demo</p>
          </a>
          <nav className="site-nav" style={{ viewTransitionName: "site-nav" }} aria-label="Categories">
            <a href="/" aria-current={currentPath === "/" ? "page" : undefined}>
              All products
            </a>
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/categories/${category.slug}`}
                aria-current={activeCategory === category.slug ? "page" : undefined}
              >
                {category.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="page-container" id="main-content">
        <h1 className="sr-only">{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
}
