// ----------------------------------
// Dijkstra's Algorithm Visualization
// ----------------------------------
let dijkstraCanvas, dijkstraCtx, dijkstraNodes = [], dijkstraEdges = [];
let dijkstraDragging = null;

function initializeDijkstra() {
    dijkstraCanvas = document.getElementById("dijkstraCanvas");
    dijkstraCtx = dijkstraCanvas.getContext("2d");

    dijkstraCanvas.addEventListener("click", addDijkstraNode);
    dijkstraCanvas.addEventListener("mousedown", startDijkstraEdge);
    dijkstraCanvas.addEventListener("mouseup", endDijkstraEdge);

    dijkstraNodes = [];
    dijkstraEdges = [];
    clearDijkstraCanvas();
    console.log("Dijkstra's canvas initialized.");
}

function addDijkstraNode(event) {
    const { x, y } = getMousePosition(event, dijkstraCanvas);
    if (!findNode(x, y, dijkstraNodes)) {
        dijkstraNodes.push({ x, y, id: dijkstraNodes.length });
        drawGraph(dijkstraCtx, dijkstraNodes, dijkstraEdges);
    }
}

function startDijkstraEdge(event) {
    dijkstraDragging = findNode(event.offsetX, event.offsetY, dijkstraNodes);
}

function endDijkstraEdge(event) {
    const target = findNode(event.offsetX, event.offsetY, dijkstraNodes);
    if (dijkstraDragging && target && dijkstraDragging.id !== target.id) {
        const weight = prompt("Enter edge weight:", "1");
        if (!isNaN(weight)) {
            dijkstraEdges.push({ from: dijkstraDragging.id, to: target.id, weight: parseInt(weight) });
            drawGraph(dijkstraCtx, dijkstraNodes, dijkstraEdges);
        }
    }
    dijkstraDragging = null;
}

function runDijkstra() {
    const start = prompt("Enter start node ID:", "0");
    if (start === null || isNaN(start) || start >= dijkstraNodes.length) {
        alert("Invalid start node.");
        return;
    }

    const distances = new Array(dijkstraNodes.length).fill(Infinity);
    const visited = new Set();
    distances[start] = 0;

    while (visited.size < dijkstraNodes.length) {
        let minNode = null;
        let minDistance = Infinity;
        for (let i = 0; i < distances.length; i++) {
            if (!visited.has(i) && distances[i] < minDistance) {
                minNode = i;
                minDistance = distances[i];
            }
        }
        if (minNode === null) break;

        visited.add(minNode);
        dijkstraEdges.forEach(edge => {
            if (edge.from === minNode && !visited.has(edge.to)) {
                const newDist = distances[minNode] + edge.weight;
                if (newDist < distances[edge.to]) distances[edge.to] = newDist;
            }
        });
    }

    alert(`Shortest distances from node ${start}:\n${distances.join(", ")}`);
}

function clearDijkstraCanvas() {
    dijkstraCtx.clearRect(0, 0, dijkstraCanvas.width, dijkstraCanvas.height);
    dijkstraNodes = [];
    dijkstraEdges = [];
}

// ----------------------------------
// Depth-First Search (DFS)
// ----------------------------------
let dfsCanvas, dfsCtx, dfsNodes = [], dfsEdges = [];
let dfsDragging = null;

function initializeDFS() {
    dfsCanvas = document.getElementById("dfsCanvas");
    dfsCtx = dfsCanvas.getContext("2d");

    dfsCanvas.addEventListener("click", addDFSNode);
    dfsCanvas.addEventListener("mousedown", startDFSEdge);
    dfsCanvas.addEventListener("mouseup", endDFSEdge);

    dfsNodes = [];
    dfsEdges = [];
    clearDFSCanvas();
    console.log("DFS canvas initialized.");
}

function addDFSNode(event) {
    const { x, y } = getMousePosition(event, dfsCanvas);
    if (!findNode(x, y, dfsNodes)) {
        dfsNodes.push({ x, y, id: dfsNodes.length });
        drawGraph(dfsCtx, dfsNodes, dfsEdges);
    }
}

function startDFSEdge(event) {
    dfsDragging = findNode(event.offsetX, event.offsetY, dfsNodes);
}

function endDFSEdge(event) {
    const target = findNode(event.offsetX, event.offsetY, dfsNodes);
    if (dfsDragging && target && dfsDragging.id !== target.id) {
        dfsEdges.push({ from: dfsDragging.id, to: target.id, weight: 1 });
        drawGraph(dfsCtx, dfsNodes, dfsEdges);
    }
    dfsDragging = null;
}

// Run DFS Visualization (with traversal left-to-right and down)
async function runDFS() {
    if (dfsNodes.length === 0 || dfsEdges.length === 0) {
        alert("Add nodes and edges to run DFS.");
        return;
    }

    // Reset visited status for all nodes
    for (let node of dfsNodes) {
        node.visited = false;
    }

    // Start DFS traversal from node 0
    await dfsTraverse(0);
}

// DFS Recursive Function with Visual Updates
async function dfsTraverse(nodeId) {
    const node = dfsNodes[nodeId];
    if (!node || node.visited) return; // Skip already visited nodes

    // Mark node as visited and highlight it
    node.visited = true;
    drawDFSGraph(nodeId);
    await sleep(800); // Pause to visualize step

    // Get all adjacent nodes (sorted for left-to-right order)
    const adjacentEdges = dfsEdges
        .filter(edge => edge.from === nodeId) // Outgoing edges
        .sort((a, b) => a.to - b.to); // Sort edges for left-to-right order

    for (let edge of adjacentEdges) {
        await dfsTraverse(edge.to);
    }
}

function clearDFSCanvas() {
    dfsCtx.clearRect(0, 0, dfsCanvas.width, dfsCanvas.height);
    dfsNodes = [];
    dfsEdges = [];
}
// Draw Graph with Highlighted Node
function drawDFSGraph(currentNodeId) {
    dfsCtx.clearRect(0, 0, dfsCanvas.width, dfsCanvas.height);

    // Draw edges first
    dfsEdges.forEach(edge => {
        const from = dfsNodes[edge.from];
        const to = dfsNodes[edge.to];
        drawLine(dfsCtx, from, to, "gray");
    });

    // Draw nodes with highlights
    dfsNodes.forEach(node => {
        const fillColor = node.visited
            ? node.id === currentNodeId
                ? "green" // Highlight current node being visited
                : "lightgreen" // Visited nodes
            : "purple"; // Unvisited nodes

        drawCircle(dfsCtx, node.x, node.y, 15, fillColor, "white", node.id);
    });
}

// ----------------------------------
// Shared Utility Functions
// ----------------------------------
function drawGraph(ctx, nodes, edges, nodeColor = () => "purple") {
    edges.forEach(edge => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        drawLine(ctx, from, to, "gray");

        // Display edge weight
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(edge.weight, midX, midY);
    });

    nodes.forEach(node => {
        drawCircle(ctx, node.x, node.y, 15, nodeColor(node), "white", node.id);
    });
}

function drawLine(ctx, from, to, color) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawCircle(ctx, x, y, radius, fillColor, textColor, text) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText(text, x - 5, y + 5);
}

function findNode(x, y, nodes) {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 15);
}

function getMousePosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
