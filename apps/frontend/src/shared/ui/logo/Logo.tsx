import { Tooltip } from "@mui/material";
import SpotifyLogo from "../../assets/spotify-logo.svg";
import { Route } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import { APP_NAME } from "@config/app.config";

export const Logo = () => {
  return (
    <Tooltip
      title={APP_NAME}
      disableInteractive
      slotProps={{
        tooltip: {
          sx: {
            color: "#fff",
            backgroundColor: "#262729",
            fontSize: "14px",
            border: "1px solid #fff",
          },
        },
      }}
    >
      <Link to={Route.HOME}>
        <img
          src={SpotifyLogo}
          alt="spotify logo"
          className="w-9 h-9 cursor-pointer ml-2"
        />
      </Link>
    </Tooltip>
  );
};
