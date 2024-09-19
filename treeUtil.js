import { BinaryTreeNode } from "./BinaryTreeNode.js";

export const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 40,
  nodeHeightSpacing: 110,
  fontSize: 11,
};

export function getRequiredHeightAndWidth(root) {
  const heightOfTree = root.getHeight();
  const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;

  //total width of leaf nodes
  //get no of leaf nodes possible
  const maxLeafNodes = Math.pow(2, heightOfTree);
  const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

  return { requiredCanvasHeight, requiredCanvasWidth };
}

export function drawNode(value, canvasElement, x, y) {
  const context = canvasElement.getContext("2d");

  //draw a circle
  context.beginPath();
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.lineWidth = "2";
  context.fill();

  //Draw circle border
  context.beginPath();
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  context.strokeStyle = "#002766";
  context.strokeWidth = "10";
  context.stroke();

  //write value
  context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
  context.fillStyle = "#000";
  context.textAlign = "center";
  context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
  const { xStart, xEnd } = xCoordinates;
  const { yStart, yEnd } = yCoordinates;

  const start = { x: xStart, y: yStart };
  const end = { x: xEnd, y: yEnd };

  //for comtrol point 1
  const xHalf = (xStart + xEnd) / 2;
  const yHalf = (yStart + yEnd) / 2;

  const cpoint1 = { x: xHalf, y: yHalf };
  const cpoint2 = { x: xEnd, y: yHalf };

  //Draw curve
  const context = canvasElement.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#002766";
  context.moveTo(start.x, start.y);
  // context.lineTo(end.x, end.y);
  // context.stroke();
  context.bezierCurveTo(
    cpoint1.x,
    cpoint1.y,
    cpoint2.x,
    cpoint2.y,
    end.x,
    end.y
  );
  context.stroke();
}

export function treeConstructor(input) {
  input = parseInput(input);
  const queue = [];

  let idx = 0;
  const root = new BinaryTreeNode(input[idx]);
  idx++;

  queue.push(root);
  while (queue.length > 0 && idx < input.length) {
    const node = queue.shift();

    //left child
    if (idx < input.length) {
      if (input[idx] !== null) {
        const leftNode = new BinaryTreeNode(input[idx]);
        node.setLeft(leftNode);
        queue.push(leftNode);
      }
      idx++;
    }

    //right child
    if (idx < input.length) {
      if (input[idx] !== null) {
        const rightNode = new BinaryTreeNode(input[idx]);
        node.setRight(rightNode);
        queue.push(rightNode);
      }
      idx++;
    }
  }
  return root;
}

function parseInput(input) {
  let parseInput = "";
  for (let i = 0; i < input.length; i++) {
    const ch = input.charAt(i);
    if (ch !== " ") parseInput += ch;
  }

  return parseInput.split(",").map((elem) => {
    if (elem === "null") return null;
    else return elem;
  });
}
