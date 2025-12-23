"use client";

import { useCallback, useState, useEffect } from "react";
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
  BackgroundVariant,
  Panel,
  Handle,
  Position,
} from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Network,
  Code2,
  Zap,
  MousePointer2,
  Edit3,
  Maximize2,
  Trash2,
} from "lucide-react";
import "reactflow/dist/style.css";
import Navbar from "@/app/components/Navbar";

// --- Types ---
type MindMapData = {
  label: string;
  children?: MindMapData[];
};

// --- Custom Node Component ---
const CustomNode = ({ data, selected }: any) => (
  <div
    className={`px-5 py-3 rounded-2xl border-2 transition-all duration-300 shadow-xl ${
      selected
        ? "bg-indigo-600 border-indigo-400 text-white scale-110"
        : "bg-white border-slate-100 text-slate-800 hover:border-indigo-200"
    }`}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="!bg-indigo-400 !w-2 !h-2"
    />
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          selected ? "bg-indigo-200" : "bg-indigo-500"
        }`}
      />
      <span className="text-sm font-bold tracking-tight">{data.label}</span>
    </div>
    <Handle
      type="source"
      position={Position.Right}
      className="!bg-indigo-400 !w-2 !h-2"
    />
  </div>
);

const nodeTypes = { custom: CustomNode };

const DEFAULT_JSON = JSON.stringify(
  {
    label: "Product Launch",
    children: [
      {
        label: "Marketing",
        children: [{ label: "Social Media" }, { label: "Email Campaign" }],
      },
      {
        label: "Development",
        children: [{ label: "Beta Test" }, { label: "Final Release" }],
      },
      { label: "Design" },
    ],
  },
  null,
  2
);

export default function MindMapPlayground() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);

  const generateFromJSON = useCallback(() => {
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

        // Simple Vertical Centering Logic
        const yOffset = index * 90;
        const xOffset = level * 280;

        const newNode: Node = {
          id,
          type: "custom",
          data: { label: data.label },
          position: { x: xOffset, y: yOffset },
        };

        newNodes.push(newNode);

        if (parentId) {
          newEdges.push({
            id: `e${parentId}-${id}`,
            source: parentId,
            target: id,
            animated: true,
            style: { stroke: "#6366f1", strokeWidth: 2 },
          });
        }

        data.children?.forEach((child, i) => {
          traverse(child, level + 1, newNodes.length, id);
        });
      };

      traverse(parsedData, 0, 0);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error("JSON Error");
    }
  }, [jsonInput, setNodes, setEdges]);

  // Initial generation
  useEffect(() => {
    generateFromJSON();
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#6366f1", strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const updateNodeLabel = (newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* --- LEFT SIDEBAR --- */}
        <aside className="w-[380px] bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
          <div className="p-6 space-y-6">
            <header className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Network className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tighter">
                  Brainstorm
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  MindMap Studio v2
                </p>
              </div>
            </header>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3 h-3" /> JSON Schema
                </span>
              </div>
              <textarea
                className="w-full h-80 p-5 text-xs font-mono border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none leading-relaxed text-slate-600 shadow-inner"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>

            <button
              onClick={generateFromJSON}
              className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 group"
            >
              <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white" />
              Synchronize Map
            </button>

            <AnimatePresence>
              {selectedNodeId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-indigo-600 uppercase">
                      Active Node Properties
                    </label>
                    <button onClick={() => setSelectedNodeId(null)}>
                      <Trash2 className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                  <div className="relative">
                    <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 text-sm font-bold border-2 border-white rounded-xl focus:outline-none focus:border-indigo-400 bg-white text-slate-800"
                      value={
                        nodes.find((n) => n.id === selectedNodeId)?.data
                          .label || ""
                      }
                      onChange={(e) => updateNodeLabel(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto p-6 border-t border-slate-50">
            <div className="flex items-center gap-2 text-slate-400">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-[11px] font-medium leading-tight">
                Click nodes to edit labels directly. Drag to reorganize.
              </span>
            </div>
          </div>
        </aside>

        {/* --- MAIN CANVAS --- */}
        <main className="flex-1 relative bg-[#F8FAFC]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            onPaneClick={() => setSelectedNodeId(null)}
            nodeTypes={nodeTypes}
            fitView
            className="selection-none"
          >
            <Background
              color="#cbd5e1"
              variant={BackgroundVariant.Lines}
              gap={40}
              size={1}
            />
            <Controls className="!bg-white !border-none !shadow-2xl !rounded-xl overflow-hidden" />
            <MiniMap
              nodeColor={() => "#6366f1"}
              maskColor="rgba(248, 250, 252, 0.8)"
              className="!bg-white !border-slate-200 !rounded-2xl !shadow-lg"
            />

            <Panel
              position="top-right"
              className="bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-white shadow-xl flex gap-2"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl text-indigo-700">
                <Maximize2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Auto-Layout Active
                </span>
              </div>
            </Panel>
          </ReactFlow>
        </main>
      </div>
    </div>
  );
}
