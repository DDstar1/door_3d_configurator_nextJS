"use client";

import Link from "next/link";

const featuredDoors = [
  {
    name: "Elegant Alba 4 Weißlack",
    subtitle: "Herholz Innentüren",
    price: "Ab €414,69",
    image: "/images/Alba_4_3571_V_056.jpg",
    href: "/paultec_alba",
    tag: "3D konfigurierbar",
  },
  // ...keep rest
];

export default function LandingPage() {
  return (
    <div className="font-sans bg-[#f8f5f0] text-[#1a1a1a] overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[#f8f5f0]/90 backdrop-blur border-b border-[#e0dbd4]">
        <a href="/" className="text-xl font-serif font-bold">
          paultec<span className="text-[#8b1a1a]">24</span>
        </a>

        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-600">
          <li>
            <a href="#produkte" className="hover:text-black">
              Innentüren
            </a>
          </li>
          <li>
            <a href="#">Haustüren</a>
          </li>
          <li>
            <a href="#">Fenster</a>
          </li>
          <li>
            <a href="#">Sonnenschutz</a>
          </li>
        </ul>

        <Link
          href="/paultec_alba"
          className="bg-[#8b1a1a] text-white px-5 py-2 text-xs uppercase tracking-widest hover:bg-[#6b1212]"
        >
          3D Konfigurator →
        </Link>
      </nav>

      {/* HERO */}
      <section className="pt-20 min-h-screen grid md:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col justify-center gap-6 px-6 md:px-16 py-16">
          <span className="text-xs uppercase tracking-widest text-[#8b1a1a] flex items-center gap-3">
            <span className="w-6 h-px bg-[#8b1a1a]" />
            Interaktiver 3D Konfigurator
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-black leading-tight">
            Ihre Tür.
            <br />
            <em className="text-[#8b1a1a] italic">Ihr Design.</em>
            <br />
            In Echtzeit.
          </h1>

          <p className="text-gray-600 max-w-md">
            Konfigurieren Sie Ihre Innentür in 3D — Maße, Material, Oberfläche,
            Verglasung. Alles live. Direkt bestellen.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/paultec_alba"
              className="bg-[#8b1a1a] text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#6b1212]"
            >
              Jetzt konfigurieren →
            </Link>

            <a
              href="#produkte"
              className="border-b border-gray-400 text-sm hover:text-[#8b1a1a]"
            >
              Alle Modelle ansehen
            </a>
          </div>

          <div className="flex gap-8 mt-4">
            {["500+ Türmodelle", "3D Echtzeit", "24h Angebot"].map(
              (item, i) => (
                <div key={i}>
                  <p className="font-serif text-2xl font-bold">
                    {item.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">
                    {item.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-[#ede8e0] to-[#ddd6ca]">
          <img
            src="/images/Alba_4_3571_V_056.jpg"
            className="h-[80%] object-contain drop-shadow-2xl hover:scale-105 transition"
          />

          <span className="absolute top-6 right-6 bg-[#8b1a1a] text-white text-xs px-3 py-1 uppercase">
            3D Live
          </span>

          <div className="absolute bottom-10 left-0 bg-white shadow-xl border p-4 flex gap-3">
            <div className="w-9 h-9 bg-[#8b1a1a] rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <div>
              <p className="font-semibold text-sm">3D Konfigurator aktiv</p>
              <p className="text-xs text-gray-500">Echtzeit-Vorschau</p>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="bg-black text-white px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-serif text-xl">So einfach funktioniert's</h3>
          <p className="text-gray-400 text-sm">In drei Schritten</p>
        </div>

        <Link
          href="/paultec_alba"
          className="bg-[#8b1a1a] px-6 py-2 text-xs uppercase"
        >
          Konfigurator starten →
        </Link>
      </div>

      {/* PRODUCTS */}
      <section id="produkte" className="px-6 md:px-16 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs uppercase text-[#8b1a1a]">
              Unsere Kollektionen
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Ausgewählte Türmodelle
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredDoors.map((door) => (
            <Link
              key={door.name}
              href={door.href}
              className="bg-white shadow hover:shadow-xl transition group"
            >
              <div className="aspect-[3/4] flex items-center justify-center bg-gray-100 overflow-hidden">
                <img
                  src={door.image}
                  className="h-[85%] object-contain group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4 flex justify-between">
                <div>
                  <p className="font-serif text-sm">{door.name}</p>
                  <p className="text-xs text-gray-500">{door.subtitle}</p>
                </div>
                <span className="text-sm font-semibold">{door.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between gap-4">
        <p className="font-serif text-lg">
          paultec<span className="text-red-500">24</span>
        </p>

        <p className="text-xs text-gray-500">
          © 2026 innentuerenshop.paultec.de
        </p>
      </footer>
    </div>
  );
}
