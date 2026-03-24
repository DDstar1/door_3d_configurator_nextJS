"use client";

// Form component
import { useState } from "react";
import TypTab from "./typ";
import TabHeaders from "./headers";
import MassTab from "./mass";
import ZargenTab from "./zargen";
import SicherheitTab from "./sicherheit";
import ExtrasTab from "./extras";

export function DoorConfigurationForm2() {
  const [activeTab, setActiveTab] = useState("Typ");

  // Typ state
  const [doorType, setDoorType] = useState("Stumpf");
  const [insertType, setInsertType] = useState("Röhrenspanplatte (RSP)");
  const [anschlag, setAnschlag] = useState("DIN rechts");

  const tabs = ["Typ", "Maße", "Zargen", "Sicherheit", "Extras"];

  return (
    <div
      className=" p-6 rounded-2xl 
                 bg-white/20 backdrop-blur-lg 
                 border border-white/30 shadow-xl 
                 z-10 w-full text-black"
    >
      {/* Tab Headers */}
      <TabHeaders
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Content */}
      <div className="border border-black px-4">
        <div className="mt-6"></div>
        {activeTab === "Typ" && (
          <TypTab
            doorType={doorType}
            setDoorType={setDoorType}
            insertType={insertType}
            setInsertType={setInsertType}
            anschlag={anschlag}
            setAnschlag={setAnschlag}
          />
        )}

        {activeTab === "Maße" && <MassTab />}
        {activeTab === "Zargen" && <ZargenTab />}
        {activeTab === "Sicherheit" && <SicherheitTab />}
        {activeTab === "Extras" && <ExtrasTab />}
        <div className="mb-5"></div>
      </div>
    </div>
  );
}
