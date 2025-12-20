"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  BackgroundVariant, // Import the enum/type
} from "reactflow";

// Ensure styles are imported (ignore TS error if it persists in your IDE)
// @ts-ignore
import "reactflow/dist/style.css";

type MindMapData = {
  label: string;
  children?: MindMapData[];
};

const DEFAULT_JSON = JSON.stringify(
  {
    label: "Root",
    children: [
      { label: "Idea 1", children: [{ label: "Detail A" }] },
      { label: "Idea 2" },
    ],
  },
  null,
  2
);

export default function MindMapPlayground() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);

  const generateFromJSON = () => {
    try {
      const parsedData: MindMapData = JSON.parse(jsonInput);
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      let idCounter = 0;

      const traverse = (
        data: MindMapData,
        level: number,
        index: number,
        parentId: string | null = null
      ) => {
        const id = `node-${idCounter++}`;

        const newNode: Node = {
          id,
          data: { label: data.label },
          position: { x: level * 250, y: index * 80 },
          style: {
            background: level === 0 ? "#3b82f6" : "#fff",
            color: level === 0 ? "#fff" : "#000",
            borderRadius: "8px",
            padding: "10px",
            width: 150,
          },
        };

        newNodes.push(newNode);

        if (parentId) {
          newEdges.push({
            id: `e${parentId}-${id}`,
            source: parentId,
            target: id,
            animated: true,
          });
        }

        data.children?.forEach((child) => {
          traverse(child, level + 1, newNodes.length, id);
        });
      };

      traverse(parsedData, 0, 0);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      alert("Invalid JSON format. Please check your syntax.");
    }
  };

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white p-4 flex flex-col gap-4 overflow-y-auto">
        <h2 className="font-bold text-xl tracking-tight">MindMap Generator</h2>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 uppercase">
            JSON Input
          </label>
          <textarea
            className="w-full h-64 p-2 text-xs font-mono border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        <button
          onClick={generateFromJSON}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-sm"
        >
          Build Mind Map
        </button>

        {selectedNode && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <label className="text-[10px] font-bold text-blue-800 uppercase block mb-1">
              Edit Node Label
            </label>
            <input
              className="w-full p-2 text-sm border rounded focus:outline-blue-400 bg-white"
              placeholder="Enter new text..."
              onChange={(e) => {
                const val = e.target.value;
                setNodes((nds) =>
                  nds.map((n) =>
                    n.id === selectedNode
                      ? { ...n, data: { ...n.data, label: val } }
                      : n
                  )
                );
              }}
            />
          </div>
        )}
      </div>

      {/* Main Flow Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          fitView
        >
          {/* Fixed "dots" assignment using BackgroundVariant enum */}
          <Background color="#ccc" variant={BackgroundVariant.Dots} gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
