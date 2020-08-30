import React, { useState, useRef, useEffect, useCallback } from "react";

function Grid({ grid, space = 4, freeHeight, freeWidth, onClickCell, style }) {
  const canvasRef = useRef(null);
  const cols = grid[0].length;
  const rows = grid.length;
  const [height, setHeight] = useState(freeHeight);
  const [width, setWidth] = useState(freeWidth);

  useEffect(() => {
    if (freeWidth / cols >= freeHeight / rows) {
      setHeight(freeHeight);
      setWidth((cols / rows) * freeHeight - space);
    } else {
      setWidth(freeWidth);
      setHeight((rows / cols) * freeWidth - space);
    }
  }, [freeHeight, freeWidth]);

  const draw = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, width, height);

      const cellSide = (width - space * (cols - 1)) / cols;
      console.log(`cellSide ${cellSide}`)

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
    [grid, space, width]
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

    const { width, height } = rect;
    const row = ~~((x / width) * cols);
    const col = ~~((y / height) * rows);
    onClickCell(col, row);
  };

  return (
    <canvas
      style={{cursor: 'pointer', ...style}}
      height={height}
      width={width}
      onClick={handleClick}
      ref={canvasRef}
    ></canvas>
  );
}

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

export default Grid;
