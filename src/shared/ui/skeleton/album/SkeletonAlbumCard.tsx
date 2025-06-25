import "./SkeletonAlbumCard.css";

export const SkeletonAlbumCard = () => (
  <div className="flex gap-5 px-7 skeleton-album-card">
    <div className="w-32 h-32 bg-zinc-800 rounded-md" />
    <div className="flex flex-col gap-3 flex-1">
      <div className="h-8 w-2/3 bg-zinc-800 rounded" />
      <div className="h-4 w-1/3 bg-zinc-800 rounded" />
      <div className="h-4 w-1/4 bg-zinc-800 rounded" />
    </div>
  </div>
);
