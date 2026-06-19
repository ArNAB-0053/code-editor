"use client";

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { v4 as uuid } from "uuid";
import { AButton, AInput } from "../ui/antd";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";

type Point = [number, number];

type Line = {
  id: string;
  color: string;
  size: number;
  path: string;
};

const COLORS = [
  "#A975FF",
  "#FB5151",
  "#FD9170",
  "#FFCB6B",
  "#68CEF8",
  "#80CBC4",
  "#9DEF8F",
] as const;

const randomItem = <T,>(list: readonly T[]): T =>
  list[Math.floor(Math.random() * list.length)];

const PaperView = ({ node, updateAttributes }: NodeViewProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<d3.Selection<
    SVGPathElement,
    unknown,
    null,
    undefined
  > | null>(null);

  const drawingRef = useRef<boolean>(false);
  const pointsRef = useRef<Point[]>([]);
  const idRef = useRef<string>(uuid());

  const [color, setColor] = useState<string>(randomItem(COLORS));
  const [size, setSize] = useState<number>(Math.ceil(Math.random() * 10));

  const clearCanvas = () => {
    drawingRef.current = false;
    pointsRef.current = [];

    if (svgRef.current) {
      d3.select(svgRef.current).selectAll("path").remove();
    }
    idRef.current = uuid();
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const onMove = (event: MouseEvent) => {
      if (!drawingRef.current) return;
      event.preventDefault();

      const point = d3.pointer(event, svgRef.current);
      pointsRef.current.push(point);

      const path = d3.line<Point>().curve(d3.curveBasis)(pointsRef.current);

      if (pathRef.current && path) {
        pathRef.current.attr("d", path);
      }
    };

    const onStart = () => {
      drawingRef.current = true;
      pointsRef.current = [];

      pathRef.current = svg
        .append("path")
        .attr("id", `id-${idRef.current}`)
        .attr("stroke", color)
        .attr("stroke-width", size)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

      svg.on("mousemove", onMove);
    };

    const onEnd = () => {
      svg.on("mousemove", null);

      if (!drawingRef.current) return;
      drawingRef.current = false;

      if (!pointsRef.current.length) return;

      const path = d3.line<Point>().curve(d3.curveBasis)(pointsRef.current);

      if (!path) return;

      const lines: Line[] = (node.attrs.lines as Line[]).filter(
        (item) => item.id !== idRef.current,
      );

      updateAttributes({
        lines: [
          ...lines,
          {
            id: idRef.current,
            color,
            size,
            path,
          },
        ],
      });

      idRef.current = uuid();
    };

    svg.on("mousedown", onStart).on("mouseup", onEnd).on("mouseleave", onEnd);

    return () => {
      svg.on("mousedown", null);
      svg.on("mouseup", null);
      svg.on("mouseleave", null);
      svg.on("mousemove", null);
    };
  }, [color, size, node.attrs.lines, updateAttributes]);

  return (
    <NodeViewWrapper className="draw" contentEditable={false}>
      <div className="control-group">
        <div className="button-group flex items-center gap-x-6 mb-3 ">
          <div className="flex items-center gap-x-3 ">
            <AInput
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-[90px]!"
            />

            <AInput
              type="number"
              min={1}
              max={10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-[100px]!"
            />
          </div>

          <button
            className="px-5 py-1 rounded-md"
            onClick={clearCanvas}
            style={{
              backgroundColor: theme.border20,
            }}
          >
            Clear
          </button>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 500 250"
          width="100%"
          style={{
            backgroundColor: theme.border10,
          }}
        >
          {(node.attrs.lines as Line[]).map((item) => (
            <path
              key={item.id}
              d={item.path}
              stroke={item.color}
              strokeWidth={item.size}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    </NodeViewWrapper>
  );
};

export default PaperView;
