import { CardList } from "../../../shared/ui/card-list/CardList";
import { useSectionList } from "../model/useSectionList";

export const SectionList = () => {
  const { title, list, type } = useSectionList();
  return (
    <div className="flex flex-col gap-10 py-20">
      <h2 className="text-3xl font-bold px-5">{title}</h2>
      <CardList items={list} itemType={type} isSectionPage />
    </div>
  );
};
