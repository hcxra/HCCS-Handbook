//Axel Cazorla
//Handles logic for intermediate data structures visuals

// ----------------------------------
// Intermediate Data Structures: Stack
// ----------------------------------
let stackCanvas, stackCtx, stackValues = [];

// Initialize Stack Visualization
function initializeStack() {
    stackCanvas = document.getElementById("stackCanvas");
    stackCtx = stackCanvas.getContext("2d");
    clearStack(); // Clear canvas and stack
}

// Push a value onto the Stack
function pushStack() {
    const value = prompt("Enter a value to push onto the stack:");
    if (value !== null) {
        stackValues.push(value);
        drawStack();
    }
}

// Pop a value from the Stack
function popStack() {
    if (stackValues.length === 0) {
        alert("The stack is empty!");
    } else {
        const poppedValue = stackValues.pop();
        alert(`Popped value: ${poppedValue}`);
        drawStack();
    }
}

// Peek at the top value of the Stack
function peekStack() {
    if (stackValues.length === 0) {
        alert("The stack is empty!");
    } else {
        alert(`Top value: ${stackValues[stackValues.length - 1]}`);
    }
}

// Draw the Stack Visualization
function drawStack() {
    stackCtx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
    const blockHeight = 40;
    const blockWidth = 100;
    const startX = (stackCanvas.width - blockWidth) / 2;

    // Draw each value as a block in the stack
    for (let i = 0; i < stackValues.length; i++) {
        const y = stackCanvas.height - (i + 1) * blockHeight;

        // Draw block
        stackCtx.fillStyle = "purple";
        stackCtx.fillRect(startX, y, blockWidth, blockHeight);
        stackCtx.strokeRect(startX, y, blockWidth, blockHeight);

        // Draw value inside the block
        stackCtx.fillStyle = "white";
        stackCtx.font = "16px Arial";
        stackCtx.fillText(stackValues[i], startX + 35, y + 25);
    }
}

// Clear the Stack
function clearStack() {
    stackCtx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
    stackValues = [];
    console.log("Stack cleared.");
}

// ----------------------------------
// Intermediate Data Structures: Queue
// ----------------------------------
let queueCanvas, queueCtx, queueValues = [];

// Initialize Queue Visualization
function initializeQueue() {
    queueCanvas = document.getElementById("queueCanvas");
    queueCtx = queueCanvas.getContext("2d");
    clearQueue(); // Clear canvas and reset the queue
}

// Enqueue a value to the Queue
function enqueueQueue() {
    const value = prompt("Enter a value to enqueue:");
    if (value !== null) {
        queueValues.push(value);
        drawQueue();
    }
}

// Dequeue a value from the Queue
function dequeueQueue() {
    if (queueValues.length === 0) {
        alert("The queue is empty!");
    } else {
        const dequeuedValue = queueValues.shift();
        alert(`Dequeued value: ${dequeuedValue}`);
        drawQueue();
    }
}

// Peek at the front value of the Queue
function peekQueue() {
    if (queueValues.length === 0) {
        alert("The queue is empty!");
    } else {
        alert(`Front value: ${queueValues[0]}`);
    }
}

// Draw the Queue Visualization
function drawQueue() {
    queueCtx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
    const blockWidth = 80;
    const blockHeight = 50;
    const startY = (queueCanvas.height - blockHeight) / 2;

    // Draw each value as a block in the queue
    for (let i = 0; i < queueValues.length; i++) {
        const x = i * (blockWidth + 10) + 80; // Adjusted X position for spacing

        // Draw block
        queueCtx.fillStyle = "purple";
        queueCtx.fillRect(x, startY, blockWidth, blockHeight);
        queueCtx.strokeRect(x, startY, blockWidth, blockHeight);

        // Draw value inside the block
        queueCtx.fillStyle = "white";
        queueCtx.font = "16px Arial";
        queueCtx.textAlign = "center";
        queueCtx.fillText(queueValues[i], x + blockWidth / 2, startY + 30);

        // Draw arrows for front and rear indicators
        if (i === 0) drawArrow(queueCtx, x - 30, startY + 25, x, startY + 25, "Front");
        if (i === queueValues.length - 1) drawArrow(queueCtx, x + blockWidth, startY + 25, x + blockWidth + 30, startY + 25, "Rear");
    }
}


// Clear the Queue
function clearQueue() {
    queueCtx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
    queueValues = [];
    console.log("Queue cleared.");
}

// Utility: Draw Arrow with Optional Label
function drawArrow(ctx, fromX, fromY, toX, toY, label = "") {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Draw Arrowhead
    const headlen = 10; // Length of arrowhead
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

    // Draw Label with offset
    if (label) {
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";

        // Add a slight horizontal offset for Front/Rear labels
        const offsetX = label === "Front" ? 5 : 20; // Adjust left or right
        ctx.fillText(label, fromX + offsetX, fromY - 10); // Adjusted label position
    }
}

