import { CardItem, Track } from "@shared/types/types";
import { CardList } from "@shared/ui/card-list/CardList";
import { useSearchCategoryResults } from "../model/useSearchCategoryResults";
import { Table } from "@shared/ui/table/Table";

export const SearchCategoryResults = () => {
  const { items, category } = useSearchCategoryResults();

  if (category === "tracks")
    return (
      <div className="flex flex-col w-full gap-5 px-3 mb-10">
        <Table
          tracks={items as Track[]}
          tableKey="withoutAddedAt"
          withImage={true}
          withAlbum={true}
        />
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
