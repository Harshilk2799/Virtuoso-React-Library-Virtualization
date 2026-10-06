import { useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

const items = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  title: `Item #${i}`,
}));

function VirtuosoInfiniteScrollExampleTwo() {
  // virtuosoRef: Virtuoso ke methods call karne ka handle
  const virtuosoRef = useRef(null);

  // range: abhi screen pe kaun se index visible hain
  const [range, setRange] = useState({ startIndex: 0, endIndex: 0 });
  // isScrolling: user scroll kar raha hai ya ruka hua hai
  const [isScrolling, setIsScrolling] = useState(false);
  // atTop / atBottom: list ke sabse upar ya neeche hain ya nahi
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  return (
    <div>
      {/* ---- Buttons: methods call karna ---- */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button
          onClick={() =>
            virtuosoRef.current.scrollToIndex({ index: 0, behavior: "smooth" })
          }
        >
          Top
        </button>

        <button
          onClick={() =>
            virtuosoRef.current.scrollToIndex({
              index: "LAST", // "LAST" matlab aakhri item
              align: "end", // item ko viewport ke end me align karo
              behavior: "smooth",
            })
          }
        >
          Last
        </button>

        <button
          onClick={() =>
            virtuosoRef.current.scrollToIndex({ index: 100, align: "center" })
          }
        >
          Index 100
        </button>

        <button
          onClick={() =>
            virtuosoRef.current.scrollBy({ top: 300, behavior: "smooth" })
          }
        >
          +300px
        </button>
      </div>

      {/* ---- Live status ---- */}
      <p style={{ fontSize: 13 }}>
        Visible: {range.startIndex}-{range.endIndex} |{" "}
        {isScrolling ? "scrolling" : "idle"} |{" "}
        {atTop ? "at top" : atBottom ? "at bottom" : "middle"}
      </p>

      <Virtuoso
        ref={virtuosoRef}
        style={{ height: 400 }}
        data={items}
        computeItemKey={(index, item) => item.id}
        itemContent={(index, item) => (
          <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            {item.title}
          </div>
        )}
        // ---- Callbacks ----
        rangeChanged={setRange} // visible range badalte hi call hota hai
        isScrolling={setIsScrolling} // scroll start/stop pe true/false
        atTopStateChange={setAtTop} // top pe pahunche ya chhoda
        atBottomStateChange={setAtBottom} // bottom pe pahunche ya chhoda
        atBottomThreshold={40} // bottom se 40px pehle hi "atBottom" maano
      />
    </div>
  );
}

export default VirtuosoInfiniteScrollExampleTwo;