// ----------------------------------
// Intermediate Data Structures: Trees
// ----------------------------------
let treeCanvas, treeCtx;
let treeRoot = null;
const nodeRadius = 20;

// Node Constructor for Binary Tree
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Initialize Tree Visualization
function initializeTree() {
    treeCanvas = document.getElementById("treeCanvas");
    treeCtx = treeCanvas.getContext("2d");
    clearTree();
}

// Insert Node into the Binary Tree
function insertNode() {
    const value = prompt("Enter value to insert:");
    if (value !== null && !isNaN(value)) {
        treeRoot = insertTreeNode(treeRoot, parseInt(value));
        drawTree();
    }
}

// Recursive Insert Function
function insertTreeNode(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertTreeNode(node.left, value);
    else node.right = insertTreeNode(node.right, value);
    return node;
}

// Search Node in the Binary Tree
function searchNode() {
    const value = prompt("Enter value to search:");
    if (value !== null && !isNaN(value)) {
        highlightPath(treeRoot, parseInt(value));
    }
}

// Recursive Search Function with Highlight
function highlightPath(node, value, x = treeCanvas.width / 2, y = 50, level = 1) {
    if (!node) {
        alert(`Value ${value} not found in the tree.`);
        return;
    }

    drawTree(node, x, y, level, node.value === value ? "green" : "purple");

    if (node.value === value) {
        alert(`Value ${value} found!`);
        return;
    }
    const xOffset = 100 / level;
    if (value < node.value) highlightPath(node.left, value, x - xOffset, y + 50, level + 1);
    else highlightPath(node.right, value, x + xOffset, y + 50, level + 1);
}

// Traverse the Tree
function traverseTree(order) {
    const result = [];
    if (order === "inorder") inorderTraversal(treeRoot, result);
    else if (order === "preorder") preorderTraversal(treeRoot, result);
    else if (order === "postorder") postorderTraversal(treeRoot, result);
    alert(`${order} traversal: ${result.join(", ")}`);
}

// Inorder Traversal
function inorderTraversal(node, result) {
    if (node) {
        inorderTraversal(node.left, result);
        result.push(node.value);
        inorderTraversal(node.right, result);
    }
}

// Preorder Traversal
function preorderTraversal(node, result) {
    if (node) {
        result.push(node.value);
        preorderTraversal(node.left, result);
        preorderTraversal(node.right, result);
    }
}

// Postorder Traversal
function postorderTraversal(node, result) {
    if (node) {
        postorderTraversal(node.left, result);
        postorderTraversal(node.right, result);
        result.push(node.value);
    }
}

// Delete Node from the Binary Tree
function deleteNode() {
    const value = prompt("Enter value to delete:");
    if (value !== null && !isNaN(value)) {
        treeRoot = deleteTreeNode(treeRoot, parseInt(value));
        drawTree();
    }
}

// Recursive Delete Function
function deleteTreeNode(node, value) {
    if (!node) return null;

    if (value < node.value) node.left = deleteTreeNode(node.left, value);
    else if (value > node.value) node.right = deleteTreeNode(node.right, value);
    else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        const minValue = findMinValue(node.right);
        node.value = minValue;
        node.right = deleteTreeNode(node.right, minValue);
    }
    return node;
}

// Find Minimum Value in the Tree
function findMinValue(node) {
    while (node.left) node = node.left;
    return node.value;
}

// Draw the Tree Visualization
function drawTree(node = treeRoot, x = treeCanvas.width / 2, y = 50, level = 1, color = "purple") {
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
    drawNode(node, x, y, level, color);
}

// Recursive Draw Function
function drawNode(node, x, y, level, color) {
    if (!node) return;

    // Draw left child
    if (node.left) {
        const leftX = x - 100 / level;
        const leftY = y + 50;
        drawLine(treeCtx, x, y, leftX, leftY);
        drawNode(node.left, leftX, leftY, level + 1, color);
    }

    // Draw right child
    if (node.right) {
        const rightX = x + 100 / level;
        const rightY = y + 50;
        drawLine(treeCtx, x, y, rightX, rightY);
        drawNode(node.right, rightX, rightY, level + 1, color);
    }

    // Draw current node
    treeCtx.beginPath();
    treeCtx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    treeCtx.fillStyle = color;
    treeCtx.fill();
    treeCtx.stroke();
    treeCtx.fillStyle = "white";
    treeCtx.fillText(node.value, x - 5, y + 5);
}

// Draw Line Between Nodes
function drawLine(ctx, fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}

// Clear the Tree
function clearTree() {
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
    treeRoot = null;
    console.log("Tree cleared.");
}
