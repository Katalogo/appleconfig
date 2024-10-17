import React, { useState, useEffect } from "react";

interface StickyHeaderProps {
  model: string;
  color: string;
  storage: string;
  price: number;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  model,
  color,
  storage,
  price,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
      amount
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all max-w-xl mx-auto p-4 rounded-b-3xl duration-300 ${
        isSticky
          ? "bg-white/80 backdrop-blur-md shadow-md py-4"
          : "bg-white py-6"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1
            className={`font-bold transition-all duration-300 ${
              isSticky ? "text-2xl" : "text-2xl min-[400px]:text-3xl"
            }`}
          >
            {model}
          </h1>
          <p
            className={`text-sm text-gray-500 transition-all duration-300 font-bold ${
              isSticky ? "text-base" : "text-lg"
            }`}
          >
            {color}, {storage}GB
          </p>
        </div>
        <div>
          <p
            className={`font-semibold transition-all duration-300 ${
              isSticky ? "text-lg" : "text-xl"
            }`}
          >
            ₹{formatPrice(price)}
          </p>
          <p className="text-sm text-gray-500 font-bold">
            From ₹{formatPrice(price)} or <br /> ₹
            {formatPrice(Math.round(price / 24))}
            /mo. for 24 mo.
          </p>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
