import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { useUserInfo } from "../model/useUserInfo";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";

export const UserInfo = () => {
  const {
    userInfo,
    loading,
    imageColors,
    editModal,
    setEditModal,
    isOwner,
    editModalRef,
    fileInputRef,
    previewImage,
    handleImageChange,
    handleSelectImage,
    userImagePreview,
    userName,
    handleUserNameChange,
    handleDeletePreviewImage,
    handleSaveProfile,
  } = useUserInfo();
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
                  src={
                    userImagePreview ||
                    userInfo?.imageUrl ||
                    USER_PLACEHOLDER_URL
                  }
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
          {!isOwner && (
            <button className="text-sm font-semibold border border-gray-600 hover:border-white rounded-full px-4 h-8 hover:scale-105 cursor-pointer">
              Подписаться
            </button>
          )}
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
        <>
          <div className="bg-black/80 fixed inset-0 z-10" />

          <div
            ref={editModalRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[525px] z-30 py-5 pl-5 pr-3 bg-[#2d2d2e] rounded-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">Данные профиля</h2>
              <button
                type="button"
                onClick={() => {
                  setEditModal(false);
                }}
                className="hover:bg-zinc-700 rounded-full p-3"
              >
                <CrossIcon className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-5 w-full pr-2">
              <div className="flex flex-col gap-2 w-[180px] h-[180px] justify-center items-center group relative">
                <img
                  src={
                    previewImage || userInfo?.imageUrl || USER_PLACEHOLDER_URL
                  }
                  alt="user edit image"
                  className="w-full h-full object-cover rounded-full shadow-xl group-hover:opacity-20 transition-opacity duration-200"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectImage();
                    }}
                    className="font-bold hover:underline"
                  >
                    Выбрать фото
                  </button>
                  <EditIcon className="w-11 h-11 mx-auto" />
                  <button
                    type="button"
                    onClick={handleDeletePreviewImage}
                    className="font-bold hover:underline"
                  >
                    Удалить фото
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex flex-col w-full gap-2 flex-1">
                <label
                  htmlFor="userName"
                  className="flex flex-col gap-2 relative group focus-within:[&>p]:opacity-100"
                >
                  <p className="absolute text-xs left-3 -top-2 opacity-0 font-bold transition-all duration-400 ease-in-out">
                    Название
                  </p>
                  <input
                    id="userName"
                    type="text"
                    className="w-full h-10 bg-zinc-900 rounded-md px-3 outline-none border border-transparent focus:border-zinc-500 focus:bg-zinc-700"
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="bg-white rounded-full self-end w-[140px] text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
