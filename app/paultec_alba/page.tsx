"use client";

import React, { useState } from "react";
import Header from "@/components/doorpage/Header";
import { DoorConfigurationForm2 } from "@/components/doorpage/door_form/Total_door_form";
import IncrementCounter from "@/components/doorpage/increase_product";
import Footer from "@/components/doorpage/footer";
import SimilarProducts from "@/components/doorpage/Recommendations";
import { DisplayAllValues } from "@/components/doorpage/DisplayAllValues";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconType } from "react-icons";
import { BsBox } from "react-icons/bs";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import AlbaCanva from "@/components/doorpage/door_canva/CanvaScene";

// 👉 OPTIONAL (for later when you switch to 3D)
// import CanvasScene from "@/components/doorpage/door_canva/CanvasScene";

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

const shareIcons: { label: string; Icon: IconType }[] = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "Twitter", Icon: FaTwitter },
  { label: "Email", Icon: MdEmail },
  { label: "Pinterest", Icon: FaPinterestP },
  { label: "LinkedIn", Icon: FaLinkedinIn },
];

function DoorConfiguratorPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE (Image / 3D) */}
        <div className="flex flex-col gap-3">
          {/* Main viewer */}
          <div className="relative overflow-hidden bg-white flex items-center justify-center">
            {/* Toggle Buttons — Top Left */}
            <div className="absolute top-3 left-3 z-10 flex rounded overflow-hidden border border-gray-200 shadow-sm">
              <button
                onClick={() => setViewMode("2d")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "2d"
                    ? "bg-red-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <BsImage size={14} />
                2D
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "3d"
                    ? "bg-red-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <BsBox size={14} />
                3D
              </button>
            </div>

            {/* Wishlist Button — Top Right */}
            <button
              onClick={() => setWishlisted((w) => !w)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-red-800 transition-colors"
              aria-label="Add to wishlist"
            >
              {wishlisted ? (
                <AiFillHeart size={16} className="text-red-800" />
              ) : (
                <AiOutlineHeart size={16} className="text-gray-500" />
              )}
            </button>

            {/* 2D View */}
            <div className="w-full h-screen flex items-center justify-center">
              {viewMode === "2d" && (
                <Image
                  src="/images/Alba_4_3571_V_056.jpg"
                  alt={galleryImages[activeIndex].alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              )}

              {viewMode === "3d" && <AlbaCanva />}
            </div>
          </div>

          {/* Thumbnail Strip — sits directly below the viewer */}
          <div className="flex gap-2 flex-wrap">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  setViewMode("2d"); // auto-switch to 2D when a thumbnail is clicked
                }}
                className={`border-2 rounded overflow-hidden transition-all duration-150 focus:outline-none ${
                  activeIndex === i && viewMode === "2d"
                    ? "border-red-800 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ width: 80, height: 80, flexShrink: 0 }}
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

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-5">
            Elegant Alba 4 Weißlack – (inkl. Lichtöffnung LÖ 3571 V 056) –
            Herholz Innentüren
          </h1>

          <p className="text-2xl text-gray-700">
            Ab: <span className="font-bold">€414,69</span>
          </p>

          <p className="text-sm mb-5 text-gray-500">
            inkl. 19% MwSt. zzgl. Versandkosten &amp; Materialzuschlag
          </p>

          <DoorConfigurationForm2 />
          <DisplayAllValues />

          {/* Info */}
          <p className="text-sm mt-5 text-gray-500">
            <b>Hinweis:</b> Bei kleineren Bestellungen (unter 2999 €) kann die
            Lieferzeit länger sein.
          </p>

          <div className="flex justify-between  text-gray-500 items-center mb-6 mt-2">
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
          </div>

          {/* Pricing */}
          <p className="text-gray-400 mb-2">
            Options Amount <br /> -€10,98
          </p>

          <p className="text-xl font-bold mb-8 text-gray-900">
            <span className="text-gray-400 text-sm font-medium">
              FINAL TOTAL
            </span>
            <br /> €476,89
          </p>

          {/* Cart */}
          <div className="flex gap-4 mb-4">
            <IncrementCounter />
            <button
              type="button"
              className="bg-red-800 px-5 py-3 text-white hover:bg-red-900 transition-colors"
            >
              In den Warenkorb
            </button>
          </div>

          <button
            type="button"
            className="bg-red-800 px-5 py-3 text-white hover:bg-red-900 transition-colors mb-5"
          >
            Formular: Anfrage senden
          </button>

          {/* PayPal */}
          <p className="text-sm text-gray-600 mb-4">
            Bezahlen Sie in bis zu 24 monatlichen Raten mit{" "}
            <span className="font-bold">
              <span style={{ color: "#003087" }}>Pay</span>
              <span style={{ color: "#009cde" }}>Pal</span>
            </span>
            .{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              Mehr erfahren
            </a>
          </p>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setWishlisted((w) => !w)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-800 mb-5"
          >
            {wishlisted ? (
              <AiFillHeart size={18} className="text-red-800" />
            ) : (
              <AiOutlineHeart size={18} />
            )}
            Auf die Wunschliste
          </button>

          <hr className="border-gray-200 mb-4" />

          {/* Meta */}
          <p className="text-sm text-gray-500 mb-2">
            <span className="text-gray-700 font-medium">Artikelnummer:</span> n.
            a.
          </p>

          <p className="text-sm text-gray-500 mb-5">
            <span className="text-gray-700 font-medium">Kategorien:</span>{" "}
            {categories.map((cat, i) => (
              <span key={cat}>
                <a
                  href="#"
                  className="hover:underline text-gray-600 hover:text-gray-900"
                >
                  {cat}
                </a>
                {i < categories.length - 1 && ", "}
              </span>
            ))}
          </p>

          {/* Social Icons */}
          <div className="flex gap-2">
            {shareIcons.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={`Share on ${label}`}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-600 hover:text-gray-800"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <SimilarProducts />
      <Footer />
    </div>
  );
}

export default DoorConfiguratorPage;
