import React, { useState } from "react";
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";
import { config } from "../treeData";

const convertToD3Format = (nodes) => {
  return nodes.map((node) => ({
    name: node.name,
    attributes: {
      id: node.id,
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

  // Convert tree data to D3 format
  const d3TreeData = data ? convertToD3Format(data)[0] : null;

  // Custom node rendering function
  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
    const nodeForCustomComponent = [
      {
        name: nodeDatum.name,
        role: nodeDatum.attributes?.role || "",
        description: nodeDatum.attributes?.description || "",
        avatarUrl: nodeDatum.attributes?.avatarUrl || "",
        children: nodeDatum.children || [],
      },
    ];

    return (
      <g>
        <foreignObject
          width="300"
          height="200"
          x="-300"
          y="-200"
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              transform: "scale(0.9)",
              transformOrigin: "center",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Notify parent of node selection
              if (onNodeClick) {
                onNodeClick({
                  id: nodeDatum.attributes?.id,
                  name: nodeDatum.name,
                  role: nodeDatum.attributes?.role,
                  description: nodeDatum.attributes?.description,
                  avatarUrl: nodeDatum.attributes?.avatarUrl,
                });
              }
              if (hasChildren) toggleNode();
            }}
          >
            <CustomNode treeData={nodeForCustomComponent} config={config} />
          </div>
        </foreignObject>
      </g>
    );
  };

  React.useEffect(() => {
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

  if (!d3TreeData) return null;

  return (
    <>
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
          nodeSize={{ x: 340, y: 250 }}
          renderCustomNodeElement={renderCustomNode}
          shouldCollapseNeighborNodes={false}
          collapsible={true}
          initialDepth={10}
          zoom={0.5}
          scaleExtent={{ min: 0.3, max: 1 }}
          enableLegacyTransitions={true}
          transitionDuration={700}
          depthFactor={650}
          pathFunc="step"
          styles={{
            links: {
              stroke: "#5b77ccff",
              strokeWidth: 2,
              fill: "none",
            },
            nodes: {
              node: {
                circle: {
                  fill: "transparent",
                  stroke: "transparent",
                },
              },
              leafNode: {
                circle: {
                  fill: "transparent",
                  stroke: "transparent",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default D3Tree;
