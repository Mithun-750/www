import { useEffect, useRef } from "react";

const MatrixLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const w = (canvas.width = 200); // Width of the loading indicator
    const h = (canvas.height = 60); // Height of the loading indicator

    // Calculate rows and initialize xpos array
    const rows = Math.floor(h / 20) + 1;
    const xpos = Array(rows).fill(0);

    // Set initial background
    ctx.fillStyle = "rgb(80, 60, 60)"; // Using your theme color
    ctx.fillRect(0, 0, w, h);

    const matrix = () => {
      // Create fade effect
      ctx.fillStyle = "rgba(80, 60, 60, 0.1)"; // Using your theme color with opacity
      ctx.fillRect(0, 0, w, h);

      // Set text style
      ctx.fillStyle = "rgb(168, 124, 124)"; // Using your theme color
      ctx.font = "15pt monospace";

      // Update and draw characters
      xpos.forEach((x, ind) => {
        // Use a mix of special characters
        const chars = "⌘⚡∆▓∑⚛⚔░∏⚙█▒√∂⚖■∇⚘□∈∉∋⠋";
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = ind * 20;

        ctx.fillText(text, x, y + 15);

        // Reset position when reaching end
        if (x > w + Math.random() * 1000) {
          xpos[ind] = 0;
        } else {
          xpos[ind] = x + 20; // Move right
        }
      });
    };

    // Run animation
    const interval = setInterval(matrix, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block bg-secondary/95 p-4 rounded-2xl border border-primary/20 shadow-lg">
      <canvas
        ref={canvasRef}
        className="rounded"
        style={{ width: "200px", height: "60px" }}
      />
    </div>
  );
};

export default MatrixLoader;
