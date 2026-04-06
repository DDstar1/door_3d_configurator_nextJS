import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TabHeaders({ tabs, activeTab, setActiveTab }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("resize", checkScroll);
    return () => el?.removeEventListener("resize", checkScroll);
  }, [tabs]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 150, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-end">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 z-10 h-full px-1 bg-gradient-to-r from-white via-white/90 to-transparent"
        >
          <ChevronLeft size={18} className="text-black/60" />
        </button>
      )}

      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 font-semibold overflow-x-auto scrollbar-none"
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer shrink-0 relative pb-1
              ${
                activeTab === tab
                  ? "border-t border-x border-black"
                  : "text-black/60 hover:text-black"
              }`}
          >
            <div
              className={`text-sm w-full p-3 -mb-3 ${activeTab === tab ? "bg-white" : "bg-white/0"}`}
            >
              {tab}
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 z-10 h-full px-1 bg-gradient-to-l from-white via-white/90 to-transparent"
        >
          <ChevronRight size={18} className="text-black/60" />
        </button>
      )}
    </div>
  );
}
