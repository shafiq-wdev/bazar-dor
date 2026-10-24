
import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const IncreasedPrice = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  const increasedProducts = data.filter(
    (product) => product.change.dir === "up",
  );

  return (
    <section className="mx-auto max-w-5xl py-6">
      <div className="flex max-w-5xl gap-2">
        <span className="text-red-600">▲</span>
        <h2 className="mb-5 font-bold text-gray-800">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increasedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="block"
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              {/* Product image and name */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                  {product.image}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.nameBn}
                  </h3>

                  <p className="text-sm text-gray-500">
                    প্রতি{" "}
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit}
                  </p>
                </div>
              </div>

              {/* Today's price and percentage increase */}
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-xs text-gray-500">
                    আজকের দাম
                  </p>

                  <div className="inline-block rounded-lg border border-sky-200 bg-sky-100/60 px-3 py-1 text-xl font-bold text-gray-800">
                    {product.today}{" "}
                    <span className="text-sm font-normal">
                      টাকা
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-red-600">
                  <span>▲</span>
                  <span>{product.change.pct}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default IncreasedPrice;
