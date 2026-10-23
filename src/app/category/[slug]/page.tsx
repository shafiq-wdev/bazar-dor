import React, { Suspense } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "equal";
    pct: number;
  };
  markets: Market[];
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  const filteredProducts = data.filter(
    (product) => product.category?.toLowerCase() === slug.toLowerCase(),
  );

  const categoryTitle = filteredProducts[0]?.categoryNameBn || slug;

  const categoryIcon = filteredProducts[0]?.categoryIcon || "📦";

  return (
    <section className="py-6 max-w-5xl mx-auto px-4">
      {/* ১. টপ ক্যাটাগরি ব্যানার কার্ড[cite: 3] */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{categoryTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* ২. ফিল্টার এবং কাউন্ট বার[cite: 3] */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500"></span>
          <span className="text-sm text-gray-500">সাজান</span>
          <select className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:border-gray-400">
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* ৩. প্রোডাক্ট কার্ড গ্রিড[cite: 3] */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <>
        <p className="mb-5 text-sm text-gray-500">
          মোট {filteredProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    
          {filteredProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isEqual =
              product.change.dir === "equal" || product.change.pct === 0;

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                    {product.image || product.categoryIcon}
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

                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">আজকের দাম</p>

                    <div className="text-xl font-bold text-gray-800">
                      {product.today}{" "}
                      <span className="text-sm font-normal text-gray-600">
                        টাকা
                      </span>
                      
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                      isEqual
                        ? "bg-gray-100 text-gray-600"
                        : isUp
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                    }`}
                  >
                    <span>{isEqual ? "—" : isUp ? "▲" : "▼"}</span>
                    <span>{Math.abs(product.change.pct)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </>
      )}
    </section>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <section className="py-6 max-w-6xl mx-auto px-4">
          <p className="text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
        </section>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
