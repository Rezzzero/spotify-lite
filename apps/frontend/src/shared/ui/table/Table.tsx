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
    header: () => <span className="cursor-text">#</span>,
    size: 40,
    cell: ({ row }) => row.index + 1,
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
    minSize: 200,
    enableResizing: true,
    cell: ({ row }) => (
      <p className="text-zinc-400">{formatAddedAt(row.original.added_at)}</p>
    ),
  },
  {
    accessorKey: "duration_ms",
    header: () => (
      <div className="flex justify-end w-full">
        <ClockIcon className="w-5 h-5 hover:text-white " />
      </div>
    ),
    size: 125,
    cell: ({ row }) => (
      <div className="text-right w-full">
        {formatMsToMinutesAndSeconds(row.original.duration_ms)}
      </div>
    ),
    enableResizing: false,
  },
];

export const Table = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="overflow-x-auto p-2 relative">
      <div className="absolute top-10 left-0 bg-zinc-600/70 w-full h-[1px]" />
      <table>
        <thead className="group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`
                    h-6 text-left px-3 font-medium text-sm text-gray-400 cursor-default relative
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
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "5px",
                        cursor: "col-resize",
                        userSelect: "none",
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
