import { Virtuoso } from "react-virtuoso";

// 1000 users ka fake data
const users = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
}));

function VirtuosoDemo() {
  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      {/* <Virtuoso
        style={{ height: 400 }}
        totalCount={10000}
        itemContent={(index) => <div>Row {index}</div>}
      >
        VirtuosoDemo
      </Virtuoso> */}

      <Virtuoso
        style={{ height: 400 }}
        data={users} // data: array dete ho to totalCount ki zaroorat nahi, length Virtuoso khud le leta hai.
        computeItemKey={(index, user) => user.id} // stable key computeItemKey: har item ko unique key deta hai taaki data badalne par state na bigde.
        itemContent={(
          index,
          user // itemContent(index, user): pehla argument index, dusra us index ka data item.
        ) => (
          <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            {user.name}
          </div>
        )}
      >
        VirtuosoDemo
      </Virtuoso>
    </div>
  );
}

export default VirtuosoDemo;
