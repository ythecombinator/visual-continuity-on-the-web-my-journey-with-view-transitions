import type { Product } from "@/data/products";
import { formatPrice, productTransitionName } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <a href={`/products/${product.id}`}>
        <div className="product-card__media">
          <img
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
            style={{
              viewTransitionName: productTransitionName(product.id, "image"),
            }}
          />
        </div>
        <div className="product-card__body">
          <h2
            className="product-card__title"
            style={{
              viewTransitionName: productTransitionName(product.id, "title"),
            }}
          >
            {product.title}
          </h2>
          <p className="product-card__description">{product.description}</p>
          <p
            className="product-card__price"
            style={{
              viewTransitionName: productTransitionName(product.id, "price"),
            }}
          >
            {formatPrice(product.price)}
          </p>
        </div>
      </a>
    </article>
  );
}
