import { ArrowBackIosNewRounded, DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useContext } from "react";
import { getFontColor } from "../utils";
import { UserContext } from "../contexts/UserContext";
import { useSystemTheme } from "../hooks/useSystemTheme";
import { isDarkMode } from "../utils/colorUtils";

interface TopBarProps {
  title: string;
}

export const TopBar = ({ title }: TopBarProps) => {
  const n = useNavigate();
  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);
  const systemTheme = useSystemTheme();
  const dark = isDarkMode(user.darkmode, systemTheme, theme.secondary);

  const toggleDarkMode = () => setUser((prev) => ({ ...prev, darkmode: dark ? "light" : "dark" }));

  return (
    <Box sx={{ flexGrow: 1, mb: "100px" }}>
      <StyledAppBar sx={{ py: "18px !important", mb: "48px !important" }}>
        <Toolbar
          sx={{
            position: "relative",
            m: "0 !important",
            p: "0 !important",
            minHeight: "0 !important",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, color: getFontColor(theme.secondary) }}
            onClick={() => n("/")}
          >
            <ArrowBackIosNewRounded />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 600,
              color: getFontColor(theme.secondary),
            }}
          >
            {title}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton
                size="large"
                color="inherit"
                aria-label="Toggle dark mode"
                onClick={toggleDarkMode}
                sx={{ mr: "96px", color: getFontColor(theme.secondary) }}
              >
                {dark ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)`
  z-index: 99;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: ${({ theme }) => theme.secondary + "c1"};
  box-shadow: none;
  /* border: 2px solid red; */
  @media (min-width: 1024px) {
    padding: 0 16vw;
  }
`;
