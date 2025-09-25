import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mdi/react";
import { mdiAccountArrowDownOutline } from "@mdi/js";

const CustomNode = (props) => {
  const treeData = props.treeData;
  const config = props.config;

  // Prendre seulement le premier element
  const node = treeData[0];

  const countDescendents = (node) => {
    if (!node.children) return 0;
    let count = node.children.length;
    node.children.forEach((child) => {
      count += countDescendents(child);
    });
    return count;
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: "20px",
        boxShadow: 5,
      }}
    >
      <ListItem
        alignItems="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {config.showAvatars && (
          <ListItemAvatar>
            <Avatar alt={node.name} src={node.avatarUrl} />
          </ListItemAvatar>
        )}

        <Box sx={{ mt: 1 }}>
          <Typography
            component="div"
            variant="body2"
            sx={{ color: "text.primary", mb: 0.5 }}
          >
            {node.name}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{ color: "text.secondary", mt: 0.5 }}
          >
            {node.role}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{ color: "text.secondary", mt: 0.5 }}
          >
            {node.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b5bdd687",
            borderRadius: "15px",
            marginTop: "8px",
            border: "2px solid",
            borderColor: "#7a91d5ff",
          }}
        >
          <Icon
            path={mdiAccountArrowDownOutline}
            size={1}
            style={{ color: "#7a91d5ff", fontWeight: "lighter" }}
          />
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#7a91d5ff",
              fontWeight: "lighter",
              mt: 1,
              borderRadius: "10px",
              padding: "2px 8px",
              display: "inline-block",
            }}
          >
            {countDescendents(node)}
          </Typography>
        </Box>
      </ListItem>
    </List>
  );
};

export default CustomNode;
