import { MediaMenu } from "@features/media-menu/ui/MediaMenu";
import { Popper } from "@mui/material";
import React from "react";

type CardMenuProps = {
  type: string;
  position: { top: number; left: number };
  isOpen: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onOpenDeleteModal: () => void;
  isOwner?: boolean;
};

export const CardMenu = ({
  type,
  position,
  isOpen,
  ref,
  onClose,
  onOpenDeleteModal,
  isOwner,
}: CardMenuProps) => {
  const virtualAnchor = React.useMemo(
    () => ({
      getBoundingClientRect: () =>
        new DOMRect(position.left, position.top, 0, 0),
    }),
    [position.left, position.top]
  );

  return (
    <Popper
      open={isOpen}
      anchorEl={virtualAnchor}
      placement="bottom-start"
      style={{ zIndex: 10 }}
    >
      <MediaMenu
        mediaType={type}
        menuRef={ref}
        closeMenu={onClose}
        onOpenDeleteModal={onOpenDeleteModal}
        openedFromMediaLibary
        isOwner={isOwner}
      />
    </Popper>
  );
};
