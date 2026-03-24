import React from "react";

const footerLinks = [
  {
    heading: "Unternehmen",
    links: ["Kontakt", "Impressum", "Wiederruf", "AGB", "Datenschutz"],
  },
  {
    heading: "Fenster",
    links: [
      "Schüco",
      "Salamander",
      "Aluplast",
      "Gealan",
      "Aluschale",
      "Alu Fenster",
      "Schiebetüren",
      "Zubehör",
    ],
  },
  {
    heading: "Haustüren",
    links: [
      "Aluminium",
      "Kunststoff",
      "Stahltüren",
      "Nebeneingang",
      "Modern",
      "Klassisch",
      "Exklusiv",
      "GlasHaustüren",
    ],
  },
  {
    heading: "Innentüren",
    links: [
      "Herholz",
      "Dextüra",
      "Brüchert+Kärner",
      "Türen mit Glas",
      "CPL Dekor",
      "Furnier Holztüren",
      "Schallschutz",
      "Zargen",
    ],
  },
  {
    heading: "Sonnenschutz",
    links: [
      "Aufsatzrollladen",
      "Vorbaurollladen",
      "Aufsatzraffstore",
      "Vorbauraffstore",
      "Textilscreens",
      "Zubehör",
      "Motoren",
      "Smart Home",
    ],
  },
  {
    heading: "Garagentore",
    links: [
      "Rolltore",
      "Rollgitter",
      "Aktionen",
      "Sektionaltore",
      "Antriebe",
      "Smart Home",
      "Teckentrup",
      "LED Leuchtung",
    ],
  },
];

const socialIcons = [
  {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 20.5h11a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z",
    isRect: true,
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
    label: "Phone",
    path: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  },
];

export default function Footer() {
  return (
    <footer
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Top contact bar */}
      <div
        style={{
          backgroundColor: "#111",
          padding: "24px 40px",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        <p style={{ color: "#ccc", margin: "0 0 4px", fontSize: "14px" }}>
          <a
            href="mailto:shop@paultec.de"
            style={{ color: "#ccc", textDecoration: "none" }}
          >
            shop@paultec.de
          </a>
        </p>
        <p style={{ color: "#ccc", margin: "0 0 2px", fontSize: "14px" }}>
          Tel.: +49 (0) 521 543 651 00
        </p>
        <p style={{ color: "#ccc", margin: 0, fontSize: "14px" }}>
          Fax.: +49 (0) 521 543 650 96
        </p>
      </div>

      {/* Main link grid */}
      <div
        style={{
          backgroundColor: "#111",
          padding: "40px 40px 32px",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "32px 24px",
          }}
        >
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  marginTop: 0,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {col.links.map((link) => (
                  <li
                    key={link}
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#888", fontSize: "10px" }}>●</span>
                    <a
                      href="#"
                      style={{
                        color: "#aaa",
                        textDecoration: "none",
                        fontSize: "13px",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#aaa")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social Icons */}
      <div
        style={{
          backgroundColor: "#111",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          padding: "20px 40px",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        {socialIcons.map((icon) => (
          <a
            key={icon.label}
            href="#"
            aria-label={icon.label}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1.5px solid #555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#fff";
              (e.currentTarget as HTMLElement).style.background = "#222";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#555";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ccc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon.path} />
            </svg>
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ color: "#666", fontSize: "12px", margin: 0 }}>
          Copyright 2026 © innentuerenshop.paultec.de
        </p>

        {/* Payment icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {["VISA", "PayPal", "stripe"].map((brand) => (
            <span
              key={brand}
              style={{
                color: "#888",
                fontSize: brand === "stripe" ? "13px" : "12px",
                fontWeight: brand === "VISA" ? 800 : 600,
                letterSpacing: brand === "VISA" ? "0.05em" : "0",
                fontStyle: brand === "stripe" ? "italic" : "normal",
              }}
            >
              {brand}
            </span>
          ))}
          {/* Mastercard circles */}
          <div
            style={{
              position: "relative",
              width: "32px",
              height: "20px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#eb001b",
                position: "absolute",
                left: 0,
              }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#f79e1b",
                position: "absolute",
                left: "10px",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
