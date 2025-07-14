import { formatAddedAt } from "@shared/lib/format/formatAddedAt";
import { Album, TablesTrack, Track } from "@shared/types/types";
import ClockIcon from "@shared/assets/clock-icon.svg?react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { TrackPlayButton } from "../track-play-button/TrackPlayButton";
import { TrackMenuButton } from "../track-menu-button/TrackMenuButton";
import { TableRow } from "../table-row/TableRow";
import { useTableStore } from "@app/store/table/useTableStore";

export const Table = ({
  tracks,
  tableKey,
  album,
  withAlbum,
  withAddedAt,
  withImage,
  isOwner,
  withoutAlbumLink,
  withoutArtistLink,
  setTracks,
  handleUpdateDuration,
}: {
  tracks: TablesTrack[];
  tableKey: string;
  album?: Album;
  withAlbum?: boolean;
  withAddedAt?: boolean;
  withImage?: boolean;
  isOwner?: boolean;
  withoutAlbumLink?: boolean;
  withoutArtistLink?: boolean;
  setTracks?: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration?: (trackDuration: number, isAdd: boolean) => void;
}) => {
  const { colSizes, setColSizes } = useTableStore();
  const [localColSize, setLocalColSize] = useState(colSizes[tableKey]);
  const columns = [
    {
      id: "index",
      header: () => <span className="cursor-text text-lg mx-2">#</span>,
      maxSize: 40,
      cell: ({ row }: CellContext<TablesTrack, unknown>) => (
        <TrackPlayButton track={row.original} index={row.index} album={album} />
      ),
      enableResizing: false,
    },
    {
      accessorKey: "name",
      header: () => <span className="hover:text-white">Название</span>,
      minSize: 180,
      enableResizing: true,
      cell: ({ row }: CellContext<TablesTrack, unknown>) => {
        const track = row.original;
        const imageUrl = track.album?.images[0]?.url || "";
        const artistName = track.artists?.[0]?.name || "";
        return (
          <div className="flex items-center gap-3 min-w-0">
            {imageUrl && withImage && (
              <img
                src={imageUrl}
                alt={track.name}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <Link
                to={`/track/${track.id}`}
                className="font-medium text-white hover:underline truncate block"
                title={track.name}
              >
                {track.name}
              </Link>
              <Link
                to={`/artist/${track.artists[0].id}`}
                className="text-zinc-400 group-hover:text-white hover:underline text-sm truncate block"
                title={artistName}
              >
                {artistName}
              </Link>
            </div>
          </div>
        );
      },
    },
    withAlbum && {
      accessorKey: "album",
      header: () => <span className="hover:text-white">Альбом</span>,
      minSize: 120,
      enableResizing: true,
      cell: ({ row }: CellContext<TablesTrack, unknown>) => (
        <Link
          to={`/album/${row.original.album.id}`}
          className="text-zinc-400 text-sm font-medium hover:underline group-hover:text-white truncate block w-full"
          title={row.original.album.name}
        >
          {row.original.album.name}
        </Link>
      ),
    },
    withAddedAt && {
      accessorKey: "added_at",
      header: () => <span className="hover:text-white">Дата добавления</span>,
      minSize: 165,
      enableResizing: true,
      cell: ({ row }: CellContext<TablesTrack, unknown>) => (
        <p className="text-zinc-400 text-sm font-medium">
          {formatAddedAt(row.original.added_at ? row.original.added_at : "")}
        </p>
      ),
    },
    {
      accessorKey: "duration_ms",
      header: () => (
        <div className="flex justify-end w-full">
          <ClockIcon className="w-5 h-5 hover:text-white mr-7" />
        </div>
      ),
      minSize: 155,
      cell: ({ row }: CellContext<TablesTrack, unknown>) => (
        <div className="text-right mr-7 relative">
          {formatMsToMinutesAndSeconds(row.original.duration_ms)}
          <TrackMenuButton
            track={row.original}
            album={album}
            setTracks={setTracks}
            handleUpdateDuration={handleUpdateDuration}
            isOwner={isOwner}
            withoutAlbumLink={withoutAlbumLink}
            withoutArtistLink={withoutArtistLink}
          />
        </div>
      ),
      enableResizing: false,
    },
  ].filter(Boolean) as ColumnDef<TablesTrack>[];

  useEffect(() => {
    setLocalColSize(colSizes[tableKey]);
  }, [colSizes, tableKey]);

  const sizedColumns = useMemo(
    () =>
      columns.map((col, i) => ({
        ...col,
        size: localColSize[i],
      })),
    [columns, localColSize]
  );
  const minSizes = [40, 180, 120, 140, 155];
  const table = useReactTable({
    data: tracks,
    columns: sizedColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });
  const resizingCol = useRef<number | null>(null);
  const prevX = useRef<number | null>(null);
  const localColSizeRef = useRef(localColSize);

  useEffect(() => {
    localColSizeRef.current = localColSize;
  }, [localColSize]);

  const handleResizeEnd = () => {
    setColSizes((prev) => ({
      ...prev,
      [tableKey]: [...localColSizeRef.current],
    }));
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
      setLocalColSize((prevLocalSize) =>
        resizeColumns({
          sizes: prevLocalSize,
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
            <TableRow key={row.id} row={row} colSizes={localColSize} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
