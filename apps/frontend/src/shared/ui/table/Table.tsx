import { formatAddedAt } from "@shared/lib/format/formatAddedAt";
import { Image } from "@shared/types/types";
import ClockIcon from "@shared/assets/clock-icon.svg?react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState } from "react";

interface TablesTrack {
  name: string;
  added_at: string;
  id: string;
  duration_ms: number;
  album: {
    id: string;
    name: string;
    images: Image[];
  };
  artists: {
    id: string;
    uri: string;
    href: string;
    name: string;
    type: string;
    external_urls: {
      spotify: string;
    };
  }[];
}

const data = [
  {
    album: {
      id: "0x4WtpS8RL49nXoHlMgQsW",
      name: "Часть чего-то большего",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b27387c79d18003e31d79fb7485c",
          width: 640,
          height: 640,
        },
        {
          url: "https://i.scdn.co/image/ab67616d00001e0287c79d18003e31d79fb7485c",
          width: 300,
          height: 300,
        },
        {
          url: "https://i.scdn.co/image/ab67616d0000485187c79d18003e31d79fb7485c",
          width: 64,
          height: 64,
        },
      ],
    },
    artists: [
      {
        id: "2zYmwYLeJvcr8vRQe5pQRa",
        uri: "spotify:artist:2zYmwYLeJvcr8vRQe5pQRa",
        href: "https://api.spotify.com/v1/artists/2zYmwYLeJvcr8vRQe5pQRa",
        name: "Валентин Стрыкало",
        type: "artist",
        external_urls: {
          spotify: "https://open.spotify.com/artist/2zYmwYLeJvcr8vRQe5pQRa",
        },
      },
    ],
    duration_ms: 352191,
    id: "2x41NYjqXQJjgkGSr4q95h",
    name: "Кладбище самолетов",
    added_at: "2025-06-30 12:17:03.007446+00",
  },
  {
    album: {
      id: "0x4WtpS8RL49nXoHlMgQsW",
      name: "Часть чего-то большего",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b27387c79d18003e31d79fb7485c",
          width: 640,
          height: 640,
        },
        {
          url: "https://i.scdn.co/image/ab67616d00001e0287c79d18003e31d79fb7485c",
          width: 300,
          height: 300,
        },
        {
          url: "https://i.scdn.co/image/ab67616d0000485187c79d18003e31d79fb7485c",
          width: 64,
          height: 64,
        },
      ],
    },
    artists: [
      {
        id: "2zYmwYLeJvcr8vRQe5pQRa",
        uri: "spotify:artist:2zYmwYLeJvcr8vRQe5pQRa",
        href: "https://api.spotify.com/v1/artists/2zYmwYLeJvcr8vRQe5pQRa",
        name: "Валентин Стрыкало",
        type: "artist",
        external_urls: {
          spotify: "https://open.spotify.com/artist/2zYmwYLeJvcr8vRQe5pQRa",
        },
      },
    ],
    duration_ms: 258989,
    id: "4k8pab2VcnRFoEotbGav0g",
    name: "Улица Сталеваров",
    added_at: "2025-07-04 11:12:29.337+00",
  },
];

