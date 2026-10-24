
import Link from "next/link";

export const instant = false;

interface Products {
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
    dir: "up" | "down";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface ProductDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetails = async ({
  params,
}: ProductDetailsProps) => {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    if (res.status === 415) {
      return (
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-bold">
            এই প্রোডাক্টের বিস্তারিত পাওয়া যাচ্ছে না
          </h1>
        </div>
      );
    }

    throw new Error("Failed to fetch products");
  }

  const data: Products = await res.json();

  const minPrice = Math.min(
    ...data.markets.map((market) => market.min),
  );

  const maxPrice = Math.max(
    ...data.markets.map((market) => market.max),
  );

  const averagePrice =
    data.markets.length > 0
      ? data.markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0,
        ) / data.markets.length
      : 0;

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 text-[#26332b] sm:px-6">
      <div className="mx-auto max-w-5xl space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <span>{data.categoryNameBn}</span>

          <span>›</span>

          <span className="text-gray-700">{data.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-4xl">
              {data.image || data.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {data.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {data.unit === "kg" ? "কেজি" : data.unit} ·{" "}
                {data.categoryNameBn}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                গতকালের তুলনায় আজকের দাম{" "}
                {data.change.dir === "up"
                  ? "বেড়েছে"
                  : data.change.dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                : {formatPrice(data.yesterday)} →{" "}
                {formatPrice(data.today)} টাকা
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6 rounded-xl bg-[#f0f5f0] px-5 py-3 sm:min-w-32 sm:flex-col sm:items-center sm:gap-1">
            <div className="text-xs text-gray-500">
              আজকের দাম
            </div>

            <div className="text-center">
              <p className="text-2xl font-extrabold">
                {formatPrice(data.today)}
              </p>

              <p className="text-xs text-gray-500">
                টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
              </p>

              <p
                className={`mt-1 text-xs font-semibold ${
                  data.change.dir === "up"
                    ? "text-red-600"
                    : data.change.dir === "down"
                      ? "text-green-700"
                      : "text-gray-500"
                }`}
              >
                {data.change.dir === "up"
                  ? "▲"
                  : data.change.dir === "down"
                    ? "▼"
                    : "●"}{" "}
                {formatPrice(data.change.pct)}%
              </p>
            </div>
          </div>
        </section>

        {/* Market Price Summary */}
        <section className="space-y-3 rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-base font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-extrabold text-green-700">
                {formatPrice(minPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-xl font-extrabold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বোচ্চ
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-extrabold text-green-700">
                {formatPrice(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
              </p>
            </div>
          </div>

          {/* Market Table */}
          <div className="pt-2">
            <h2 className="mb-3 text-base font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[#e0e9e0]">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead className="bg-[#f8faf8] text-xs text-gray-500">
                  <tr>
                    <th className="px-3 py-3 font-semibold">
                      বাজার
                    </th>

                    <th className="px-3 py-3 font-semibold">
                      বিভাগ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.markets.map((market, index) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-[#dce5dc] transition hover:bg-green-50 ${
                          index % 2 === 0
                            ? "bg-[#fbfdfb]"
                            : "bg-[#f0f5f0]"
                        }`}
                      >
                        <td className="px-3 py-3 text-xs font-medium">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-xs text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-xs text-green-700">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-xs text-red-600">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-xs font-semibold">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
