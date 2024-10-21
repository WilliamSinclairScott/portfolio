import { useEffect, useRef } from "react";
import "./War.css";

interface Pixel {
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
  size: number;
}

class PixelBattle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixels: Pixel[] = [];
  initialPixelSize = 2;
  minPopulationRate = 35;
  maxPopulationRate = 50;
  colors = ["#8a9eff", "#9eff8a", "#ffd48a", "#a000a0"];
  timers = [0, 0, 0, 0];
  colorCount = [0, 0, 0, 0];
  center: { x: number; y: number };
  forceStrength = 0.02;
  seekStrength = 0.5;
  maxSize = 20;
  gameOver = false;
  globalAlpha = 0.05;
  centerRadius = 600;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.center = { x: canvas.width / 2, y: canvas.height / 4 };
  }

  addPixels() {
    if (this.gameOver) return;

    this.colors.forEach((color, index) => {
      if (this.timers[index] % 100 === 0) {
        const populationRate = PixelBattle.getRandomInt(
          this.minPopulationRate,
          this.maxPopulationRate
        );
        for (let i = 0; i < populationRate; i++) {
          const dx = Math.random() * 2 - 1;
          const dy = Math.random() * 2 - 1;
          const { x, y } = this.getRandomEdgePosition();
          this.pixels.push(
            this.createPixel(x, y, color, dx, dy, this.initialPixelSize)
          );
          this.colorCount[index]++;
        }
        if (this.minPopulationRate > 0) this.minPopulationRate--;
        if (this.maxPopulationRate > 0) this.maxPopulationRate--;
      }
      this.timers[index]++;
    });
  }

  createPixel(
    x: number,
    y: number,
    color: string,
    dx: number,
    dy: number,
    size: number
  ): Pixel {
    return { x, y, color, dx, dy, size };
  }

  getRandomEdgePosition() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0:
        x = Math.random() * this.canvas.width;
        y = 0;
        break;
      case 1:
        x = Math.random() * this.canvas.width;
        y = this.canvas.height - this.initialPixelSize;
        break;
      case 2:
        x = 0;
        y = Math.random() * this.canvas.height;
        break;
      case 3:
        x = this.canvas.width - this.initialPixelSize;
        y = Math.random() * this.canvas.height;
        break;
      default:
        x = 0;
        y = 0;
        break;
    }

    return { x, y };
  }

  drawPixels() {
    if (!this.ctx) return;
    if (this.gameOver) return;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.pixels.forEach((pixel, pixelIndex) => {
      this.applyCenterForce(pixel);
      if (pixel.size > this.maxSize - 5) {
        this.seekNearestPixel(pixel, pixelIndex);
      }

      this.ctx!.fillStyle = pixel.color;
      this.ctx!.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);

      pixel.x += pixel.dx;
      pixel.y += pixel.dy;

      if (
        pixel.x <= 0 ||
        pixel.x >= this.canvas.width - pixel.size ||
        pixel.y <= 0 ||
        pixel.y >= this.canvas.height - pixel.size
      ) {
        if (pixel.size < this.maxSize && this.maxPopulationRate === 0) {
          pixel.size += 1;
        }
        this.moveToCenter(pixel);
      }

      for (
        let otherIndex = pixelIndex + 1;
        otherIndex < this.pixels.length;
        otherIndex++
      ) {
        const otherPixel = this.pixels[otherIndex];

        // Skip collision check if either pixel is too small (25% or less of max size)
        if (
          pixel.size <= this.maxSize * 0.25 ||
          otherPixel.size <= this.maxSize * 0.25
        ) {
          continue;
        }

        if (
          pixel.color !== otherPixel.color &&
          this.checkCollision(pixel, otherPixel)
        ) {
          if (pixel.size >= otherPixel.size) {
            this.createExplosion(otherPixel.size, otherPixel.x, otherPixel.y);
            this.pixels.splice(otherIndex, 1);
            this.colorCount[this.colors.indexOf(otherPixel.color)]--;

            // Pixel loses size based on half of the smaller pixel size (rounded up)
            const sizeLoss = Math.ceil(otherPixel.size / 2);
            pixel.size = Math.max(pixel.size - sizeLoss, 1); // Ensure pixel doesn't become smaller than 1
          } else {
            this.createExplosion(pixel.size, pixel.x, pixel.y);
            this.pixels.splice(pixelIndex, 1);
            this.colorCount[this.colors.indexOf(pixel.color)]--;

            // Other pixel loses size based on half of the smaller pixel size (rounded up)
            const sizeLoss = Math.ceil(pixel.size / 2);
            otherPixel.size = Math.max(otherPixel.size - sizeLoss, 1); // Ensure pixel doesn't become smaller than 1
          }
          break;
        }
      }
    });

    this.addPixels();
    this.drawScoreboard();
    requestAnimationFrame(() => this.drawPixels());
  }

  applyCenterForce(pixel: Pixel) {
    // Randomize a point within the center radius
    const angle = Math.random() * 2 * Math.PI; // Random angle
    const distanceFromCenter = Math.random() * this.centerRadius; // Random distance within the radius

    const targetX = this.center.x + distanceFromCenter * Math.cos(angle);
    const targetY = this.center.y + distanceFromCenter * Math.sin(angle);

    const dirX = targetX - pixel.x;
    const dirY = targetY - pixel.y;
    const distance = Math.sqrt(dirX * dirX + dirY * dirY);
    const normDirX = dirX / distance;
    const normDirY = dirY / distance;

    // Apply the force towards the randomly selected point in the center radius
    pixel.dx += normDirX * this.forceStrength;
    pixel.dy += normDirY * this.forceStrength;
  }

  moveToCenter(pixel: Pixel) {
    // Randomize a point within the center radius
    const angle = Math.random() * 2 * Math.PI; // Random angle
    const distanceFromCenter = Math.random() * this.centerRadius; // Random distance within the radius

    const targetX = this.center.x + distanceFromCenter * Math.cos(angle);
    const targetY = this.center.y + distanceFromCenter * Math.sin(angle);

    const dirX = targetX - pixel.x;
    const dirY = targetY - pixel.y;
    const distance = Math.sqrt(dirX * dirX + dirY * dirY);
    const normDirX = dirX / distance;
    const normDirY = dirY / distance;

    // Apply the force towards the randomly selected point in the center radius
    pixel.dx = normDirX * 2;
    pixel.dy = normDirY * 2;
  }

  seekNearestPixel(pixel: Pixel, pixelIndex: number) {
    let nearestPixel: Pixel | null = null;
    let nearestDistance = Infinity;

    if (this.maxPopulationRate > 0) {
      this.pixels
        .filter((pixel) => pixel.size >= this.maxSize * 0.8)
        .forEach((otherPixel, otherIndex) => {
          if (otherIndex !== pixelIndex && otherPixel.color !== pixel.color) {
            const distance = this.getDistance(pixel, otherPixel);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestPixel = otherPixel;
            }
          }
        });
    } else {
      if (this.seekStrength < 1) this.seekStrength += 0.1;
      this.pixels
        .filter((pixel) => pixel.size >= this.maxSize * 0.5)
        .forEach((otherPixel, otherIndex) => {
          if (otherIndex !== pixelIndex && otherPixel.color !== pixel.color) {
            const distance = this.getDistance(pixel, otherPixel);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestPixel = otherPixel;
            }
          }
        });
    }

    if (nearestPixel) {
      const dirX = nearestPixel.x - pixel.x;
      const dirY = nearestPixel.y - pixel.y;
      const distance = Math.sqrt(dirX * dirX + dirY * dirY);

      pixel.dx += (dirX / distance) * this.seekStrength;
      pixel.dy += (dirY / distance) * this.seekStrength;
    }
  }

  getDistance(p1: Pixel, p2: Pixel) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  checkCollision(p1: Pixel, p2: Pixel) {
    return (
      p1.x < p2.x + p2.size &&
      p1.x + p1.size > p2.x &&
      p1.y < p2.y + p2.size &&
      p1.y + p1.size > p2.y
    );
  }

  createExplosion(size: number, x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.fillStyle = "rgba(255, 150, 0, 0.8)";
    this.ctx.beginPath();
    this.ctx.arc(x + size / 2, y + size / 2, size * 1.5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  getColorSizes() {
    return this.colors.map((color, index) => {
      const totalSize = this.pixels
        .filter((pixel) => pixel.color === color)
        .reduce((sum, pixel) => sum + pixel.size, 0);
      return { color, totalSize };
    });
  }

  drawScoreboard() {
    if (!this.ctx) return;

    const colorSizes = this.getColorSizes();
    const scoreboardX = this.canvas.width - 150;
    const scoreboardY = this.canvas.height - 100;
    const lineHeight = 20;

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(
      scoreboardX - 10,
      scoreboardY - 30,
      140,
      colorSizes.length * lineHeight + 20
    );

    this.ctx.fillStyle = "white";
    this.ctx.font = "14px Arial";

    colorSizes.forEach((colorSize, index) => {
      if (colorSize && colorSize.totalSize > 0) {
        this.ctx.fillStyle = colorSize.color;
        this.ctx.fillText(
          `${colorSize.color}: ${colorSize.totalSize}`,
          scoreboardX,
          scoreboardY + index * lineHeight
        );
      }
    });
  }
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Main component using the PixelBattle class
export default function PixelBattleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const pixelBattle = new PixelBattle(canvas);

      const resizeCanvas = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          pixelBattle.center.x = canvas.width / 2;
          pixelBattle.center.y = canvas.height / 2;
        }
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      pixelBattle.drawPixels();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, []);

  return <canvas id="pixel-canvas" ref={canvasRef}></canvas>;
}
