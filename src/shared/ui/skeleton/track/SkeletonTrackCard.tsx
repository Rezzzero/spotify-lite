import "./SkeletonTrackCard.css";

export const SkeletonTrackCard = () => (
  <div className="skeleton-track-card items-center py-[6px] pr-6 rounded-md flex px-2">
    <div className="flex items-center gap-4 flex-1 pl-5">
      <div className="skeleton bg-zinc-800 w-10 h-10 rounded-md" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="skeleton bg-zinc-800 h-4 w-32 rounded" />
        <div className="skeleton bg-zinc-800 h-3 w-24 rounded" />
      </div>
    </div>
    <div className="skeleton bg-zinc-800 w-8 h-4 ml-auto rounded" />
  </div>
);
