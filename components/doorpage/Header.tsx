"use client";

import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      {/* TOP BLACK BAR */}
      <div className="bg-black py-3 text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center container justify-between px-4 py-1">
          <div className="flex gap-2">
            <button className="bg-white text-black px-3 py-1 rounded">
              Fachhandel
            </button>
            <button className="border border-white px-3 py-1 rounded">
              Onlineshop
            </button>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <span>shop@paultec.de</span>
            <span>Mo-Sa: 8:00 - 18:00</span>
            <span>052154365100</span>
          </div>
        </div>
      </div>

      {/* LOGO + SEARCH */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/paultec24i_logo.png"
              alt="Paultec Logo"
              width={270}
              height={140}
              className="object-contain"
            />
          </div>

          {/* SEARCH */}
          <div className="flex items-center w-1/3 border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Suchen..."
              className="w-full px-3 text-xs text-gray-500 py-2 outline-none"
            />
            <button className="bg-red-800 text-white px-4 py-2">
              <Search size={18} />
            </button>
          </div>

          {/* USER + CART */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-full">
              <User size={16} />
              <span className="text-sm">John Okosun</span>
            </button>

            <button className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-full relative">
              <ShoppingCart size={16} />
              <span className="text-sm">Warenkorb</span>
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs px-1 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-black  text-white">
        <div className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-3 text-md">
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1  ">
            Haustüren
            <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1  ">
            Innentüren <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1  ">
            Fenster <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1  ">
            Sonnenschutz
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1  ">
            Garagentore <ChevronDown size={16} />
          </span>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div
        style={{
          backgroundImage: "url('/images/Alba_4_3571_V_056.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        className=" text-white text-md"
      >
        <div className="bg-black/30 max-w-7xl mx-auto px-4 py-5">
          Start <span className="text-gray-300 px-2">/</span> Herholz Innentüren
          <span className="text-gray-300 px-2">/</span>
          Herholz Weisse Türen <span className="text-gray-300 px-2">
            /
          </span>{" "}
          Herholz Elegant Alba Line Türen
        </div>
      </div>
    </header>
  );
}
