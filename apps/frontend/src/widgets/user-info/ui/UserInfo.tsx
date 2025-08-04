import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { useUserInfo } from "../model/useUserInfo";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import { Loader } from "@shared/ui/loader/Loader";
import { Link } from "react-router-dom";
import { MediaHeader } from "@shared/ui/media-header/MediaHeader";
import { Box, Modal, Popper } from "@mui/material";
import { MediaMenu } from "@features/media-menu/ui/MediaMenu";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: 0,
};

export const UserInfo = () => {
  const {
    userInfo,
    loading,
    imageColors,
    editModal,
    setEditModal,
    isOwner,
    fileInputRef,
    previewImage,
    handleImageChange,
    handleSelectImage,
    userImagePreview,
    userName,
    handleUserNameChange,
    handleDeletePreviewImage,
    handleSaveProfile,
    menuModal,
    setMenuModal,
    menuModalRef,
    handleOpenMenu,
    menuAnchor,
    userToUsersSubs,
    handleSubscribe,
    handleUnsubscribe,
    sortedObject,
    openedPlaylists,
  } = useUserInfo();
  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );

  const mainImage =
    userImagePreview || userInfo?.imageUrl || USER_PLACEHOLDER_URL;

  const isSubscribed = userToUsersSubs.some((sub) => sub.id === userInfo?.id);

  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <MediaHeader
          imageColors={imageColors}
          mainImage={mainImage}
          mainName={userInfo?.userName}
          isOwner={isOwner}
          user={true}
          openEditModal={setEditModal}
          roundedFull={true}
        />
        <div className="flex items-center gap-3 px-5 py-7 relative">
          {!isOwner && (
            <button
              type="button"
              onClick={() => {
                if (isSubscribed) {
                  handleUnsubscribe();
                } else {
                  handleSubscribe();
                }
              }}
              className="text-sm font-semibold border border-gray-600 hover:border-white rounded-full px-4 h-8 hover:scale-105 cursor-pointer"
            >
              {isSubscribed ? "Уже подписаны" : "Подписаться"}
            </button>
          )}
          <CustomTooltip
            title={`Открыть контекстное меню: ${userInfo?.userName}`}
            placement="top"
            customFontSize={13}
          >
            <button type="button" onClick={(e) => handleOpenMenu(e)}>
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
          <Popper
            open={menuModal}
            anchorEl={menuAnchor}
            placement="bottom-start"
          >
            <MediaMenu
              menuRef={menuModalRef}
              isOwner={isOwner}
              mediaType="user"
              closeMenu={() => {
                setMenuModal(false);
              }}
              openEditMenu={() => setEditModal(true)}
              openedFromMediaLibary={false}
            />
          </Popper>
        </div>
        {userInfo && openedPlaylists && openedPlaylists.length > 0 && (
          <div className="flex flex-col gap-4 px-3 mb-10">
            <Link
              to={`/user/${userInfo.id}/playlists`}
              className="text-2xl font-bold px-2 hover:underline"
            >
              Открытые плейлисты
            </Link>
            <div className="flex gap-3">
              {openedPlaylists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="flex flex-col gap-2 hover:bg-[#242426] cursor-pointer p-2 rounded-md"
                >
                  <img
                    src={playlist.images[0].url}
                    alt="playlist image"
                    className="w-[175px] h-[175px] rounded-md"
                  />
                  <p className="font-normal hover:underline">{playlist.name}</p>
                  <p className="text-gray-400">
                    {playlist.owner?.display_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {isOwner && sortedObject.length > 0 && userInfo && (
          <div className="flex flex-col gap-4 px-3">
            <Link
              to={`/user/${userInfo.id}/following`}
              className="text-2xl font-bold px-2 hover:underline"
            >
              Уже подписаны
            </Link>
            <div className="flex gap-3">
              {sortedObject.map((sub) => (
                <Link
                  key={sub.id}
                  to={
                    sub.type === "artist"
                      ? `/artist/${sub.id}`
                      : `/user/${sub.id}`
                  }
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
        )}
      </div>
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <Box sx={modalBoxStyle}>
          <div className="flex flex-col gap-5 w-[525px] z-30 py-5 pl-5 pr-3 bg-[#2d2d2e] rounded-lg">
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
        </Box>
      </Modal>
    </>
  );
};
