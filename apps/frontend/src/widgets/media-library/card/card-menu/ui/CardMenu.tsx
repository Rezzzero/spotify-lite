import { Modal, Box } from "@mui/material";
import React from "react";

type CardMenuProps = {
  type: string;
  id: string;
  position: { top: number; left: number };
  isOpen: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export const CardMenu = ({
  type,
  id,
  position,
  isOpen,
  ref,
  onClose,
}: CardMenuProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} hideBackdrop>
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          top: position.top,
          left: position.left,
          color: "white",
          backgroundColor: "#2d2d2e",
        }}
      >
        {type === "playlist" && <p>Playlist {id}</p>}
        {type === "album" && <p>Album {id}</p>}
        {type === "artist" && <p>Artist {id}</p>}
      </Box>
    </Modal>
  );
};
