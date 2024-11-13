import { useRef, useState, MouseEvent, ChangeEvent } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(10);

  function startDrawing(e: MouseEvent<HTMLCanvasElement>) {
    const { offsetX, offsetY } = e.nativeEvent;
    const contx = canvasRef.current?.getContext("2d");
    if (!contx) return;
    contx.strokeStyle = isEraser ? "rgb(39, 93, 92)" : color;
    contx.lineWidth = isEraser ? eraserSize : penSize;
    contx.beginPath();
    contx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }
  function draw(e: MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const contx = canvasRef.current?.getContext("2d");

    contx?.lineTo(offsetX, offsetY);
    contx?.stroke();
  }
  function stopDrawing() {
    const contx = canvasRef.current?.getContext("2d");
    contx?.closePath();
    setIsDrawing(false);
  }
  function handleColorChange(e: ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }
  function handleSizeChange(e: ChangeEvent<HTMLInputElement>) {
    isEraser
      ? setEraserSize(Number(e.target.value))
      : setPenSize(Number(e.target.value));
  }
  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const contx = canvas.getContext("2d");
    contx?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  }
  return (
    <div className="canvas">
      <div className="colors">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={clearCanvas}
        >
          clear
        </button>
        {!isEraser && (
          <input
            type="range"
            min="1"
            max="20"
            value={penSize}
            onChange={handleSizeChange}
          />
        )}
        {isEraser && (
          <input
            type="range"
            min="5"
            max="50"
            value={eraserSize}
            onChange={handleSizeChange}
          />
        )}
        <i
          className={`bi ${isEraser ? "bi-pencil-fill" : "bi-eraser-fill"}`}
          onClick={() => setIsEraser((prev) => !prev)}
        ></i>
        <span
          style={{ backgroundColor: "red" }}
          onClick={() => setColor("red")}
          className="color"
        ></span>
        <span
          style={{ backgroundColor: "blue" }}
          onClick={() => setColor("blue")}
          className="color"
        ></span>
        <span
          style={{ backgroundColor: "green" }}
          onClick={() => setColor("green")}
          className="color"
        ></span>
        <span
          style={{ backgroundColor: "yellow" }}
          onClick={() => setColor("yellow")}
          className="color"
        ></span>
        <span
          style={{ backgroundColor: "purple" }}
          onClick={() => setColor("purple")}
          className="color"
        ></span>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="color"
        />
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
}
