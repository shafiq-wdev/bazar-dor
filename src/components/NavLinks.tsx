
import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Navs[] = await res.json();

  return (
    <nav className="w-full bg-gray-100 py-3">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
        <Link href="/"><span className="size={32}">🏠</span></Link>
        {navs.map((n) => (
          <Link
            key={n.id}
            href={`/category/${n.slug}`}
            className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-green-600 sm:text-base"
          >
            <span>{n.icon}</span>{" "}
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
