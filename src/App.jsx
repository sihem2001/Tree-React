import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Theme from "./component/d3Tree/Theme";
import D3Tree from "./component/d3Tree/D3Tree";
import CustomizedButtons from "./component/d3Tree/CustomizedButtons";

import AddNode from "./component/d3Tree/AddNode";
import RemoveNode from "./component/d3Tree/RemoveNode";

import { treeData as initialTree } from "./component/treeData";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#7a91d5" } },
});

export default function App() {
  const [view, setView] = React.useState(null);

  const [treeData, setTreeData] = useState(initialTree[0] || initialTree);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (newNode) => {
    const newNodeWithChildren = { ...newNode, children: [] };

    const updatedTree = JSON.parse(JSON.stringify(treeData));

    const addChildRecursively = (node) => {
      const selectedId = selectedNode?.id;

      if (node.id === selectedId) {
        node.children = node.children || [];
        node.children.push(newNodeWithChildren);
        return true;
      }

      if (node.children && node.children.length > 0) {
        return node.children.some(addChildRecursively);
      }
      return false;
    };

    if (!selectedNode) {
      updatedTree.children = updatedTree.children || [];
      updatedTree.children.push(newNodeWithChildren);
    } else {
      const nodeAdded = addChildRecursively(updatedTree);
      if (!nodeAdded) {
        console.warn("Selected node not found in tree structure", {
          selectedId: selectedNode?.id,
          selectedNode,
        });

        updatedTree.children = updatedTree.children || [];
        updatedTree.children.push(newNodeWithChildren);
      }
    }

    // console.log("Updated tree:", JSON.stringify(updatedTree, null, 2));
    setTreeData(updatedTree);

    // Clear selection after adding
    setTimeout(() => setSelectedNode(null), 100);
  };

  // handle node selection properly
  const handleNodeClick = (node) => {
    console.log("Selected node:", node);
    setSelectedNode(node);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="100%" sx={{ py: 1 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h3" gutterBottom>
            Organization Tree
          </Typography>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "10px 0",
              gap: "20px",
            }}
          >
            <CustomizedButtons onSend={(data) => setView(data)} />
            <div style={{ display: "flex", gap: "10px" }}>
              <AddNode onAdd={addNode} />
              <RemoveNode />
            </div>
          </div>
        </Box>

        {selectedNode && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "lightgreen",
              borderRadius: 1,
              border: "1px solid green",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Selected Node: {selectedNode.name} (ID: {selectedNode.id})
            </Typography>
            <Typography variant="caption">
              New nodes will be added as children of this node
            </Typography>
          </Box>
        )}

        {!selectedNode && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "lightyellow",
              borderRadius: 1,
              border: "1px solid orange",
            }}
          >
            <Typography variant="body2">
              No node selected - new nodes will be added under the root
            </Typography>
          </Box>
        )}

        {view === null && (
          <D3Tree data={[treeData]} onNodeClick={handleNodeClick} />
        )}
        {view === "D3Tree" && (
          <D3Tree data={[treeData]} onNodeClick={handleNodeClick} />
        )}
        {view === "Theme" && <Theme />}

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Click on nodes to expand/select them
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
