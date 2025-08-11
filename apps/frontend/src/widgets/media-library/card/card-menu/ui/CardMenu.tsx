import { MediaMenu } from "@features/media-menu/ui/MediaMenu";
import { Modal, Box } from "@mui/material";
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
  return (
    <Modal open={isOpen} onClose={onClose} hideBackdrop>
      <Box
        sx={{
          position: "absolute",
          top: position.top,
          left: position.left,
          color: "white",
          backgroundColor: "#2d2d2e",
        }}
      >
        <MediaMenu
          mediaType={type}
          menuRef={ref}
          closeMenu={onClose}
          onOpenDeleteModal={onOpenDeleteModal}
          openedFromMediaLibary
          isOwner={isOwner}
        />
      </Box>
    </Modal>
  );
};
