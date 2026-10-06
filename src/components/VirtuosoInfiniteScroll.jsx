import { Virtuoso } from "react-virtuoso";
import { useState } from "react";

// start se count tak items banane wala helper
const makeItems = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item #${start + i}`,
  }));

// Footer component ko BAHAR define karo (andar karoge to har render pe remount hoga)
// "context" prop se loading ki value yahan aati hai
const Footer = ({ context }) => {
  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      {context.loading ? "Loading more..." : "Neeche scroll karo"}
    </div>
  );
};

function VirtuosoInfiniteScroll() {
  const [items, setItems] = useState(() => makeItems(0, 30));
  const [loading, setLoading] = useState(false);

  function loadMore() {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      // yahan asli API call aayegi
      setItems((prev) => [...prev, ...makeItems(prev.length, 20)]);
      setLoading(false);
    }, 800);
  }
  return (
    <div style={{ border: "1px solid black" }}>
      <Virtuoso
        style={{ height: 400 }}
        data={items}
        computeItemKey={(index, item) => item.id}
        itemContent={(index, item) => (
          <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            {item.title}
          </div>
        )}
        endReached={loadMore} // bottom pe pahunche to naya data lao
        components={{ Footer }} // footer me loading text dikhao
        context={{ loading }} //Footer ko loading value pass karo
      ></Virtuoso>
    </div>
  );
}

export default VirtuosoInfiniteScroll;
