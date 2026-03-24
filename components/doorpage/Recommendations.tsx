import React from "react";

const similarProducts = [
  {
    image: "/images/Laser_01-2.jpg",
    name: "Elegant Laser 01 – Herholz Innentüren",
    price: "€317,02",
  },
  {
    image: "/images/Blanco_001-scaled.jpg",
    name: "Elegant Blanco – Herholz Innentüren",
    price: "€239,77",
  },
  {
    image: "/images/Fusion_01_Decora_Sandbirke_quer_001.jpg",
    name: "Herholz Innentür Decora Sandbirke horizont – Modern Fusion 1",
    price: "€366,54",
  },
  {
    image: "/images/Atrium_21_-4101-V-055-1.jpg",
    name: "Elegant Atrium 21 Weiß – (inkl. Lichtöffnung LÖ 4411 V 058)",
    price: "€736,04",
  },
  {
    image: "/images/Herholz-Zeitlos-Buche-natur-Furnierte-Innentuer.jpg",
    name: "Herholz Zeitlos Buche natur Furnierte (inkl. Lichtöffnung Norm-LÖ 1011 V003)",
    price: "€247,49",
  },
];

export default function SimilarProducts() {
  return (
    <section className="border-t border-gray-200 py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
        Ähnliche Produkte
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {similarProducts.map((product, i) => (
          <a key={i} href="#" className="group flex flex-col cursor-pointer">
            {/* Image */}
            <div
              className="border border-gray-200 bg-white overflow-hidden mb-3 flex items-center justify-center"
              style={{ aspectRatio: "3/5" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Name */}
            <p className="text-sm text-gray-800 leading-snug mb-1 group-hover:text-red-800 transition-colors">
              {product.name}
            </p>

            {/* Price */}
            <p className="text-sm text-gray-700">
              Ab:{" "}
              <span className="font-bold text-gray-900">{product.price}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">
              Inkl. 19% MwSt. zzgl. Versandkosten &amp; Materialzuschlag
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
