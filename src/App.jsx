import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Theme from "./component/d3Tree/Theme";
import D3Tree from "./component/d3Tree/D3Tree";
import CustomizedButtons from "./component/d3Tree/CustomizedButtons";

import AddNode from "./component/d3Tree/AddNode";
import RemoveNode from "./component/d3Tree/RemoveNode";

import { treeData as initialTree } from "./component/treeData";

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

    setTreeData(updatedTree);

    // Clear selection after adding
    setTimeout(() => setSelectedNode(null), 100);
  };

  const removeNode = (nodeId) => {
    const updatedTree = JSON.parse(JSON.stringify(treeData));

    // Check if trying to delete root node
    if (updatedTree.id === nodeId) {
      alert("Cannot delete the root node!");
      return;
    }

    const removeNodeRecursively = (node) => {
      if (!node.children || node.children.length === 0) {
        return false;
      }

      // Find the node in children
      const childIndex = node.children.findIndex(
        (child) => child.id === nodeId
      );

      if (childIndex !== -1) {
        // Remove the node
        node.children.splice(childIndex, 1);
        return true;
      }

      // Search in nested children
      for (let child of node.children) {
        if (removeNodeRecursively(child)) {
          return true;
        }
      }

      return false;
    };

    const nodeRemoved = removeNodeRecursively(updatedTree);

    if (nodeRemoved) {
      setTreeData(updatedTree);
      setSelectedNode(null);
    } else {
      alert("Node not found or cannot be deleted!");
    }
  };

  // Handle node selection properly
  const handleNodeClick = (node) => {
    console.log("Selected node:", node);
    setSelectedNode(node);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", paddingLeft: "40px" }}>
      {" "}
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
              <RemoveNode selectedNode={selectedNode} onRemove={removeNode} />
            </div>
          </div>
        </Box>

        {selectedNode && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "#e3f2fd",
              borderRadius: 1,
              border: "2px solid #2196f3",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Selected Node: {selectedNode.name} (ID: {selectedNode.id})
            </Typography>
            <Typography variant="caption" sx={{ color: "#555" }}>
              • New nodes will be added as children of this node
              <br />• Click "Remove Node" to delete this node and all its
              children
            </Typography>
          </Box>
        )}

        {!selectedNode && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "#fff3e0",
              borderRadius: 1,
              border: "2px solid #ff9800",
            }}
          >
            <Typography variant="body2" sx={{ color: "#e65100" }}>
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
            💡 Click on nodes to select them • Selected nodes can be deleted or
            used as parents for new nodes
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