const columns: ColumnDef<TablesTrack>[] = [
  {
    id: "index",
    header: () => <span className="cursor-text text-lg mx-2">#</span>,
    size: 40,
    maxSize: 40,
    cell: ({ row }) => <span className="text-lg mx-2">{row.index + 1}</span>,
    enableResizing: false,
  },
  {
    accessorKey: "name",
    header: () => <span className="hover:text-white">Название</span>,
    size: 565,
    minSize: 180,
    enableResizing: true,
    cell: ({ row }) => {
      const track = row.original;
      const imageUrl = track.album.images[0]?.url;
      const artistName = track.artists?.[0]?.name || "";
      return (
        <div className="flex items-center gap-3 min-w-0">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={track.name}
              className="w-10 h-10 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0">
            <Link
              to={`/track/${track.id}`}
              className="font-medium text-white hover:underline"
            >
              {track.name}
            </Link>
            <Link
              to={`/artist/${track.artists[0].id}`}
              className="text-zinc-400 group-hover:text-white hover:underline text-sm"
            >
              {artistName}
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "album",
    header: () => <span className="hover:text-white">Альбом</span>,
    size: 390,
    minSize: 120,
    enableResizing: true,
    cell: ({ row }) => (
      <Link
        to={`/album/${row.original.album.id}`}
        className="text-zinc-400 hover:underline group-hover:text-white"
      >
        {row.original.album.name}
      </Link>
    ),
  },
  {
    accessorKey: "added_at",
    header: () => <span className="hover:text-white">Дата добавления</span>,
    size: 295,
    minSize: 140,
    enableResizing: true,
    cell: ({ row }) => (
      <p className="text-zinc-400">{formatAddedAt(row.original.added_at)}</p>
    ),
  },
  {
    accessorKey: "duration_ms",
    header: () => (
      <div className="flex justify-end w-full">
        <ClockIcon className="w-5 h-5 hover:text-white mr-7" />
      </div>
    ),
    size: 155,
    minSize: 155,
    cell: ({ row }) => (
      <div className="text-right mr-7">
        {formatMsToMinutesAndSeconds(row.original.duration_ms)}
      </div>
    ),
    enableResizing: false,
  },
];

export const Table = () => {
  const [colSizes, setColSizes] = useState([40, 565, 390, 295, 155]);

  const sizedColumns = useMemo(
    () =>
      columns.map((col, i) => ({
        ...col,
        size: colSizes[i],
      })),
    [columns, colSizes]
  );
  const minSizes = [40, 180, 120, 140, 155];
  const table = useReactTable({
    data,
    columns: sizedColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });
  const resizingCol = useRef<number | null>(null);
  const prevX = useRef<number | null>(null);

  const handleResizeEnd = () => {
    resizingCol.current = null;
    document.removeEventListener("mousemove", handleResizeMove as any);
    document.removeEventListener("touchmove", handleResizeMove as any);
    document.removeEventListener("mouseup", handleResizeEnd as any);
    document.removeEventListener("touchend", handleResizeEnd as any);
  };

  const resizeColumns = ({
    sizes,
    index,
    deltaX,
  }: {
    sizes: number[];
    index: number;
    deltaX: number;
  }) => {
    let newSizes = [...sizes];

    if (deltaX < 0) {
      let remain = -deltaX;
      let i = index;
      let totalShrink = 0;

      const min = minSizes[i];
      const canShrink = newSizes[i] - min;
      const shrink = Math.min(canShrink, remain);
      newSizes[i] -= shrink;
      totalShrink += shrink;
      remain -= shrink;

      let left = i - 1;
      while (remain > 0 && left >= 0) {
        const minLeft = minSizes[left];
        const canShrinkLeft = newSizes[left] - minLeft;
        const shrinkLeft = Math.min(canShrinkLeft, remain);
        newSizes[left] -= shrinkLeft;
        totalShrink += shrinkLeft;
        remain -= shrinkLeft;
        left--;
      }

      if (index + 1 < newSizes.length) {
        newSizes[index + 1] += totalShrink;
      }
    } else {
      let remain = deltaX;
      let right = index + 1;
      let totalShrink = 0;
      while (remain > 0 && right < newSizes.length) {
        const min = minSizes[right];
        const canShrink = newSizes[right] - min;
        const shrink = Math.min(canShrink, remain);
        newSizes[right] -= shrink;
        totalShrink += shrink;
        remain -= shrink;
        right++;
      }
      newSizes[index] += totalShrink;
    }
    return newSizes;
  };

  const handleResizeMove = (e: MouseEvent | TouchEvent) => {
    if (resizingCol.current === null) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const index = resizingCol.current;

    if (prevX.current !== null) {
      const deltaX = currentX - prevX.current;
      setColSizes((prevSizes) =>
        resizeColumns({
          sizes: prevSizes,
          index,
          deltaX,
        })
      );
    }
    prevX.current = currentX;
  };

  const handleResizeStart = (colIdx: number, e: any) => {
    resizingCol.current = colIdx;
    prevX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    document.addEventListener("mousemove", handleResizeMove as any);
    document.addEventListener("touchmove", handleResizeMove as any, {
      passive: false,
    });
    document.addEventListener("mouseup", handleResizeEnd as any);
    document.addEventListener("touchend", handleResizeEnd as any);
  };

  return (
    <div className="relative">
      <div className="absolute top-10 left-0 bg-zinc-600/70 w-full h-[1px]" />
      <table className="w-full">
        <thead className="group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th
                  key={header.id}
                  className={`
                    text-left px-3 font-medium text-sm text-gray-400 cursor-default relative
                    group-hover:border-r group-hover:border-zinc-500 first:border-none last:border-r-0
                  `}
                  style={{
                    width: header.getSize(),
                    position: "relative",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={(e) => handleResizeStart(i, e.nativeEvent)}
                      onTouchStart={(e) => handleResizeStart(i, e.nativeEvent)}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "5px",
                        cursor: "col-resize",
                        userSelect: "none",
                        zIndex: 10,
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={columns.length}
              style={{
                height: "32px",
                padding: 0,
                border: "none",
                background: "transparent",
              }}
            />
          </tr>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="group hover:bg-zinc-800">
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={cell.id}
                  className={`
                  px-3 py-2
                  ${i === 0 ? "rounded-l-sm" : ""}
                  ${
                    i === row.getVisibleCells().length - 1 ? "rounded-r-sm" : ""
                  }
                `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
