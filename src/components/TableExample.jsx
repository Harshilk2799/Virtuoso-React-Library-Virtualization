import { TableVirtuoso } from "react-virtuoso";

// rows: table ka data (1000 rows)
const rows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  score: (i * 37) % 100,
}));

// Table component bahar define karo. Virtuoso iske props (style etc.) deta hai,
// hum bas {...props} aage bhej dete hain aur apni styling jodte hain.
const TableEl = (props) => (
  <table
    {...props}
    style={{ ...props.style, width: "100%", borderCollapse: "collapse" }}
  />
);

export default function TableExample() {
  return (
    <TableVirtuoso
      style={{ height: 400 }}
      data={rows}
      components={{ Table: TableEl }}
      // fixedHeaderContent: scroll karne par bhi header upar chipka rehta hai.
      fixedHeaderContent={() => (
        <tr style={{ background: "#f0f4f8" }}>
          <th style={{ textAlign: "left", padding: 8 }}>ID</th>
          <th style={{ textAlign: "left", padding: 8 }}>Name</th>
          <th style={{ textAlign: "left", padding: 8 }}>Role</th>
          <th style={{ textAlign: "left", padding: 8 }}>Score</th>
        </tr>
      )}
      // fixedFooterContent: neeche chipka footer.
      fixedFooterContent={() => (
        <tr style={{ background: "#f0f4f8" }}>
          <td colSpan={4} style={{ padding: 8 }}>
            Total rows: {rows.length}
          </td>
        </tr>
      )}
      // itemContent: sirf <td> return karo, <tr> Virtuoso khud banata hai.
      itemContent={(index, row) => (
        <>
          <td style={{ padding: 8 }}>{row.id}</td>
          <td style={{ padding: 8 }}>{row.name}</td>
          <td style={{ padding: 8 }}>{row.role}</td>
          <td style={{ padding: 8 }}>{row.score}</td>
        </>
      )}
    />
  );
}
