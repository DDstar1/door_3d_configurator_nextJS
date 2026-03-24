export default function TabHeaders({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-6 font-semibold">
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`cursor-pointer relative pb-1
             ${
               activeTab === tab
                 ? "border-t border-x border-black"
                 : "text-black/60 hover:text-black"
             }`}
        >
          <div
            className={`text-sm w-full p-3 -mb-3 ${activeTab === tab ? "bg-white" : " bg-white/0"}`}
          >
            {tab}
          </div>
        </div>
      ))}
    </div>
  );
}
