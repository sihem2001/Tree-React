import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mdi/react";
import { mdiAccountArrowDownOutline } from "@mdi/js";
import { styled } from "@mui/material/styles";

// --- STYLES ---

const StyledList = styled(List)(() => ({
  width: "200%",
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "20px 20px 0 0",
  },
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.12), 0 3px 12px rgba(0, 0, 0, 0.06)",
  },
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 64,
  height: 64,
  border: "3px solid #fff",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  fontWeight: "bold",
  fontSize: "2rem",
  color: "#4c51bf",
  "&:hover": {
    transform: "scale(1.06)",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
  },
}));

const DescendantCounter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "20px",
  marginTop: "14px",
  padding: "8px 16px",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.35)",
  },
}));

// --- COMPOSANT ---

const CustomNode = ({ treeData, config }) => {
  const node = treeData[0];

  const countDescendents = (n) => {
    if (!n.children) return 0;
    let count = n.children.length;
    n.children.forEach((child) => (count += countDescendents(child)));
    return count;
  };

  return (
    <StyledList>
      <ListItem
        alignItems="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: "2px 6px 8px",
        }}
      >
        {config.showAvatars && (
          <ListItemAvatar sx={{ marginBottom: 2 }}>
            <StyledAvatar alt={node.name} src={node.avatarUrl}>
              {!node.avatarUrl && node.name?.charAt(0).toUpperCase()}
            </StyledAvatar>
          </ListItemAvatar>
        )}

        <Box sx={{ mt: 1, width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2d3748",
              fontWeight: 600,
              mb: 0.6,
              fontSize: "2.7rem",
              lineHeight: 1.2,
            }}
          >
            {node.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#667eea",
              fontWeight: 500,
              mb: 1,
              fontSize: "2.5rem",
            }}
          >
            {node.role}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#718096",
              lineHeight: 1.5,
              fontSize: "1.9rem",
              maxHeight: "3em",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {node.description}
          </Typography>
        </Box>

        <DescendantCounter>
          <Icon
            path={mdiAccountArrowDownOutline}
            size={0.9}
            style={{ color: "white", marginRight: "8px" }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "white",

              fontSize: "1.5rem",
            }}
          >
            {countDescendents(node)} team members
          </Typography>
        </DescendantCounter>
      </ListItem>
    </StyledList>
  );
};

export default CustomNode;
