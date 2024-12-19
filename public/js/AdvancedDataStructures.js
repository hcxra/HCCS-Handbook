//Axel Cazorla
//Handles logic for Advanced Data Structures

// ----------------------------------
// Advanced Data Structures: Graphs
// ----------------------------------
let graphCanvas, graphCtx, graphNodes = [], graphEdges = [];
let graphDraggingNode = null, startGraphNode = null;

// Initialize Graph Visualization
function initializeGraph() {
    graphCanvas = document.getElementById("graphCanvas");
    graphCtx = graphCanvas.getContext("2d");

    graphCanvas.addEventListener("click", addGraphNode);
    graphCanvas.addEventListener("mousedown", startGraphEdge);
    graphCanvas.addEventListener("mouseup", endGraphEdge);
    graphNodes = [];
    graphEdges = [];
    clearGraphCanvas();
}

// Add Node to the Graph
function addGraphNode(event) {
    const { x, y } = getMousePosition(event, graphCanvas);
    if (!findGraphNode(x, y)) {
        graphNodes.push({ x, y, id: graphNodes.length, visited: false });
        drawGraph();
    }
}

// Start Edge Creation
function startGraphEdge(event) {
    const { x, y } = getMousePosition(event, graphCanvas);
    startGraphNode = findGraphNode(x, y);
}

// End Edge Creation
function endGraphEdge(event) {
    if (!startGraphNode) return;

    const { x, y } = getMousePosition(event, graphCanvas);
    const endGraphNode = findGraphNode(x, y);

    if (endGraphNode && startGraphNode.id !== endGraphNode.id) {
        const weight = prompt("Enter edge weight:", "1");
        if (!isNaN(weight)) {
            graphEdges.push({
                from: startGraphNode.id,
                to: endGraphNode.id,
                weight: parseInt(weight),
            });
            drawGraph();
        }
    }

    startGraphNode = null;
}

// Run BFS (Breadth-First Search)
async function runBFS() {
    resetGraphVisits();
    const startId = prompt("Enter start node ID for BFS:", "0");
    if (startId === null || isNaN(startId) || startId >= graphNodes.length) return;

    const queue = [parseInt(startId)];
    graphNodes[startId].visited = true;

    while (queue.length) {
        const nodeId = queue.shift();
        highlightNode(nodeId, "green");
        await sleep(500);

        graphEdges.forEach(edge => {
            if (edge.from === nodeId && !graphNodes[edge.to].visited) {
                graphNodes[edge.to].visited = true;
                queue.push(edge.to);
            }
        });
    }
}

// Run DFS (Depth-First Search)
async function runDFS() {
    resetGraphVisits();
    const startId = prompt("Enter start node ID for DFS:", "0");
    if (startId === null || isNaN(startId) || startId >= graphNodes.length) return;

    await dfsTraverse(parseInt(startId));
}

// Recursive DFS Helper
async function dfsTraverse(nodeId) {
    if (graphNodes[nodeId].visited) return;

    graphNodes[nodeId].visited = true;
    highlightNode(nodeId, "orange");
    await sleep(500);

    graphEdges.forEach(edge => {
        if (edge.from === nodeId) {
            dfsTraverse(edge.to);
        }
    });
}

// Draw the Graph
function drawGraph() {
    clearGraphCanvas();

    // Draw Edges
    graphEdges.forEach(edge => {
        const fromNode = graphNodes[edge.from];
        const toNode = graphNodes[edge.to];
        drawLine(fromNode.x, fromNode.y, toNode.x, toNode.y, "gray");

        // Edge Weight
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        graphCtx.fillStyle = "black";
        graphCtx.fillText(edge.weight, midX, midY);
    });

    // Draw Nodes
    graphNodes.forEach(node => drawNode(node));
}


//Function to add nodes manually just in case 
function addGraphNodeManually() {
    const x = prompt("Enter x-coordinate (0-800):", "100");
    const y = prompt("Enter y-coordinate (0-400):", "100");

    if (isNaN(x) || isNaN(y)) {
        alert("Invalid coordinates!");
        return;
    }

    if (!findGraphNode(x, y)) {
        graphNodes.push({ x: parseInt(x), y: parseInt(y), id: graphNodes.length, visited: false });
        drawGraph();
    }
}


// Highlight Node
function highlightNode(id, color) {
    const node = graphNodes[id];
    drawNode(node, color);
}

// Utility: Draw Node
function drawNode(node, color = "purple") {
    graphCtx.beginPath();
    graphCtx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    graphCtx.fillStyle = color;
    graphCtx.fill();
    graphCtx.stroke();
    graphCtx.fillStyle = "white";
    graphCtx.fillText(node.id, node.x - 5, node.y + 5);
}

// Utility: Draw Line
function drawLine(x1, y1, x2, y2, color) {
    graphCtx.beginPath();
    graphCtx.moveTo(x1, y1);
    graphCtx.lineTo(x2, y2);
    graphCtx.strokeStyle = color;
    graphCtx.stroke();
}

// Reset Graph Visit States
function resetGraphVisits() {
    graphNodes.forEach(node => (node.visited = false));
    drawGraph();
}

