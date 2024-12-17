//Axel Cazorla
//Intermidiate Algorithm Logic

//Fibonacci Section
let fibCanvas, fibCtx, memo = {};

function runFibonacci() {
    const n = parseInt(document.getElementById("fibonacciInput").value);
    if (isNaN(n) || n < 1) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    // Initialize canvas
    fibCanvas = document.getElementById("fibonacciCanvas");
    fibCtx = fibCanvas.getContext("2d");
    memo = {}; // Reset memoization

    // Clear canvas and start visualization
    fibCtx.clearRect(0, 0, fibCanvas.width, fibCanvas.height);
    visualizeFibonacci(n);
}

async function visualizeFibonacci(n) {
    const fibValue = await calculateFibonacci(n);
    drawMemoTable(n); // Draw final memo table
    alert(`Fibonacci(${n}) = ${fibValue}`);
}

// Fibonacci with memoization and visualization
async function calculateFibonacci(n) {
    if (n in memo) {
        drawBar(n, memo[n], "green", "Reused");
        await sleep(500);
        return memo[n];
    }

    drawBar(n, null, "yellow", "Calculating");
    await sleep(500);

    if (n <= 2) {
        memo[n] = 1;
    } else {
        memo[n] = await calculateFibonacci(n - 1) + await calculateFibonacci(n - 2);
    }

    drawBar(n, memo[n], "purple", "Stored");
    await sleep(500);

    return memo[n];
}

// Function to draw bars for each step
function drawBar(n, value, color, text) {
    const barWidth = 40;
    const barHeight = value ? value * 10 : 10; // Height based on Fibonacci value
    const x = (n - 1) * barWidth; // Position bars by Fibonacci index

    fibCtx.clearRect(x, 0, barWidth, fibCanvas.height); // Clear previous bar
    fibCtx.fillStyle = color;
    fibCtx.fillRect(x, fibCanvas.height - barHeight, barWidth - 5, barHeight);

    // Display text
    fibCtx.fillStyle = "black";
    fibCtx.font = "10px Arial";
    fibCtx.fillText(`F(${n})`, x + 5, fibCanvas.height - barHeight - 5);
    if (value !== null) fibCtx.fillText(value, x + 5, fibCanvas.height - 15);
    fibCtx.fillText(text, x + 5, fibCanvas.height - 5);
}

// Function to draw the memoization table
function drawMemoTable(n) {
    let x = 10, y = 10;
    fibCtx.clearRect(0, 0, fibCanvas.width, fibCanvas.height); // Clear canvas
    fibCtx.font = "12px Arial";
    fibCtx.fillStyle = "black";

    fibCtx.fillText("Memoization Table:", x, y);
    y += 20;
    for (let i = 1; i <= n; i++) {
        fibCtx.fillText(`F(${i}) = ${memo[i]}`, x, y);
        y += 20;
    }
}

// Delay function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clear Fibonacci Canvas and Input
function clearFibonacci() {
    const canvas = document.getElementById("fibonacciCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("fibonacciInput").value = ""; // Clear input
    console.log("Fibonacci cleared.");
}


//LCS Portion
let lcsCanvas, lcsCtx;

const MAX_STRING_LENGTH = 10; // Limit the length of input strings
const CELL_SIZE = 50; // Adjusted size for better readability

function runLCS() {
    const str1 = document.getElementById("string1").value.toUpperCase();
    const str2 = document.getElementById("string2").value.toUpperCase();

    if (!str1 || !str2) {
        alert("Please enter both strings.");
        return;
    }

    if (str1.length > MAX_STRING_LENGTH || str2.length > MAX_STRING_LENGTH) {
        alert(`Input strings must be at most ${MAX_STRING_LENGTH} characters long.`);
        return;
    }

    // Initialize canvas
    lcsCanvas = document.getElementById("lcsCanvas");
    lcsCtx = lcsCanvas.getContext("2d");
    lcsCtx.clearRect(0, 0, lcsCanvas.width, lcsCanvas.height);

    // Run LCS calculation
    visualizeLCS(str1, str2);
}

async function visualizeLCS(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  // Resize canvas dynamically
  lcsCanvas.width = (n + 2) * CELL_SIZE;
  lcsCanvas.height = (m + 2) * CELL_SIZE;

  // Draw initial DP grid
  drawGrid(str1, str2, dp);

  // Fill DP table step-by-step
  for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
          if (str1[i - 1] === str2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1; // Match: increment value
              await drawCell(i, j, dp[i][j], "green", `Match: ${str1[i - 1]}`);
          } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Skip: take max of top/left
              await drawCell(i, j, dp[i][j], "yellow", "Skip");
          }
      }
  }

  // Reconstruct LCS and display
  const lcs = reconstructLCS(dp, str1, str2);
  alert(`The Longest Common Subsequence is: ${lcs}`);
}


function drawGrid(str1, str2, dp) {
    lcsCtx.font = "14px Arial";
    lcsCtx.textAlign = "center";
    lcsCtx.textBaseline = "middle";

    // Draw column headers
    for (let j = 0; j <= str2.length; j++) {
        lcsCtx.strokeRect(j * CELL_SIZE + CELL_SIZE, 0, CELL_SIZE, CELL_SIZE);
        if (j > 0) lcsCtx.fillText(str2[j - 1], j * CELL_SIZE + CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2);
    }

    // Draw row headers
    for (let i = 0; i <= str1.length; i++) {
        lcsCtx.strokeRect(0, i * CELL_SIZE + CELL_SIZE, CELL_SIZE, CELL_SIZE);
        if (i > 0) lcsCtx.fillText(str1[i - 1], CELL_SIZE / 2, i * CELL_SIZE + CELL_SIZE + CELL_SIZE / 2);
    }

    // Draw empty DP table
    for (let i = 0; i <= str1.length; i++) {
        for (let j = 0; j <= str2.length; j++) {
            lcsCtx.strokeRect(j * CELL_SIZE + CELL_SIZE, i * CELL_SIZE + CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

async function drawCell(i, j, value, color, text) {
  const x = j * CELL_SIZE + CELL_SIZE;
  const y = i * CELL_SIZE + CELL_SIZE;

  // Highlight the cell
  lcsCtx.fillStyle = color;
  lcsCtx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  lcsCtx.strokeStyle = "black";
  lcsCtx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

  // Display the value and label
  lcsCtx.fillStyle = "black";
  lcsCtx.font = "12px Arial";
  lcsCtx.textAlign = "center";
  lcsCtx.textBaseline = "middle";
  lcsCtx.fillText(value, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
  lcsCtx.fillText(text, x + CELL_SIZE / 2, y + CELL_SIZE - 5);

  await sleep(300);
}

function reconstructLCS(dp, str1, str2) {
    let i = str1.length, j = str2.length;
    let lcs = "";

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return lcs;
}
// Clear LCS Canvas and Inputs
function clearLCS() {
    const canvas = document.getElementById("lcsCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("string1").value = ""; // Clear inputs
    document.getElementById("string2").value = "";
    console.log("LCS cleared.");
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

