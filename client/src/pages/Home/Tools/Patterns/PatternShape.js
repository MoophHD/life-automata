import React, { useRef, useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import styled from "styled-components";
import { useEffect } from "react";

const GLOBAL_SPACE = 4;
const PatternShape = ({ globalCellSide, pattern, name }) => {
  const patternRef = useRef(null);
  const [cellSide, setCellSide] = useState(1);
  const [space, setSpace] = useState(1);
  const [previewSrc, setPreviewSrc] = useState("");
  const [rect, setRect] = useState({ height: 0, width: 0 });
  const cols = pattern[0].length;
  const rows = pattern.length;
  const [, drag, preview] = useDrag({
    item: { type: "Pattern", ref: patternRef },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: (monitor) => {
      const monitorOffset = monitor.getInitialClientOffset();
      const {
        x,
        y,
        height,
        width,
      } = patternRef.current.parentNode.getBoundingClientRect();

      const pickOffset = {
        x: (x - monitorOffset.x) / width,
        y: (y - monitorOffset.y) / height,
      };

      return { type: "Pattern", ref: patternRef, pickOffset, pattern };
    },
  });

  // set cell side
  useEffect(() => {
    const rect = patternRef.current.getBoundingClientRect();
    const { width, height } = rect;
    setRect(rect);
    const spaceCoef = GLOBAL_SPACE / globalCellSide;
    if (spaceCoef === Infinity) return;

    let cellSide;
    if (width / cols >= height / rows) {
      cellSide = width / (cols + spaceCoef * (cols - 1));
    } else {
      cellSide = height / (rows + spaceCoef * (rows - 1));
    }

    setSpace(cellSide * spaceCoef);
    setCellSide(cellSide);
  }, [patternRef, cols, rows, globalCellSide]);

  // handle draggable preview
  useEffect(() => {
    const clone = patternRef.current.cloneNode(true);
    if (clone.getAttribute("height") === 0) {
      return;
    }

    let scaleCoef = globalCellSide / cellSide;

    if (scaleCoef > 0 && scaleCoef !== Infinity) {
      clone.setAttribute("height", rect.height * scaleCoef);
      clone.setAttribute("width", rect.width * scaleCoef);
    } else {
      return;
    }
    const nodes = clone.childNodes;

    if (parseFloat(nodes[0].getAttribute("width")) > parseFloat(clone.getAttribute("width"))) {
      return;
    }

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].style.fill !== "none") nodes[i].style.fill = "#FC2323";

      nodes[i].setAttribute("rx", 1);
      nodes[i].setAttribute("ry", 1);
    }

    const string = new XMLSerializer().serializeToString(clone);
    // converts dom to base64
    var encoded = window.btoa(string);
    setPreviewSrc("data:image/svg+xml;base64," + encoded);
  }, [patternRef, rect, globalCellSide, cellSide]);

  return (
    <>
      <CustomPreview
        anchorX={0}
        anchorY={0}
        connect={preview}
        src={previewSrc}
        name={name}
      />

      <ShapeContainer ref={drag}>
        <svg
          viewBox={`0 0 ${rect.width} ${rect.height} `}
          style={{
            height: Math.min(rows / cols, 1) * 4.5 + "rem",
            width: Math.min(cols / rows, 1) * 4.5 + "rem",
          }}
          height={rect.height}
          width={rect.width}
          ref={patternRef}
          cols={cols}
          rows={rows}
        >
          {pattern.map((row, i) =>
            row.map((num, j) => (
              <rect
                x={j * (cellSide + space)}
                y={i * (cellSide + space)}
                height={cellSide}
                width={cellSide}
                rx={4}
                ry={4}
                key={`${i}col ${j} row pattern cel`}
                style={{ fill: !!num ? "#DADADA" : "none" }}
              />
            ))
          )}
        </svg>
        <Name>{name}</Name>
      </ShapeContainer>
    </>
  );
};

const CustomPreview = React.memo(
  (props) => <DragPreviewImage {...props} />,
  (prevProps, nextProps) => {

    if (prevProps.src.length === 0 && nextProps.src.length > 0) {
      return false;
    }

    return true;
  }
);

export default PatternShape;

const ShapeContainer = styled.div`
  //wtf?, fixed untranparent background
  transform: translate(0, 0);
  width: 7.75rem;
  cursor: pointer;
  background-color: white;
  padding: 2rem 1.65rem 1rem;
  box-shadow: 0px 4px 0px #aeaeae;
  border-radius: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  height: 10rem;
`;

const Name = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  white-space: nowrap;
`;