// Clear the Canvas
function clearGraph() {
    graphNodes = [];
    graphEdges = [];
    clearGraphCanvas();
}

function clearGraphCanvas() {
    graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
}

// Utility: Get Mouse Position
function getMousePosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function findGraphNode(x, y) {
    return graphNodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ----------------------------------
// Hash Table Visualization Logic
// ----------------------------------
let hashTableCanvas, hashTableCtx;
let numberOfBuckets = 11; // Default number of buckets
let hashTable = [];

// Initialize Hash Table
function initializeHashTable() {
    hashTableCanvas = document.getElementById("hashTableCanvas");
    hashTableCtx = hashTableCanvas.getContext("2d");
    clearHashTable();
}

// Update Number of Buckets
function setBucketSize() {
    const bucketInput = document.getElementById("bucketInput").value;
    const newSize = parseInt(bucketInput, 10);

    if (!isNaN(newSize) && newSize > 0) {
        numberOfBuckets = newSize; // Update the number of buckets
        hashTable = Array.from({ length: numberOfBuckets }, () => null); // Reset the hash table
        drawHashTable(); // Immediately redraw the buckets
    } else {
        alert("Please enter a valid positive number for buckets.");
    }
}

// Hash Function
function hashFunction(key) {
    return key % numberOfBuckets;
}

// Insert Key-Value Pair
function insertHashTable() {
    const key = parseInt(prompt("Enter the key to insert:"), 10);
    const value = prompt("Enter the value:");

    if (!isNaN(key) && value) {
        let bucketIndex = hashFunction(key);
        let startIndex = bucketIndex; // For detecting infinite loops

        // Linear probing for collision resolution
        while (hashTable[bucketIndex] !== null && hashTable[bucketIndex].key !== key) {
            bucketIndex = (bucketIndex + 1) % numberOfBuckets;
            if (bucketIndex === startIndex) {
                alert("Hash table is full!");
                return;
            }
        }

        hashTable[bucketIndex] = { key, value }; // Add or replace
        drawHashTable(); // Update the visualization
    } else {
        alert("Invalid key or value!");
    }
}

// Delete a Key
function deleteHashTable() {
    const key = parseInt(prompt("Enter a key to delete:"), 10);

    if (!isNaN(key)) {
        let bucketIndex = hashFunction(key);
        let startIndex = bucketIndex;

        // Linear probing to find the key
        while (hashTable[bucketIndex] !== null) {
            if (hashTable[bucketIndex].key === key) {
                hashTable[bucketIndex] = null; // Delete the entry
                drawHashTable(); // Update the visualization
                return;
            }
            bucketIndex = (bucketIndex + 1) % numberOfBuckets;
            if (bucketIndex === startIndex) break; // Prevent infinite loop
        }
        alert("Key not found!");
    } else {
        alert("Invalid key!");
    }
}

// Search for a Key
function searchHashTable() {
    const key = parseInt(prompt("Enter a key to search:"), 10);

    if (!isNaN(key)) {
        let bucketIndex = hashFunction(key);
        let startIndex = bucketIndex;

        // Linear probing to find the key
        while (hashTable[bucketIndex] !== null) {
            if (hashTable[bucketIndex].key === key) {
                alert(`Key: ${hashTable[bucketIndex].key}, Value: ${hashTable[bucketIndex].value}`);
                drawHashTable(bucketIndex); // Highlight the bucket
                return;
            }
            bucketIndex = (bucketIndex + 1) % numberOfBuckets;
            if (bucketIndex === startIndex) break; // Prevent infinite loop
        }
        alert("Key not found!");
    } else {
        alert("Invalid key!");
    }
}

// Draw Hash Table Visualization
function drawHashTable(highlightIndex = -1) {
    hashTableCtx.clearRect(0, 0, hashTableCanvas.width, hashTableCanvas.height);

    const bucketHeight = hashTableCanvas.height / numberOfBuckets;
    hashTable.forEach((bucket, index) => {
        // Draw bucket label
        hashTableCtx.fillStyle = "lightblue";
        hashTableCtx.fillRect(10, index * bucketHeight, 100, bucketHeight - 5);
        hashTableCtx.strokeRect(10, index * bucketHeight, 100, bucketHeight - 5);
        hashTableCtx.fillStyle = "black";
        hashTableCtx.font = "14px Arial";
        hashTableCtx.fillText(`Bucket ${index}`, 20, index * bucketHeight + bucketHeight / 2);

        // Draw bucket contents
        if (bucket !== null) {
            const x = 120;
            const y = index * bucketHeight + 10;
            hashTableCtx.fillStyle = index === highlightIndex ? "orange" : "purple";
            hashTableCtx.fillRect(x, y, 100, bucketHeight - 20);
            hashTableCtx.strokeRect(x, y, 100, bucketHeight - 20);
            hashTableCtx.fillStyle = "white";
            hashTableCtx.fillText(`${bucket.key}:${bucket.value}`, x + 10, y + bucketHeight / 2 - 10);
        }
    });
}

// Clear Hash Table
function clearHashTable() {
    hashTable = Array.from({ length: numberOfBuckets }, () => null); // Reset the hash table
    drawHashTable();
}


