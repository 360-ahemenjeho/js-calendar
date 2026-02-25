import { Box } from "@mui/material";

export default function NavButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        color: "#007aff",
        fontSize: "20px",
        lineHeight: 1,
        transition: "background 0.15s",
        fontFamily: "inherit",
        "&:hover": { backgroundColor: "rgba(0,122,255,0.08)" },
        "&:active": { backgroundColor: "rgba(0,122,255,0.14)" },
      }}
    >
      {children}
    </Box>
  );
}
