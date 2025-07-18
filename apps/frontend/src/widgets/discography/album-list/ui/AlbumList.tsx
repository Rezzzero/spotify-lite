import { Album } from "@shared/types/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "@shared/ui/table/Table";

export const AlbumList = ({
  albums,
  scrollContainerRef,
  setActiveAlbum,
}: {
  albums: Album[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  setActiveAlbum: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const rowVirtualizer = useVirtualizer({
    count: albums.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 300,
    overscan: 3,
  });

  const scrollOffset = rowVirtualizer.scrollOffset ?? 0;
  const virtualItems = rowVirtualizer.getVirtualItems();

  const firstFullyVisible = [...virtualItems]
    .reverse()
    .find((item) => item.start <= scrollOffset - 50);

  const firstVisibleIndex = firstFullyVisible?.index ?? virtualItems[0]?.index;
  const activeAlbumName =
    scrollOffset >= 150 ? albums[firstVisibleIndex]?.name : null;

  useEffect(() => {
    setActiveAlbum(activeAlbumName);
  }, [activeAlbumName, setActiveAlbum]);

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const album = albums[virtualItem.index];
        return (
          <div
            key={album.id}
            data-index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex gap-5 px-7">
                <img
                  src={album.images[1].url}
                  alt={`${album.name} image`}
                  className="w-32 h-32 rounded-md"
                  loading="lazy"
                />
                <div>
                  <Link
                    to={`/album/${album.id}`}
                    className="text-3xl font-bold hover:underline"
                  >
                    {album.name}
                  </Link>
                  <p className="font-bold text-zinc-400 text-sm leading-none pb-1">
                    {album.album_type === "album" ? "Альбом" : "Сингл"}
                    <span className="text-xl font-bold relative top-[2px] mx-1">
                      ·
                    </span>
                    {album.release_date.split("-")[0]}
                    <span className="text-xl font-bold relative top-[2px] mx-1">
                      ·
                    </span>
                    {album.total_tracks}{" "}
                    {album.total_tracks === 1 ? "трек" : "треков"}
                  </p>
                </div>
              </div>
              <Table
                tracks={album.tracks.items}
                tableKey="withoutAlbum"
                album={album}
                withoutArtistLink={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
