document.addEventListener('DOMContentLoaded', () => {
  // Select all dropdown toggles
  document.querySelectorAll('.nav-item').forEach(item => {
    const dropdown = item.querySelector('.dropdown');

    // Ensure dropdown is hidden on page load
    dropdown.style.display = 'none';

    // Show dropdown on mouseenter
    item.addEventListener('mouseenter', () => {
      dropdown.style.display = 'block';
    });

    // Hide dropdown on mouseleave
    item.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with the class "toggle-title"
  const toggleTitles = document.querySelectorAll('.toggle-title');

  // Loop over each title and add an event listener
  toggleTitles.forEach(title => {
    title.addEventListener('click', function() {
      // Toggle the active class on the clicked title
      this.classList.toggle('active');
    });
  });
});

let canvas, ctx, values = [];

// Function to open Bubble Sort Tool
function startBubbleSort() {
    document.getElementById("bubbleSortContainer").style.display = "block";
    canvas = document.getElementById("bubbleSortCanvas");
    ctx = canvas.getContext("2d");
}

// Function to Run Bubble Sort with Visualization
function runBubbleSort() {
    const input = document.getElementById("numbersInput").value;
    values = input.split(',').map(Number).filter(n => !isNaN(n));
    if (values.length) {
        visualizeBubbleSort();
    } else {
        alert("Please enter valid numbers.");
    }
}

// Bubble Sort Visualization
async function visualizeBubbleSort() {
    for (let i = 0; i < values.length - 1; i++) {
        for (let j = 0; j < values.length - i - 1; j++) {
            drawArray(values, j, j + 1);
            if (values[j] > values[j + 1]) {
                [values[j], values[j + 1]] = [values[j + 1], values[j]];
                await sleep(500);
            }
        }
    }
    drawArray(values, -1, -1);
}

// Utility to Draw Array Bars
function drawArray(arr, idx1, idx2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / arr.length;

    arr.forEach((val, idx) => {
        ctx.fillStyle = (idx === idx1 || idx === idx2) ? "yellow" : "purple";
        ctx.fillRect(idx * barWidth, canvas.height - val * 10, barWidth - 5, val * 10);
    });
}

// Delay Function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
