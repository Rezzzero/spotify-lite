import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  isFilterDropDownOpen?: boolean;
  isSortDropDownOpen?: boolean;
  isSectionPage?: boolean;
  isSearchPage?: boolean;
  category?: string;
};

export const PageLayout = ({
  children,
  scrollContainerRef,
  isFilterDropDownOpen = false,
  isSortDropDownOpen = false,
  isSectionPage,
  isSearchPage,
  category,
}: PageLayoutProps) => {
  const isAnyDropDownOpen = isFilterDropDownOpen || isSortDropDownOpen;

  const paddingClass = isSectionPage || isSearchPage ? "pb-4 pl-3 pr-5" : "";
  let gapClass = "";
  if (isSearchPage) {
    gapClass = category ? "gap-0" : "gap-10";
  } else {
    gapClass = "gap-20";
  }

  return (
    <div
      ref={scrollContainerRef}
      className={`flex flex-col ${paddingClass} ${gapClass} bg-[#141414] w-full h-[83vh] rounded-xl page-content [&::-webkit-scrollbar]:hidden relative ${
        isAnyDropDownOpen ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      {children}
    </div>
  );
};
