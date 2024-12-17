function toggleProblem(problemId) {
    const problemDetails = document.getElementById(problemId);
    if (problemDetails.style.display === "none" || !problemDetails.style.display) {
      problemDetails.style.display = "block"; // Show details
    } else {
      problemDetails.style.display = "none"; // Hide details
    }
  }
  