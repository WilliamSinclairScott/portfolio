import React, { useEffect } from "react";
import { SkillTree as SkillTreeData } from "@interfaces/skilltree";
import SkillTreeCanvas from "./skilltree-class";

export default function SkillTree() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch("/data/poe2Skilltree/tree.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((jsonData: SkillTreeData) => {
        console.log("Skill tree loaded:", jsonData);

        if (canvasRef.current) {
          const skillTree = new SkillTreeCanvas(canvasRef.current, jsonData);

          // Resize canvas and draw tree initially
          skillTree.resizeCanvas();
          skillTree.drawSkillTree();

          // Handle resizing
          const handleResize = () => {
            skillTree.resizeCanvas();
            skillTree.drawSkillTree();
          };

          window.addEventListener("resize", handleResize);

          // Cleanup function to remove event listener
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }
      })
      .catch((err) => console.error("Error loading skill tree:", err));
  }, []);

  return <canvas id="skill-tree-canvas" ref={canvasRef} />;
}
