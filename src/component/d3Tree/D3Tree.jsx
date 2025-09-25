import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";
import { config } from "../treeData";

// Convert tree data to D3 format
const convertToD3Format = (nodes) => {
  return nodes.map((node) => ({
    id: node.id,
    name: node.name,
    attributes: {
      role: node.role,
      description: node.description,
      avatarUrl: node.avatarUrl,
    },
    children:
      node.children && node.children.length > 0
        ? convertToD3Format(node.children)
        : undefined,
  }));
};

const D3Tree = ({ data, onNodeClick }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const d3TreeData = convertToD3Format(data);

  React.useEffect(() => {
    // setKey((prev) => prev + 1);
    const updateDimensions = () => {
      const container = document.getElementById("tree-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(600, rect.height),
        });
        setTranslate({
          x: rect.width / 2,
          y: 100,
        });
      }
    };

    updateDimensions();
  }, []);

  // Custom node rendering
  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const nodeForCustomComponent = [
      {
        name: nodeDatum.name,
        role: nodeDatum.attributes?.role || "",
        description: nodeDatum.attributes?.description || "",
        avatarUrl: nodeDatum.attributes?.avatarUrl || "",
        children: nodeDatum.children || [],
      },
    ];

    // Fixed click handler
    const handleNodeClick = (e) => {
      e.stopPropagation();

      const nodeData = {
        id: nodeDatum.id,
        name: nodeDatum.name,
        role: nodeDatum.attributes?.role || "",
        description: nodeDatum.attributes?.description || "",
        avatarUrl: nodeDatum.attributes?.avatarUrl || "",
        children: nodeDatum.children || [],
      };

      if (onNodeClick) {
        onNodeClick(nodeData);
      }

      // Proper toggle logic: only toggle if node has children
      if (nodeDatum.children && nodeDatum.children.length > 0) {
        toggleNode();
      }
    };

    return (
      <g onClick={handleNodeClick}>
        <foreignObject
          width="300"
          height="200"
          x="-150"
          y="-100"
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              width: "300px",
              transform: "scale(0.9)",
              transformOrigin: "center",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            <CustomNode treeData={nodeForCustomComponent} config={config} />
          </div>
        </foreignObject>
      </g>
    );
  };

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("tree-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(600, rect.height),
        });
        setTranslate({
          x: rect.width / 2,
          y: 100,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      id="tree-container"
      style={{
        width: "90vw",
        height: "70vh",
        border: "2px solid #e0e0e0",
        borderRadius: "10px",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Tree
        data={d3TreeData}
        translate={translate}
        dimensions={dimensions}
        orientation="vertical"
        separation={{ siblings: 2, nonSiblings: 2.5 }}
        nodeSize={{ x: 150, y: 250 }}
        renderCustomNodeElement={renderCustomNode}
        shouldCollapseNeighborNodes={false}
        collapsible={true}
        initialDepth={10}
        zoom={0.7}
        scaleExtent={{ min: 0.3, max: 2 }}
        enableLegacyTransitions={true}
        transitionDuration={500}
        depthFactor={400}
        pathFunc="diagonal"
        styles={{
          links: {
            strokeWidth: 5,
            fill: "none",
            strokeOpacity: 1,
            strokeDasharray: "none",
          },
          nodes: {
            node: {
              circle: { fill: "transparent", stroke: "transparent" },
              name: { stroke: "none" },
            },
            leafNode: {
              circle: { fill: "transparent", stroke: "transparent" },
              name: { stroke: "none" },
            },
          },
        }}
      />
    </div>
  );
};

export default D3Tree;
