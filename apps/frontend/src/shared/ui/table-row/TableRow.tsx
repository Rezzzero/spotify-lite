import { TablesTrack } from "@shared/types/types";
import { flexRender, Row } from "@tanstack/react-table";
import { memo } from "react";

export const TableRow = memo(
  ({ row, colSizes }: { row: Row<TablesTrack>; colSizes: number[] }) => {
    return (
      <tr key={row.id} className="group hover:bg-zinc-800 relative">
        {row.getVisibleCells().map((cell, i) => (
          <td
            key={cell.id}
            className={`
      px-3 py-2
      ${i === 0 ? "rounded-l-sm" : ""}
      ${i === row.getVisibleCells().length - 1 ? "rounded-r-sm" : ""}
    `}
            style={{
              width: colSizes[i],
              maxWidth: colSizes[i],
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    );
  }
);
