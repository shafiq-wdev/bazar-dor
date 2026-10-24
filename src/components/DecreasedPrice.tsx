import Link from "next/link";
import React from "react";

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

const DecreasedPrice = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  const increasedProducts = data.filter(
    (product) => product.change.dir === "down",
  );

  return (
    <section className="py-6 max-w-5xl justify-center mx-auto">
      <div className="flex gap-2 max-w-5xl">
        <span className="text-green-600">▼</span>
        <h2 className="mb-5 font-bold text-gray-800">আজ দাম কমেছে</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increasedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="block"
          >
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm border border-gray-100"
          >
            {/* উপরের অংশ: ছবি ও নাম/একক */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                {product.image}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.nameBn}
                </h3>
                <p className="text-sm text-gray-500">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>
              </div>
            </div>

            {/* নিচের অংশ: আজকের দাম এবং শতকরা বৃদ্ধির ব্যাজ */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                <div className="text-xl font-bold text-gray-800 bg-sky-100/60 px-3 py-1 rounded-lg border border-sky-200 inline-block">
                  {product.today}{" "}
                  <span className="text-sm font-normal">টাকা</span>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-red-600">
                <span>▼</span>
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

export default DecreasedPrice;
