import {
  SkillTree as SkillTreeInterface,
  Group as GroupInterface,
  Node as NodeInterface,
} from "@interfaces/skilltree";

export default class SkillTreeCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private skillTree: SkillTreeInterface;
  private viewWindow: {
    x: number;
    y: number;
    width: number;
    height: number;
    dialiationCoefficient: number;
    nodeRadius: number;
    connectionLineWidth: number;
    groupCenterRadius: number;
  };

  constructor(canvas: HTMLCanvasElement, skillTree: SkillTreeInterface) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.skillTree = skillTree;

    const width = (skillTree.max_x - skillTree.min_x) * 0.1;
    const height = (skillTree.max_y - skillTree.min_y) * 0.1;
    const centerX = (skillTree.min_x + skillTree.max_x) / 2;
    const centerY = (skillTree.min_y + skillTree.max_y) / 2;

    this.viewWindow = {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width: width,
      height: height,
      dialiationCoefficient: 1.5,
    };

    this.canvas.width = this.viewWindow.width;
    this.canvas.height = this.viewWindow.height;

    // this.canvas.addEventListener("mousemove", this.handleCanvasHover.bind(this));
    this.enableDrag();
    this.enableScrollWheelZoom();
  }

  resizeCanvas() {
    // Set canvas dimensions based on parent container
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;

      // Adjust view window to maintain aspect ratio
      const aspectRatio = this.viewWindow.width / this.viewWindow.height;
      if (parent.clientWidth / parent.clientHeight > aspectRatio) {
        this.viewWindow.width =
          this.viewWindow.height * (parent.clientWidth / parent.clientHeight);
      } else {
        this.viewWindow.height =
          this.viewWindow.width / (parent.clientWidth / parent.clientHeight);
      }
    }
  }

  drawSkillTree() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const scaleX = this.canvas.width / this.viewWindow.width;
    const scaleY = this.canvas.height / this.viewWindow.height;

    Object.values(this.skillTree.groups).forEach((group) => {
      group.nodes.forEach((nodeId) => {
        const node = this.skillTree.nodes[nodeId];
        if (!node) return;

        const { nodeX, nodeY } = this.calculateNodePosition(
          group,
          node,
          scaleX,
          scaleY
        );

        node.out.forEach((connectedNodeId) => {
          const connectedNode = this.skillTree.nodes[connectedNodeId];
          if (!connectedNode) return;

          const connectedGroup = this.skillTree.groups[connectedNode.group];
          if (!connectedGroup) return;

          const { nodeX: connectedNodeX, nodeY: connectedNodeY } =
            this.calculateNodePosition(
              connectedGroup,
              connectedNode,
              scaleX,
              scaleY
            );

          if (
            !node.ascendancyName &&
            !connectedNode.ascendancyName &&
            !node.isMastery &&
            !connectedNode.isMastery
          ) {
            this.drawConnection(nodeX, nodeY, connectedNodeX, connectedNodeY);
          }
        });
      });
    });

    Object.values(this.skillTree.groups).forEach((group) => {
      const { screenX, screenY } = this.calculateScreenCoordinates(
        group.x,
        group.y,
        scaleX,
        scaleY
      );

      this.drawGroupCenter(screenX, screenY);

      group.nodes.forEach((nodeId) => {
        const node = this.skillTree.nodes[nodeId];
        if (!node) return;

        const { nodeX, nodeY } = this.calculateNodePosition(
          group,
          node,
          scaleX,
          scaleY
        );
        this.drawNode(node, nodeX, nodeY);
      });
    });
  }

  private enableDrag() {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    this.canvas.addEventListener("mousedown", (event) => {
      isDragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    });

    this.canvas.addEventListener("mouseup", () => {
      isDragging = false;
    });

    this.canvas.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    this.canvas.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        this.viewWindow.x -= dx * this.viewWindow.dialiationCoefficient;
        this.viewWindow.y -= dy * this.viewWindow.dialiationCoefficient;

        this.drawSkillTree();

        lastX = event.clientX;
        lastY = event.clientY;
      }
    });
  }

  private enableScrollWheelZoom() {
    this.canvas.addEventListener("wheel", (event) => {
      const delta = Math.sign(event.deltaY);
      const zoomFactor = 1.1;
      const maximumZoom = 10;
      const minimumZoom = 0.1;

      if (delta > 0 && this.viewWindow.dialiationCoefficient < maximumZoom) {
        this.viewWindow.width *= zoomFactor;
        this.viewWindow.height *= zoomFactor;
        this.viewWindow.dialiationCoefficient *= zoomFactor;
      } else if (
        delta < 0 &&
        this.viewWindow.dialiationCoefficient > minimumZoom
      ) {
        this.viewWindow.width /= zoomFactor;
        this.viewWindow.height /= zoomFactor;
        this.viewWindow.dialiationCoefficient /= zoomFactor;
      }

      this.drawSkillTree();
    });
  }

  private calculateScreenCoordinates(
    x: number,
    y: number,
    scaleX: number,
    scaleY: number
  ) {
    return {
      screenX: (x - this.viewWindow.x) * scaleX,
      screenY: (y - this.viewWindow.y) * scaleY,
    };
  }

  private calculateNodePosition(
    group: GroupInterface,
    node: NodeInterface,
    scaleX: number,
    scaleY: number
  ) {
    const { angle, radius } = this.calculateAngleAndRadius(node);
    const { screenX, screenY } = this.calculateScreenCoordinates(
      group.x,
      group.y,
      scaleX,
      scaleY
    );

    return {
      nodeX: screenX + radius * scaleX * Math.sin(angle),
      nodeY: screenY - radius * scaleY * Math.cos(angle),
    };
  }

  private drawConnection(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    this.ctx.lineWidth = this.connectionLineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  private drawGroupCenter(x: number, y: number) {
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.groupCenterRadius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private drawNode(node: NodeInterface, x: number, y: number) {
    this.ctx.fillStyle = node.isNotable ? "orange" : "gray";
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.viewWindow.nodeRadius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private calculateAngleAndRadius(node: NodeInterface) {
    const orbit = node.orbit;
    const orbitIndex = node.orbitIndex;
    const angle =
      ((2 * Math.PI) / this.skillTree.constants.skillsPerOrbit[orbit]) *
      orbitIndex;
    const radius = this.skillTree.constants.orbitRadii[orbit];

    return { angle, radius };
  }
}
