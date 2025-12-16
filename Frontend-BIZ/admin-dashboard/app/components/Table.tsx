export default function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[][];
}) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="border p-2 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="border p-2">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
