"use client";

import { useState } from "react";

export default function ProductsButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showProducts, setShowProducts] = useState(false);

  const handleClick = () => {
    setShowProducts((prev) => !prev);

    if (!showProducts) {
      setTimeout(() => {
        document
          .getElementById("all-products")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="btn min-h-9 h-9 rounded-lg border-none bg-green-700 px-5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg"
      >
        {showProducts ? "পণ্য লুকান" : "সব পণ্য দেখুন"}
      </button>

      {showProducts && (
        <div id="all-products" className="mt-8">
          {children}
        </div>
      )}
    </>
  );
}