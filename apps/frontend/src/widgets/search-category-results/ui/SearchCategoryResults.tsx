import { CardItem, Track } from "@shared/types/types";
import { CardList } from "@shared/ui/card-list/CardList";
import { useSearchCategoryResults } from "../model/useSearchCategoryResults";
import clockIcon from "@shared/assets/clock-icon.svg";
import { CategoryResultsTrackCard } from "../category-results-track-card/ui/CategoryResultsTrackCard";

export const SearchCategoryResults = () => {
  const { items, category, playlists, user } = useSearchCategoryResults();

  if (category === "tracks")
    return (
      <div className="flex flex-col w-full gap-5 px-3 mb-10">
        <div className="grid w-full items-center text-sm border-b border-zinc-800 text-gray-400 py-2 pr-10 grid-cols-[50px_2fr_2fr_auto]">
          <p className="text-lg pl-5 pr-4">#</p>
          <p>Название</p>
          <p className="ml-4">Альбом</p>
          <img
            src={clockIcon}
            alt="clock icon"
            className="w-5 h-5 justify-self-end"
          />
        </div>
        <div className="flex flex-col">
          {(items as Track[]).map((track, index) => (
            <CategoryResultsTrackCard
              key={track.id}
              track={track}
              index={index}
              isOwner={false}
              playlists={playlists}
              userId={user?.user?.id}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div className="py-5 px-3 mb-10">
      <CardList
        items={items as CardItem[]}
        itemType={category?.slice(0, -1) as string}
        isCategoryPage
      />
    </div>
  );
};
