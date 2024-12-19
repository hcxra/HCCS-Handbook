//Axel Cazorla
//Handles logic for simple data structures visuals

// ----------------------------------
// Simple Data Structures: Arrays
// ----------------------------------
let arrayCanvas, arrayCtx, arrayValues = [];

// Initialize Arrays
function initializeArrays() {
    arrayCanvas = document.getElementById("arrayCanvas");
    arrayCtx = arrayCanvas.getContext("2d");
    clearArray();
}

// Insert Values into the Array
function insertArray() {
    const input = document.getElementById("arrayInput").value;
    arrayValues = input.split(',').map(Number).filter(n => !isNaN(n));
    drawArray();
}


// Delete the First Element with Animation
function deleteFirstArray() {
    if (arrayValues.length > 0) {
        arrayValues.shift();
        animateShiftLeft();
    }
}

// Delete the Last Element
function deleteLastArray() {
    if (arrayValues.length > 0) {
        arrayValues.pop();
        drawArray();
    }
}

// Access a Specific Index in the Array
function accessArray() {
    const index = prompt("Enter index to access:");
    if (index >= 0 && index < arrayValues.length) {
        alert(`Value at index ${index}: ${arrayValues[index]}`);
        drawArray(index);
    } else {
        alert("Invalid index.");
    }
}

// Traverse the Array with Highlighting
function traverseArray() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= arrayValues.length) {
            clearInterval(interval);
            return;
        }
        drawArray(i);
        i++;
    }, 500);
}

// Draw the Array Visualization
function drawArray(highlightIndex = -1) {
    arrayCtx.clearRect(0, 0, arrayCanvas.width, arrayCanvas.height);
    const barWidth = 50;

    arrayValues.forEach((val, idx) => {
        arrayCtx.fillStyle = idx === highlightIndex ? "yellow" : "purple";
        arrayCtx.fillRect(idx * barWidth, 50, barWidth - 5, 50);

        arrayCtx.fillStyle = "white";
        arrayCtx.font = "14px Arial";
        arrayCtx.fillText(val, idx * barWidth + 15, 80);
    });
}

// Animate Array Shift Left (for Delete First Element)
function animateShiftLeft() {
    const totalFrames = 20;
    let frame = 0;

    function animate() {
        arrayCtx.clearRect(0, 0, arrayCanvas.width, arrayCanvas.height);

        const barWidth = 50;
        const shiftAmount = barWidth / totalFrames;

        arrayValues.forEach((val, idx) => {
            const x = (idx - 1) * barWidth + shiftAmount * frame;
            const y = 50;

            arrayCtx.fillStyle = "purple";
            arrayCtx.fillRect(x, y, barWidth - 5, 50);

            arrayCtx.fillStyle = "white";
            arrayCtx.font = "14px Arial";
            arrayCtx.fillText(val, x + 15, 80);
        });

        if (frame < totalFrames) {
            frame++;
            requestAnimationFrame(animate);
        } else {
            drawArray(); // Redraw the final array state
        }
    }
    requestAnimationFrame(animate);
}

// Clear the Array Visualization
function clearArray() {
    arrayCtx.clearRect(0, 0, arrayCanvas.width, arrayCanvas.height);
    arrayValues = [];
    document.getElementById("arrayInput").value = "";
}

// ----------------------------------
// Simple Data Structures: Linked List
// ----------------------------------
let linkedListCanvas, linkedListCtx;
let linkedListHead = null;

// Node Constructor for Linked List
class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

// Initialize Linked List
function initializeLinkedList() {
    linkedListCanvas = document.getElementById("linkedListCanvas");
    linkedListCtx = linkedListCanvas.getContext("2d");
    clearLinkedList();
}

// Insert at the Beginning with Animation
function insertAtBeginning() {
    const value = prompt("Enter value to insert at the beginning:");
    if (value !== null) {
        const newNode = new ListNode(value, linkedListHead);
        linkedListHead = newNode;
        animateInsertion(50, newNode);
    }
}

// Insert at the End with Animation
function insertAtEnd() {
    const value = prompt("Enter value to insert at the end:");
    if (value !== null) {
        const newNode = new ListNode(value);
        if (!linkedListHead) {
            linkedListHead = newNode;
            animateInsertion(50, newNode);
        } else {
            let current = linkedListHead;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
            animateInsertion(50 + countNodes() * 100, newNode);
        }
    }
}

// Animate Node Insertion
function animateInsertion(targetX, node) {
    let x = linkedListCanvas.width;
    const y = 50;

    const animate = () => {
        linkedListCtx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);
        drawLinkedList(); // Redraw existing nodes

        // Draw the new node sliding in
        linkedListCtx.fillStyle = "lightblue";
        linkedListCtx.fillRect(x, y, 40, 50);
        linkedListCtx.strokeRect(x, y, 40, 50);
        linkedListCtx.fillStyle = "black";
        linkedListCtx.fillText(node.value, x + 15, y + 30);

        if (x > targetX) {
            x -= 10;
            requestAnimationFrame(animate);
        } else {
            drawLinkedList(); // Finalize position
        }
    };

    requestAnimationFrame(animate);
}

