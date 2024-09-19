import { BinaryTreeNode } from "./BinaryTreeNode.js";
import {
  connectEdges,
  DEFAULT_CONFIG,
  drawNode,
  getRequiredHeightAndWidth,
  treeConstructor,
} from "./treeUtil.js";

const canvas = document.querySelector("canvas");

function drawBinaryTree(root, canvasElement) {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  //initiate the canvas dimensions to full width and height
  canvasElement.width = maxWidth;
  canvasElement.height = maxHeight;

  //Calc req width and height to draw the tree structure
  const { requiredCanvasHeight, requiredCanvasWidth } =
    getRequiredHeightAndWidth(root);

  const windowWidthCenter = maxWidth / 2;
  const requiredWidthCenter = requiredCanvasWidth / 2;

  const xStart = windowWidthCenter - requiredWidthCenter;
  const xEnd = windowWidthCenter + requiredWidthCenter;
  const horizontalConfig = { xStart, xEnd };

  //Draw
  recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig);
}

// Algo for recursivelyDrawNodes function:

// 1.Find root node co-ordinates.
// 2.Draw root circle.
// 3.Recursively draw left and right nodes.
// 4. Connect edges of root with left and right nodes.

function recursivelyDrawNodes(
  root,
  canvasElement,
  currentLine,
  horizontalConfig
) {
  const { xStart, xEnd } = horizontalConfig;

  const xPos = (xStart + xEnd) / 2;
  const yPos = currentLine * DEFAULT_CONFIG.nodeHeightSpacing;

  //this func will draw the circle, fill it with text, add color, border etc
  drawNode(root.value, canvasElement, xPos, yPos);

  if (root.left !== null) {
    const leftNodeHorizontalConfig = { xStart, xEnd: xPos };
    recursivelyDrawNodes(
      root.left,
      canvasElement,
      currentLine + 1,
      leftNodeHorizontalConfig
    );
    connectEdges(
      canvasElement,
      {
        xStart: xPos,
        xEnd: (xStart + xPos) / 2,
      },
      {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      }
    );
  }

  if (root.right !== null) {
    const rightNodeHorizontalConfig = { xStart: xPos, xEnd };
    recursivelyDrawNodes(
      root.right,
      canvasElement,
      currentLine + 1,
      rightNodeHorizontalConfig
    );
    connectEdges(
      canvasElement,
      {
        xStart: xPos,
        xEnd: (xPos + xEnd) / 2,
      },
      {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      }
    );
  }
}
//

//draw the root node
// const root = new BinaryTreeNode(1);

// const node2 = new BinaryTreeNode(2);
// root.setLeft(node2);

// const node3 = new BinaryTreeNode(3);
// root.setRight(node3);

// const node4 = new BinaryTreeNode(4);
// node3.setLeft(node4);

// const node5 = new BinaryTreeNode(5);
// node3.setRight(node5);

// const node6 = new BinaryTreeNode(6);
// node2.setRight(node6);

// const node7 = new BinaryTreeNode(7);
// node4.setRight(node7);

// console.log(root);

//drawBinaryTree(root, canvas);

let prevValue = "";
function init(value) {
  prevValue = value;
  clearCanvas();
  const root = treeConstructor(value);
  console.log(root);

  drawBinaryTree(root, canvas);
}

function clearCanvas() {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const textarea = document.querySelector("textarea");
const applyBtn = document.querySelector(".applyBtn");
const clearBtn = document.querySelector(".clearBtn");

applyBtn.addEventListener("click", () => {
  if (textarea.value === "") return;
  init(textarea.value);
});

clearBtn.addEventListener("click", () => {
  textarea.value = "";
  clearCanvas();
});

window.addEventListener("resize", () => {
  init(prevValue);
});
