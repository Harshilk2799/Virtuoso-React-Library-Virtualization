import { GroupedVirtuoso } from "react-virtuoso";

// groupCounts: har group me kitne items hain.
// [8, 5, 12] matlab 3 groups: pehle me 8, dusre me 5, teesre me 12 items.
const groupCounts = Array.from({ length: 12 }, (_, i) => 5 + ((i * 7) % 11));

// groupNames: har group ka naam (A se L tak)
const groupNames = "ABCDEFGHIJKL".split("");

export default function GroupedVirtuosoExample() {
  return (
    <GroupedVirtuoso
      style={{ height: 400 }}
      groupCounts={groupCounts}
      // groupContent: group header kaise dikhega. Scroll karte waqt ye upar chipka rehta hai.
      groupContent={(groupIndex) => (
        <div
          style={{ padding: "6px 16px", background: "#1f3a5f", color: "#fff" }}
        >
          Group {groupNames[groupIndex]}
        </div>
      )}
      // itemContent: har item kaise dikhega.
      // index = poori list me global index, groupIndex = ye item kis group ka hai.
      itemContent={(index, groupIndex) => (
        <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          {groupNames[groupIndex]} - item {index}
        </div>
      )}
    />
  );
}
