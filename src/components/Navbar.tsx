
import Image from "next/image";
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";
import MarqueeBar from "./MarqueeBar";

const Header = () => {
  return (
    <>
    <header className="mx-auto mt-2 w-full max-w-5xl px-4">
      {/* Top Header */}
      <div className="flex min-h-20 items-center justify-between bg-gray-100 px-4 py-3 sm:px-6">

        {/* Left: Logo, Name and Date */}
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo-icon.png"
            width={50}
            height={50}
            alt="Bazar Dor"
            className="h-10 w-10 shrink-0 rounded-2xl bg-green-600 p-2 object-contain sm:h-12 sm:w-12"
            priority
          />

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-base font-extrabold text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <div className="mt-1 whitespace-nowrap text-[10px] text-black-500 sm:text-xs">
              <CurrentDate />
            </div>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-xs sm:btn-sm"
          >
            সাইন ইন
          </button>

          <button
            type="button"
            className="btn btn-xs border-none bg-green-600 text-white hover:bg-orange-700 sm:btn-sm"
          >
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="relative mt-2 w-full bg-white text-center shadow-sm">
        <NavLinks />
        </div>
    </header>
    <div className="mt-2 w-full">
        <MarqueeBar />
      </div>
    </>
  );
};

export default Header;
