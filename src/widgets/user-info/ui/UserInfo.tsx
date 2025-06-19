import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { useUserInfo } from "../model/useUserInfo";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";

export const UserInfo = () => {
  const { userInfo, loading, imageColors, editModal, setEditModal, isOwner } =
    useUserInfo();
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <div
          style={{ background: headerGradient }}
          className="flex items-center gap-7 p-7"
        >
          <div
            onClick={() => {
              if (isOwner) {
                setEditModal((prev) => !prev);
              }
            }}
            className="flex items-center bg-zinc-900 rounded-full w-[232px] h-[232px] shadow-xl group relative"
          >
            {isOwner ? (
              <>
                <img
                  src={userInfo?.imageUrl || USER_PLACEHOLDER_URL}
                  alt="playlist image"
                  className={`w-full h-full object-cover rounded-full ${
                    userInfo?.imageUrl
                      ? "group-hover:opacity-20"
                      : "group-hover:opacity-0"
                  } transition-opacity duration-200`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <EditIcon className="w-13 h-13" />
                  <p className="font-bold">Выбрать фото</p>
                </div>
              </>
            ) : (
              <img
                src={userInfo?.imageUrl || USER_PLACEHOLDER_URL}
                alt="playlist image"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 pt-12 h-full">
            <p className="text-sm font-semibold">Профиль</p>
            <h1 className="text-[90px] font-bold leading-none">
              {userInfo?.userName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-7">
          <button className="text-sm font-semibold border border-gray-600 hover:border-white rounded-full px-4 h-8 hover:scale-105 cursor-pointer">
            Подписаться
          </button>
          <CustomTooltip
            title={`Открыть контекстное меню: ${userInfo?.userName}`}
            placement="top"
            customFontSize={13}
          >
            <button type="button">
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
        </div>
      </div>
      {editModal && (
        <div className="w-full h-full bg-white text-black">Edit modal</div>
      )}
    </>
  );
};
