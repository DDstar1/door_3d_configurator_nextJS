"use client";

import React, { useState } from "react";
import Header from "@/components/doorpage/Header";
import { DoorConfigurationForm2 } from "@/components/doorpage/door_form/Total_door_form";
import IncrementCounter from "@/components/doorpage/increase_product";
import Footer from "@/components/doorpage/footer";
import SimilarProducts from "@/components/doorpage/Recommendations";
import { DisplayAllValues } from "@/components/doorpage/DisplayAllValues";

const galleryImages = [
  { src: "/images/gallery1.jpg", alt: "Türfalz Stumpf/Nut-Design" },
  { src: "/images/gallery2.jpg", alt: "Türfalz Stumpf/Nut S-Design" },
  { src: "/images/gallery3.jpg", alt: "Türdesign Variante 3" },
  { src: "/images/gallery4.jpg", alt: "Türdesign Variante 4" },
];

const categories = [
  "Herholz Furnier Holztüren",
  "Herholz Innentüren",
  "Herholz Zeitlos Furnier",
];

const shareIcons = [
  {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 11.93 8a12.83 12.83 0 0 1-9.3-4.7 4.52 4.52 0 0 0 1.4 6.04A4.48 4.48 0 0 1 2 8.7v.06a4.52 4.52 0 0 0 3.63 4.43 4.52 4.52 0 0 1-2.04.08 4.52 4.52 0 0 0 4.22 3.13A9.07 9.07 0 0 1 2 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 24 4.59",
  },
  {
    label: "Email",
    path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  },
  {
    label: "Pinterest",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.563 0-2.386-1.715-4.054-4.163-4.054-2.836 0-4.498 2.127-4.498 4.326 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.286c-.076.312-.244.995-.276 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
];

function DoorConfiguratorPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Door Image + Gallery */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden bg-white">
            <img
              src="/images/Alba_4_3571_V_056.jpg"
              alt={galleryImages[activeIndex].alt}
              className="w-full object-contain transition-all duration-300 h-screen"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 flex-wrap">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`border-2 rounded overflow-hidden transition-all duration-150 focus:outline-none ${
                  activeIndex === i
                    ? "border-red-800 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ width: 100, height: 100, flexShrink: 0 }}
                aria-label={img.alt}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Door Info & Configurator */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-5">
            Elegant Alba 4 Weißlack – (inkl. Lichtöffnung LÖ 3571 V 056) –
            Herholz Innentüren
          </h1>

          <p className="text-2xl mt-0 text-gray-700">
            Ab: <span className="font-bold">€414,69</span>
          </p>
          <p className="text-sm mb-5 py-0 text-gray-500">
            inkl. 19% MwSt. zzgl. Versandkosten &amp; Materialzuschlag
          </p>

          <DoorConfigurationForm2 />
          <DisplayAllValues />

          <div>
            <p className="text-sm mt-5 text-gray-500">
              <b>Hinweis:</b> Bei kleineren Bestellungen (Gesamtbestellwert
              unter 2999 €) kann die Lieferzeit länger sein.
            </p>
            <p className="text-gray-700 mb-8 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  defaultChecked
                  className="accent-amber-700 w-4 h-4"
                />
                <span>inkl. Materialzuschlag (15%)</span>
              </label>
              <span className="font-semibold">€62,20</span>
            </p>

            <p className="text-gray-400 mb-2">
              Options Amount <br /> -€10,98
            </p>
            <p className="text-xl font-bold mb-8 text-gray-900">
              <span className="text-gray-400 text-sm font-medium">
                FINAL TOTAL
              </span>
              <br /> €476,89
            </p>

            {/* Cart + Counter */}
            <div className="flex gap-4 mb-4">
              <IncrementCounter />
              <button className="flex-1 max-w-fit bg-red-800 px-5 py-3 text-white hover:bg-red-900 transition-colors">
                In den Warenkorb
              </button>
            </div>

            {/* Anfrage Button */}
            <button className="border text-white bg-red-800 px-5 py-3 border-gray-300 rounded hover:bg-red-900 transition-colors mb-5">
              Formular: Anfrage senden
            </button>

            {/* PayPal Installment */}
            <p className="text-sm text-gray-600 mb-4">
              Bezahlen Sie in bis zu 24 monatlichen Raten mit{" "}
              <span className="font-bold">
                <span style={{ color: "#003087" }}>Pay</span>
                <span style={{ color: "#009cde" }}>Pal</span>
              </span>
              .{" "}
              <a
                href="#"
                className="text-blue-600 underline hover:text-blue-800 text-sm"
              >
                Mehr erfahren
              </a>
            </p>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted((w) => !w)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-800 transition-colors mb-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlisted ? "#991b1b" : "none"}
                stroke={wishlisted ? "#991b1b" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Auf die Wunschliste
            </button>

            <hr className="border-gray-200 mb-4" />

            {/* Article Number */}
            <p className="text-sm text-gray-500 mb-2">
              <span className="text-gray-700 font-medium">Artikelnummer:</span>{" "}
              n. a.
            </p>

            {/* Categories */}
            <p className="text-sm text-gray-500 mb-5">
              <span className="text-gray-700 font-medium">Kategorien:</span>{" "}
              {categories.map((cat, i) => (
                <span key={cat}>
                  <a
                    href="#"
                    className="hover:underline text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {cat}
                  </a>
                  {i < categories.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Social Share Icons */}
            <div className="flex gap-2">
              {shareIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={`Share on ${icon.label}`}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SimilarProducts />
      <Footer />
    </div>
  );
}

export default DoorConfiguratorPage;
