import { Link } from "react-router-dom";
import { useFollowingInfo } from "../model/useFollowingInfo";
import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { Loader } from "@shared/ui/loader/Loader";
import PageNotFoundIcon from "@shared/assets/page-not-found-icon.svg?react";

const filterList = [
  {
    name: "Все",
    value: "all",
  },
  {
    name: "Исполнители",
    value: "artist",
  },
  {
    name: "Друзья",
    value: "user",
  },
];

export const FollowingInfo = () => {
  const {
    user,
    filteredFollowings,
    loading,
    currentFilter,
    handleSelectFilter,
  } = useFollowingInfo();

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center gap-5 px-3 py-70">
        <PageNotFoundIcon className="w-14 h-14" />
        <h2 className="font-bold text-3xl">Не удалось найти страницу</h2>
        <p className="font-semibold text-gray-200">
          Попробуй поискать что-нибудь другое.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 px-3 pt-18">
      <h1 className="text-3xl font-bold px-2 mb-3">Уже подписаны</h1>
      <div className="flex gap-3">
        {filterList.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleSelectFilter(filter.value)}
            className={`px-3 py-[6px] rounded-full text-sm font-semibold cursor-pointer ${
              filter.value === currentFilter
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-zinc-800 hover:bg-[#2d2d2e]"
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        {filteredFollowings.map((sub) => (
          <Link
            key={sub.id}
            to={sub.type === "artist" ? `/artist/${sub.id}` : `/user/${sub.id}`}
            className="flex flex-col gap-2 hover:bg-[#242426] p-2 rounded-md"
          >
            <img
              src={
                sub.type === "artist"
                  ? sub.images[0].url
                  : sub.avatar_url || USER_PLACEHOLDER_URL
              }
              alt="artist image"
              className="w-[175px] h-[175px] rounded-full"
            />
            <p className="font-normal hover:underline">{sub.name}</p>
            <p className="text-gray-400 text-sm">
              {sub.type === "artist" ? "Испольнитель" : "Профиль"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
