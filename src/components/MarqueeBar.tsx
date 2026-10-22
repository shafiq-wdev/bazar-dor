
interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

export default async function MarqueeBar() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return <p>দাম লোড করা যায়নি।</p>;
  }

  const result = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  if (products.length === 0) {
    return <p>কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>;
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {products.map((product) => {
              const isUp = product.change.dir === "up";

              return (
                <div
                  key={`${copy}-${product.id}`}
                  className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 py-3 text-sm sm:gap-3 sm:px-6 sm:text-base"
                >
                  <span>{product.categoryIcon}</span>

                  <span className="whitespace-nowrap font-medium text-gray-800">
                    {product.nameBn}
                  </span>

                  <span className="whitespace-nowrap text-gray-700">
                    {product.today} টাকা/
                    {product.unit === "kg" ? "কেজি" : product.unit}
                  </span>

                  <span
                    className={`whitespace-nowrap font-bold ${
                      isUp ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}{" "}
                    {Math.abs(product.change.pct)}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
