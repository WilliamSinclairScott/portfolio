import {
  SkillTree as SkillTreeInterface,
  Group as GroupInterface,
  Node as NodeInterface,
} from "@interfaces/skilltree";

export default class SkillTreeCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private skillTree: SkillTreeInterface;
  private viewWindow: { x: number; y: number; width: number; height: number };

  // Define sizes for dots and lines
  private readonly groupCenterRadius = 0;
  private readonly nodeRadius = 5;
  private readonly connectionLineWidth = 1;

  constructor(canvas: HTMLCanvasElement, skillTree: SkillTreeInterface) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.skillTree = skillTree;

    // Set initial view window to cover the entire skill tree
    const width = (skillTree.max_x - skillTree.min_x) * 0.1;
    const height = (skillTree.max_y - skillTree.min_y) * 0.1;
    const centerX = (skillTree.min_x + skillTree.max_x) / 2;
    const centerY = (skillTree.min_y + skillTree.max_y) / 2;

    this.viewWindow = {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width: width,
      height: height,
    };

    // Uncomment the following lines to set the view window to cover the entire skill tree
    // this.viewWindow = {
    //   x: skillTree.min_x,
    //   y: skillTree.min_y,
    //   width: skillTree.max_x - skillTree.min_x,
    //   height: skillTree.max_y - skillTree.min_y,
    // };
    

    // Set canvas size
    this.canvas.width = this.viewWindow.width;
    this.canvas.height = this.viewWindow.height;

    // Add event listener for arrow keys
    window.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Add hover event listener
    this.canvas.addEventListener("mousemove", this.handleCanvasHover.bind(this));
  }

  drawSkillTree() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    // Define scaling factors
    const scaleX = this.canvas.width / this.viewWindow.width;
    const scaleY = this.canvas.height / this.viewWindow.height;
  
    // Draw connections first
    Object.values(this.skillTree.groups).forEach((group: GroupInterface) => {
      const screenX = (group.x - this.viewWindow.x) * scaleX;
      const screenY = (group.y - this.viewWindow.y) * scaleY;
  
      group.nodes.forEach((nodeId: string) => {
        const node = this.skillTree.nodes[nodeId];
  
        if (!node) return;
  
        // Calculate node position
        const orbit = node.orbit;
  
        if (orbit < 0 || orbit >= this.skillTree.constants.skillsPerOrbit.length) return;
  
        const {angle, radius} = this.calculateAngleAndRadius(node);
        const nodeX = screenX + radius * scaleX * Math.sin(angle);
        const nodeY = screenY - radius * scaleY * Math.cos(angle);
  
        // Draw connections to other nodes
        node.out.forEach((connectedNodeId: string) => {
          const connectedNode = this.skillTree.nodes[connectedNodeId];
          if (!connectedNode) return;
  
          const connectedGroup = this.skillTree.groups[connectedNode.group];
          if (!connectedGroup) return;
  
          const connectedGroupX = (connectedGroup.x - this.viewWindow.x) * scaleX;
          const connectedGroupY = (connectedGroup.y - this.viewWindow.y) * scaleY;
  
          const {angle, radius} = this.calculateAngleAndRadius(connectedNode);
          const connectedNodeX = connectedGroupX + radius * scaleX * Math.sin(angle);
          const connectedNodeY = connectedGroupY - radius * scaleY * Math.cos(angle);
  
          // Skip connections to/from ascendancy nodes
            if (!node.ascendancyName && !connectedNode.ascendancyName && !node.isMastery && !connectedNode.isMastery) {
            this.ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
            this.ctx.lineWidth = this.connectionLineWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(nodeX, nodeY);
            this.ctx.lineTo(connectedNodeX, connectedNodeY);
            this.ctx.stroke();
            }
        });
      });
    });
  
    // Draw nodes and group centers
    Object.values(this.skillTree.groups).forEach((group: GroupInterface) => {
      const screenX = (group.x - this.viewWindow.x) * scaleX;
      const screenY = (group.y - this.viewWindow.y) * scaleY;
  
      // Draw the group center
      this.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, this.groupCenterRadius, 0, 2 * Math.PI);
      this.ctx.fill();
  
      // Draw nodes within the group
      group.nodes.forEach((nodeId: string) => {
        const node = this.skillTree.nodes[nodeId];
        if (!node) return;
  
        const orbit = node.orbit;
  
        if (orbit < 0 || orbit >= this.skillTree.constants.skillsPerOrbit.length) return;
  
        const {angle, radius} = this.calculateAngleAndRadius(node);
        const nodeX = screenX + radius * scaleX * Math.sin(angle);
        const nodeY = screenY - radius * scaleY * Math.cos(angle);
        // Draw the node
        this.drawNode(node, nodeX, nodeY);
      });
    });
  }
  
  
  // Draw individual nodes
  private drawNode(node: NodeInterface, x: number, y: number) {
    // Style based on node type
    if (node.isNotable) {
      this.ctx.fillStyle = "orange";
    } else {
      this.ctx.fillStyle = "gray";
    }
  
    // Draw the node
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI); 
    this.ctx.fill();
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
        this.viewWindow.width = this.viewWindow.height * (parent.clientWidth / parent.clientHeight);
      } else {
        this.viewWindow.height = this.viewWindow.width / (parent.clientWidth / parent.clientHeight);
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const moveAmount = 1000; // Adjust this value to change the speed of movement

    switch (event.key) {
      case "ArrowUp":
        this.viewWindow.y -= moveAmount;
        break;
      case "ArrowDown":
        this.viewWindow.y += moveAmount;
        break;
      case "ArrowLeft":
        this.viewWindow.x -= moveAmount;
        break;
      case "ArrowRight":
        this.viewWindow.x += moveAmount;
        break;
    }

    this.drawSkillTree();
  }
  
  private handleCanvasClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const scaleX = this.viewWindow.width / this.canvas.width;
    const scaleY = this.viewWindow.height / this.canvas.height;

    const canvasX = x * scaleX + this.viewWindow.x;
    const canvasY = y * scaleY + this.viewWindow.y;

    let closestNode: NodeInterface | null = null;
    let minDistance = Infinity;

    Object.values(this.skillTree.groups).forEach((group: GroupInterface) => {
      const groupX = group.x;
      const groupY = group.y;

      group.nodes.forEach((nodeId: string) => {
      const node = this.skillTree.nodes[nodeId];
      if (!node) return;

      const { angle, radius } = this.calculateAngleAndRadius(node);
      const nodeX = groupX + radius * Math.sin(angle);
      const nodeY = groupY - radius * Math.cos(angle);

      const distance = Math.sqrt((nodeX - canvasX) ** 2 + (nodeY - canvasY) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestNode = node;
      }
      });
    });

    if (closestNode) {
      alert(`Closest node: ${JSON.stringify(closestNode)}`);
    }
  }
  private calculateAngleAndRadius(node: NodeInterface) {
    const orbit = node.orbit;
    const orbitIndex = node.orbitIndex;
    const angle = (2 * Math.PI / this.skillTree.constants.skillsPerOrbit[orbit]) * orbitIndex;
    const radius = this.skillTree.constants.orbitRadii[orbit];
  
    return { angle, radius };
  }
}
