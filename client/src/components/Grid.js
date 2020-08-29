import React, { useRef, useEffect, useCallback } from "react";

function Grid({ grid, space = 6, height = 600, width = 600, onClickCell }) {
  const cols = grid[0].length;
  const rows = grid.length;
  const canvasRef = useRef(null);

  const draw = useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, width, height);

      // const cols = grid[0].length;
      // const rows = grid.length;
      const celSide = (width - space * (cols - 1)) / cols;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          ctx.fillStyle = grid[i][j] ? "#FC2323" : "#DADADA";
          roundRect(
            ctx,
            j * celSide + j * space,
            i * celSide + i * space,
            celSide,
            celSide,
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
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
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
      onClick={handleClick}
      width={width}
      height={height}
      styled={{ height: height, width: width }}
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
