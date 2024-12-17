// Axel Cazorla
// Simple Algorithm Visualization Logic


// Bubble Sort
let bubbleCanvas, bubbleCtx, bubbleValues = [];

// Run Bubble Sort Visualization
function runBubbleSort() {
    if (!bubbleCanvas) {
        bubbleCanvas = document.getElementById("bubbleSortCanvas");
        bubbleCtx = bubbleCanvas.getContext("2d");
    }

    const input = document.getElementById("numbersInput").value;
    bubbleValues = input.split(',').map(Number).filter(n => !isNaN(n));

    if (bubbleValues.length) {
        visualizeBubbleSort();
    } else {
        alert("Please enter valid numbers.");
    }
}

async function visualizeBubbleSort() {
    for (let i = 0; i < bubbleValues.length - 1; i++) {
        for (let j = 0; j < bubbleValues.length - i - 1; j++) {
            drawBubbleArray(bubbleValues, j, j + 1);
            if (bubbleValues[j] > bubbleValues[j + 1]) {
                [bubbleValues[j], bubbleValues[j + 1]] = [bubbleValues[j + 1], bubbleValues[j]];
                await sleep(500);
            }
        }
    }
    drawBubbleArray(bubbleValues, -1, -1); // Final display
}

function drawBubbleArray(arr, idx1, idx2) {
    bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
    const barWidth = bubbleCanvas.width / arr.length;

    arr.forEach((val, idx) => {
        bubbleCtx.fillStyle = (idx === idx1 || idx === idx2) ? "yellow" : "purple";
        const barHeight = val * 10;
        bubbleCtx.fillRect(idx * barWidth, bubbleCanvas.height - barHeight, barWidth - 5, barHeight);
        bubbleCtx.fillStyle = "black";
        bubbleCtx.fillText(val, idx * barWidth + barWidth / 4, bubbleCanvas.height - barHeight - 5);
    });
}

function clearBubbleSort() {
    if (bubbleCanvas) {
        bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
    }
    document.getElementById("numbersInput").value = "";
    bubbleValues = [];
}

// Binary Search
let binaryCanvas, binaryCtx, binaryValues = [], targetValue;

function runBinarySearch() {
    if (!binaryCanvas) {
        binaryCanvas = document.getElementById("binarySearchCanvas");
        binaryCtx = binaryCanvas.getContext("2d");
    }

    const input = document.getElementById("binaryNumbersInput").value;
    targetValue = parseInt(document.getElementById("binaryTargetInput").value);

    binaryValues = input.split(',').map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (binaryValues.length && !isNaN(targetValue)) {
        visualizeBinarySearch();
    } else {
        alert("Please enter valid sorted numbers and a target value.");
    }
}

async function visualizeBinarySearch() {
    let left = 0, right = binaryValues.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        drawBinaryArray(left, right, mid);
        await sleep(1000);

        if (binaryValues[mid] === targetValue) {
            alert(`Target ${targetValue} found at index ${mid}`);
            return;
        }
        binaryValues[mid] < targetValue ? (left = mid + 1) : (right = mid - 1);
    }

    alert(`Target ${targetValue} not found.`);
    drawBinaryArray(-1, -1, -1);
}

function drawBinaryArray(left, right, mid) {
    binaryCtx.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    const barWidth = binaryCanvas.width / binaryValues.length;

    binaryValues.forEach((val, idx) => {
        binaryCtx.fillStyle = idx === mid ? "yellow" : idx >= left && idx <= right ? "orange" : "purple";
        const barHeight = val * 10;
        binaryCtx.fillRect(idx * barWidth, binaryCanvas.height - barHeight, barWidth - 5, barHeight);
        binaryCtx.fillStyle = "black";
        binaryCtx.fillText(val, idx * barWidth + barWidth / 4, binaryCanvas.height - barHeight - 5);
    });
}

function clearBinarySearch() {
    if (binaryCanvas) {
        binaryCtx.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    }
    document.getElementById("binaryNumbersInput").value = "";
    document.getElementById("binaryTargetInput").value = "";
    binaryValues = [];
    targetValue = null;
}

// Utility Sleep Function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
