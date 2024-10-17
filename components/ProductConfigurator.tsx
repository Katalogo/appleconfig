"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StickyHeader from "./StickyHeader";

interface PriceConfig {
  [key: string]: {
    basePrice: number;
    storagePrice: {
      [key: string]: number;
    };
  };
}

const ProductConfigurator: React.FC = () => {
  const [model, setModel] = useState("iPhone 16");
  const [color, setColor] = useState("Pink");
  const [storage, setStorage] = useState("128");
  const [tradeIn, setTradeIn] = useState(false);
  const [price, setPrice] = useState(0);

  const priceConfig: PriceConfig = {
    "iPhone 16": {
      basePrice: 79900,
      storagePrice: {
        "128": 0,
        "256": 10000,
        "512": 30000,
      },
    },
    "iPhone 16 Plus": {
      basePrice: 89900,
      storagePrice: {
        "128": 0,
        "256": 10000,
        "512": 30000,
      },
    },
  };

  const colors = [
    { name: "Blue", hex: "#0000FF" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Black", hex: "#000000" },
  ];

  useEffect(() => {
    const basePrice = priceConfig[model].basePrice;
    const storagePrice = priceConfig[model].storagePrice[storage];
    setPrice(basePrice + storagePrice);
  }, [model, storage]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
      amount
    );
  };

  return (
    <div className="pb-20">
      <StickyHeader
        model={model}
        color={color}
        storage={storage}
        price={price}
      />
      <div className="max-w-2xl mx-auto p-4 space-y-8 pt-36">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Model. Which is best for you?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.keys(priceConfig).map((item) => (
              <Card
                key={item}
                className={`cursor-pointer transition-all ${
                  model === item ? "ring-2 ring-blue-500" : "hover:shadow-md"
                }`}
                onClick={() => setModel(item)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-sm text-gray-500">
                      {item === "iPhone 16"
                        ? "6.1-inch display"
                        : "6.7-inch display"}
                    </p>
                  </div>
                  <p className="text-sm">
                    From ₹{formatPrice(priceConfig[item].basePrice)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Finish. Pick your favourite.
          </h2>
          <div className="flex gap-4 mb-4">
            {colors.map((item) => (
              <button
                key={item.name}
                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                  color === item.name
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
                style={{ backgroundColor: item.hex }}
                onClick={() => setColor(item.name)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Storage. How much space do you need?
          </h2>
          <div className="grid gap-4">
            {Object.keys(priceConfig[model].storagePrice).map((item) => (
              <Card
                key={item}
                className={`cursor-pointer transition-all ${
                  storage === item ? "ring-2 ring-blue-500" : "hover:shadow-md"
                }`}
                onClick={() => setStorage(item)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <p className="font-medium">{item}GB</p>
                  <p className="text-sm">
                    ₹
                    {formatPrice(
                      priceConfig[model].basePrice +
                        priceConfig[model].storagePrice[item]
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Apple Trade In</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Get ₹{formatPrice(4000)}-₹{formatPrice(67500)} credit
                    towards your new iPhone.
                  </p>
                  <p className="text-sm text-gray-500">
                    Answer a few questions to get your estimate.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTradeIn(!tradeIn)}
                >
                  {tradeIn ? <ChevronDown /> : <ChevronRight />}
                </Button>
              </div>
              {tradeIn && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="pincode">Enter your PIN code:</Label>
                    <Input id="pincode" placeholder="400001" className="mt-1" />
                  </div>
                  <div>
                    <Label>Is your smartphone an iPhone?</Label>
                    <div className="flex gap-4 mt-1">
                      <Button variant="outline">Yes</Button>
                      <Button variant="outline">No</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <Button className="w-full">Add to Bag</Button>

        <div className="text-center">
          <Button variant="link" className="text-blue-500">
            <HelpCircle className="w-4 h-4 mr-2" />
            Need help choosing a model?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;
