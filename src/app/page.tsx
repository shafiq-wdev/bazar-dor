
import CurrentDate from "@/components/CurrentDate";
import IncreasedPrice from "@/components/IncreasedPrice";
import DecreasedPrice from "@/components/DecreasedPrice";
import Image from "next/image";
import AllProducts from "@/components/AllProducts";

const Page = () => {
  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[24px] border border-gray-200 bg-[#f9fcfa] px-5 py-8 sm:px-8 md:flex-row md:px-10 md:py-10">
        
        {/* Left Content */}
        <div className="w-full md:w-[65%]">
          {/* Date Badge */}
          <div className="mb-3 inline-flex rounded-full bg-[#e1f2e8] px-3 py-1 text-sm font-medium text-green-700">
            <CurrentDate />
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-[#202923] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button className="btn min-h-9 h-9 rounded-lg border-none bg-green-700 px-5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="flex w-full items-center justify-center md:w-[30%] md:justify-end">
          <Image
            src="/bazar-hero.png"
            width={300}
            height={300}
            alt="বাজারের তাজা শাকসবজি"
            priority
            className="h-auto w-56 object-contain sm:w-48 md:w-[200px]"
          />
        </div>
      </section>
      <IncreasedPrice />
      <DecreasedPrice />
      <AllProducts />
    </main>
  );
};

export default Page;