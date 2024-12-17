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

document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the class "toggle-title"
    const toggleTitles = document.querySelectorAll('.toggle-title');

    // Loop over each title and add an event listener
    toggleTitles.forEach(title => {
        title.addEventListener('click', function () {
            // Toggle the active class on the clicked title
            this.classList.toggle('active');
        });
    });

    // -------------------------------
    // New Logic for Dynamic Script Loading
    // -------------------------------
    const scriptsLoaded = {}; // To track which scripts have been loaded

    // Function to dynamically load scripts
    function loadScript(scriptPath, callback) {
        if (!scriptsLoaded[scriptPath]) {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.defer = true;

            script.onload = () => {
                console.log(`${scriptPath} loaded successfully.`);
                if (callback) callback();
            };

            document.body.appendChild(script);
            scriptsLoaded[scriptPath] = true;
        } else if (callback) {
            callback();
        }
    }

    function toggleSection(sectionId, initializer) {
        const section = document.getElementById(sectionId);
    
        if (section) {
            const isVisible = section.style.display === 'block';
            section.style.display = isVisible ? 'none' : 'block';
    
            // Call initializer only when opening the section
            if (!isVisible && typeof initializer === 'function') {
                initializer();
            }
    
            // Clear canvases only when closing the section
            if (isVisible) {
                switch (sectionId) {
                    case 'bubbleSortContainer':
                        clearBubbleSort();
                        break;
                    case 'binarySearchContainer':
                        clearBinarySearch();
                        break;
                    case 'fibonacciContainer':
                        clearFibonacci();
                        break;
                    case 'lcsContainer':
                        clearLCS();
                        break;
                    case 'dijkstraContainer':
                        clearDijkstraCanvas();
                        break;

                }
            }
        }
    }
    
    // -------------------------------
    // Button Event Listeners for Visualizations
    // -------------------------------
    // Simple Algorithms: Bubble Sort & Binary Search
    document.getElementById('bubbleSortBtn')?.addEventListener('click', () => {
        loadScript('js/SimpleAlgo.js', () => {
            toggleSection('bubbleSortContainer');
        });
    });

    document.getElementById('binarySearchBtn')?.addEventListener('click', () => {
        loadScript('js/SimpleAlgo.js', () => {
            toggleSection('binarySearchContainer');
        });
    });

    // Intermediate Algorithms: Fibonacci & LCS
    document.getElementById('fibonacciBtn')?.addEventListener('click', () => {
        loadScript('js/IntermediateAlgo.js', () => {
            toggleSection('fibonacciContainer');
        });
    });

    document.getElementById('lcsBtn')?.addEventListener('click', () => {
        loadScript('js/IntermediateAlgo.js', () => {
            toggleSection('lcsContainer');
        });
    });

    // Advanced Algorithms: Dijkstra's Algorithm
    document.getElementById('dijkstraBtn')?.addEventListener('click', () => {
        loadScript('js/AdvancedAlgo.js', () => {
            toggleSection('dijkstraContainer');
            initializeDijkstra()
        });
    });
    document.getElementById('kruskalBtn')?.addEventListener('click', () => {
        loadScript('js/AdvancedAlgo.js', () => {
            toggleSection('kruskalCanvas');
        });
    });
    document.getElementById('dfsBtn')?.addEventListener('click', () => {
        loadScript('js/AdvancedAlgo.js', () => {
            toggleSection('dfsContainer');
            initializeDFS();
        });
    });

});
