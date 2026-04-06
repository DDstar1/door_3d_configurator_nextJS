"use client";

import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Mail,
  Clock,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full">
      {/* TOP BLACK BAR — hidden on mobile */}
      <div className="bg-black py-3 text-white text-sm max-md:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1">
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

      {/* LOGO + SEARCH + ACTIONS */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-3">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Image
              src="/images/paultec24i_logo.png"
              alt="Paultec Logo"
              width={270}
              height={140}
              className="object-contain max-md:w-[160px]"
            />
          </div>

          {/* SEARCH — full on desktop, icon-only toggle on mobile */}
          <div className="flex items-center w-1/3 border rounded overflow-hidden max-md:hidden">
            <input
              type="text"
              placeholder="Suchen..."
              className="w-full px-3 text-xs text-gray-500 py-2 outline-none"
            />
            <button className="bg-red-800 text-white px-4 py-2">
              <Search size={18} />
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>

            {/* User — icon only on mobile */}
            <button className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-full">
              <User size={16} />
              <span className="text-sm max-md:hidden">John Okosun</span>
            </button>

            {/* Cart */}
            <button className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-full relative">
              <ShoppingCart size={16} />
              <span className="text-sm max-md:hidden">Warenkorb</span>
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs px-1 rounded-full">
                0
              </span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR — expands below header row */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center border rounded overflow-hidden">
              <input
                type="text"
                placeholder="Suchen..."
                className="w-full px-3 text-xs text-gray-500 py-2 outline-none"
                autoFocus
              />
              <button className="bg-red-800 text-white px-4 py-2">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP NAVBAR */}
      <nav className="bg-black text-white max-md:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-3 text-md">
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1">
            Haustüren <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1">
            Innentüren <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1">
            Fenster <ChevronDown size={16} />
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1">
            Sonnenschutz
          </span>
          <span className="hover:text-red-500 cursor-pointer flex items-center gap-1">
            Garagentore <ChevronDown size={16} />
          </span>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Drawer panel */}
          <div className="bg-black text-white w-72 h-full flex flex-col overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <Image
                src="/images/paultec24i_logo.png"
                alt="Paultec Logo"
                width={130}
                height={60}
                className="object-contain"
              />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 divide-y divide-white/10">
              {[
                { label: "Haustüren", hasChevron: true },
                { label: "Innentüren", hasChevron: true },
                { label: "Fenster", hasChevron: true },
                { label: "Sonnenschutz", hasChevron: false },
                { label: "Garagentore", hasChevron: true },
              ].map(({ label, hasChevron }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer"
                >
                  <span className="text-sm">{label}</span>
                  {hasChevron && (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              ))}
            </nav>

            {/* Contact info */}
            <div className="border-t border-white/10 px-4 py-4 flex flex-col gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <Mail size={13} /> shop@paultec.de
              </span>
              <span className="flex items-center gap-2">
                <Clock size={13} /> Mo-Sa: 8:00 - 18:00
              </span>
              <span className="flex items-center gap-2">
                <Phone size={13} /> 052154365100
              </span>
            </div>

            {/* Fachhandel / Onlineshop */}
            <div className="border-t border-white/10 px-4 py-3 flex gap-2">
              <button className="bg-white text-black text-xs px-3 py-1 rounded">
                Fachhandel
              </button>
              <button className="border border-white text-xs px-3 py-1 rounded">
                Onlineshop
              </button>
            </div>
          </div>

          {/* Backdrop — tap to close */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* BREADCRUMB */}
      <div
        style={{
          backgroundImage: "url('/images/Alba_4_3571_V_056.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        className="text-white text-sm"
      >
        <div className="bg-black/30 max-w-7xl mx-auto px-4 py-5 leading-relaxed">
          Start <span className="text-gray-300 px-2">/</span> Herholz Innentüren
          <span className="text-gray-300 px-2">/</span>
          Herholz Weisse Türen <span className="text-gray-300 px-2">/</span>
          <span className="max-md:hidden">Herholz Elegant Alba Line Türen</span>
          <span className="md:hidden">Alba Line</span>
        </div>
      </div>
    </header>
  );
}
