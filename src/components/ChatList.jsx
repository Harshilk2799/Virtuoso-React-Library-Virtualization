import { useState, useRef, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

// START_INDEX: bahut bada number. Purane messages upar prepend karte waqt
// hum firstItemIndex ko isse kam karte jayenge, isliye pehle se bada rakhte hain.
const START_INDEX = 100000;

// start se count tak messages banane wala helper
const makeMsgs = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i, // unique id
    mine: (start + i) % 3 === 0, // har 3rd message mera
    text: `Message ${start + i} ` + "text ".repeat((start + i) % 7),
  }));

export default function ChatList() {
  // firstItemIndex: list ke pehle item ka "virtual" index.
  // Upar naye items jodo to isse utna hi kam karo, tabhi scroll position stable rehti hai.
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX - 40);

  // messages: shuru me 40 messages, ids START_INDEX-40 se shuru
  const [messages, setMessages] = useState(() =>
    makeMsgs(START_INDEX - 40, 40)
  );

  // text: input box ki value
  const [text, setText] = useState("");

  // atBottom: user neeche hai ya purane messages padh raha hai
  const [atBottom, setAtBottom] = useState(true);

  // ref: "Latest pe jao" button ke liye
  const ref = useRef(null);

  // startReached: user list ke top pe pahunche to ye call hota hai
  const loadOlder = useCallback(() => {
    const n = 20; // ek baar me kitne purane messages
    const newFirst = firstItemIndex - n; // naya starting index

    setTimeout(() => {
      // yahan asli API call aayegi
      setMessages((prev) => [...makeMsgs(newFirst, n), ...prev]); // purane UPAR jodo
      setFirstItemIndex(newFirst); // index utna hi kam karo
    }, 500);
  }, [firstItemIndex]);

  // naya message bhejna
  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: firstItemIndex + prev.length, mine: true, text }, // aakhri ke baad ka id
    ]);
    setText("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      {/* Agar user upar hai to "Latest pe jao" button dikhao */}
      {!atBottom && (
        <button
          onClick={() =>
            ref.current.scrollToIndex({ index: "LAST", behavior: "smooth" })
          }
        >
          Latest pe jao
        </button>
      )}

      <Virtuoso
        ref={ref}
        style={{ height: 400, border: "1px solid #ccc" }}
        data={messages}
        firstItemIndex={firstItemIndex} // prepend ka jaadu yahi hai
        initialTopMostItemIndex={messages.length - 1} // pehli baar last message se start
        startReached={loadOlder} // top pe pahunche to purane lao
        followOutput={(isAtBottom) => (isAtBottom ? "smooth" : false)} // auto-scroll
        atBottomStateChange={setAtBottom} // neeche hai ya nahi track karo
        alignToBottom // kam messages ho to bhi neeche se align
        itemContent={(index, m) => (
          <div
            style={{
              padding: "6px 12px",
              textAlign: m.mine ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 14,
                background: m.mine ? "#1f3a5f" : "#e8edf2",
                color: m.mine ? "#fff" : "#000",
              }}
            >
              {m.text}
            </span>
          </div>
        )}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message likho..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