// Delete from the Beginning with Animation
function deleteFromBeginning() {
    if (linkedListHead) {
        animateDeletion(50, () => {
            linkedListHead = linkedListHead.next;
            drawLinkedList();
        });
    } else {
        alert("The list is empty!");
    }
}

// Delete from the End with Animation
function deleteFromEnd() {
    if (!linkedListHead) {
        alert("The list is empty!");
        return;
    }

    let current = linkedListHead,
        prev = null;

    while (current.next) {
        prev = current;
        current = current.next;
    }

    animateDeletion(50 + countNodes() * 100 - 100, () => {
        if (prev) prev.next = null;
        else linkedListHead = null;
        drawLinkedList();
    });
}

// Animate Node Deletion
function animateDeletion(targetX, callback) {
    let alpha = 1.0;
    const y = 50;

    const animate = () => {
        linkedListCtx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);
        drawLinkedList();

        // Draw fading node
        linkedListCtx.globalAlpha = alpha;
        linkedListCtx.fillStyle = "lightblue";
        linkedListCtx.fillRect(targetX, y, 40, 50);
        linkedListCtx.strokeRect(targetX, y, 40, 50);
        linkedListCtx.fillStyle = "black";
        linkedListCtx.fillText("X", targetX + 15, y + 30);
        linkedListCtx.globalAlpha = 1.0;

        if (alpha > 0) {
            alpha -= 0.05;
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    };

    requestAnimationFrame(animate);
}

// Traverse the Linked List
function traverseLinkedList() {
    let current = linkedListHead;
    let i = 0;

    const interval = setInterval(() => {
        if (!current) {
            clearInterval(interval);
            return;
        }
        drawLinkedList(i);
        current = current.next;
        i++;
    }, 500);
}

// Search for a Value
function searchLinkedList() {
    const value = prompt("Enter value to search:");
    let current = linkedListHead;
    let index = 0;

    while (current) {
        if (current.value === value) {
            alert(`Value ${value} found at position ${index}`);
            drawLinkedList(index);
            return;
        }
        current = current.next;
        index++;
    }
    alert(`Value ${value} not found in the list.`);
}

// Draw the Linked List Visualization
function drawLinkedList(highlightIndex = -1) {
    linkedListCtx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);

    let current = linkedListHead;
    let x = 50, y = 50, index = 0;

    while (current) {
        // Draw Node: Data part
        linkedListCtx.fillStyle = "lightblue";
        linkedListCtx.fillRect(x, y, 40, 50);
        linkedListCtx.strokeRect(x, y, 40, 50);

        // Draw Node: Pointer part
        linkedListCtx.fillStyle = "cyan";
        linkedListCtx.fillRect(x + 40, y, 20, 50);
        linkedListCtx.strokeRect(x + 40, y, 20, 50);

        // Highlight node if necessary
        if (index === highlightIndex) {
            linkedListCtx.strokeStyle = "orange";
            linkedListCtx.lineWidth = 3;
            linkedListCtx.strokeRect(x, y, 60, 50);
            linkedListCtx.strokeStyle = "black";
            linkedListCtx.lineWidth = 1;
        }

        // Draw Value in Data part
        linkedListCtx.fillStyle = "black";
        linkedListCtx.font = "14px Arial";
        linkedListCtx.fillText(current.value, x + 15, y + 30);

        // Draw Arrow (if next node exists)
        if (current.next) {
            drawArrow(linkedListCtx, x + 60, y + 25, x + 90, y + 25);
        } else {
            // Mark Tail Pointer as NULL
            linkedListCtx.fillStyle = "black";
            linkedListCtx.fillText("NULL", x + 45, y + 30);
        }

        current = current.next;
        x += 100;
        index++;
    }

    // Draw Head Pointer
    if (linkedListHead) {
        drawArrow(linkedListCtx, 20, y + 25, 50, y + 25, "Head");
    }
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

    // Draw Label if provided
    if (label) {
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(label, fromX - 20, fromY - 10);
    }
}

// Utility: Draw Arrow
function drawArrow(ctx, fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    const headlen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

// Utility: Count Nodes
function countNodes() {
    let count = 0,
        current = linkedListHead;
    while (current) {
        count++;
        current = current.next;
    }
    return count;
}

// Clear Linked List
function clearLinkedList() {
    linkedListHead = null;
    linkedListCtx.clearRect(0, 0, linkedListCanvas.width, linkedListCanvas.height);
    document.getElementById("linkedListInput").value = "";
}

