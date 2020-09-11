import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";

let cellSide = 10;

const Grid = ({
  grid,
  space = 4,
  freeHeight,
  freeWidth,
  onClickCell,
  style,
  setCellSide,
  onPutPattern,
}) => {
  const [, drop] = useDrop({
    accept: "Pattern",
    drop: (item, monitor) => {
      const { pattern, pickOffset } = item;

      const offset = monitor.getClientOffset();
      const { x, y } = canvasRef.current.getBoundingClientRect();
      const position = {
        x: offset.x - x + 0.67 * pickOffset.x * cellSide * pattern[0].length,
        y: offset.y - y + 0.67 * pickOffset.y * cellSide * pattern.length,
      };
      const { col, row } = getCoords(position.x, position.y);

      onPutPattern(row, col, pattern);
    },
  });

  const canvasRef = useRef(null);
  const cols = grid[0].length;
  const rows = grid.length;
  const [height, setHeight] = useState(freeHeight);
  const [width, setWidth] = useState(freeWidth);

  useEffect(() => {
    if (freeWidth / cols >= freeHeight / rows) {
      setHeight(freeHeight);
      setWidth((cols / rows) * freeHeight);
    } else {
      setWidth(freeWidth);
      setHeight((rows / cols) * freeWidth);
    }
  }, [freeHeight, freeWidth, cols, rows, space]);

  const draw = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, width, height);
      if (freeWidth / cols >= freeHeight / rows) {
        cellSide = (height - space * (rows - 1)) / rows;
      } else {
        cellSide = (width - space * (cols - 1)) / cols;
      }
      setCellSide(cellSide);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          ctx.fillStyle = grid[i][j] ? "#FC2323" : "#DADADA";
          roundRect(
            ctx,
            j * cellSide + j * space,
            i * cellSide + i * space,
            cellSide,
            cellSide,
            5,
            false,
            false
          );
          ctx.fill();
        }
      }
    },
    [grid, space, width, cols, rows, height, setCellSide, freeHeight, freeWidth]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "transparent";
    context.fillRect(0, 0, width, height);

    draw(context);
  }, [draw, height, width]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { col, row } = getCoords(x, y);
    onClickCell(col, row);
  };

  const getCoords = (x, y) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const { width, height } = rect;
    const row = ~~((x / width) * cols);
    const col = ~~((y / height) * rows);

    return { col, row };
  };

  return (
    <div ref={drop}>
      <canvas
        style={{ cursor: "pointer", ...style }}
        height={height}
        width={width}
        onClick={handleClick}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

// export default DropTarget(
//   "Pattern",
//   {
//     drop: () => ({ name: "Dustbin" }),
//   },
//   (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop(),
//   })
// )(Grid);

export default Grid;

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
