export default function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead className="bg-[#020617] text-gray-400">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#020617]">
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-t border-white/5 hover:bg-white/5 transition"
            >
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
