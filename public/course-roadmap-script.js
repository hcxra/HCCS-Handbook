document.addEventListener('DOMContentLoaded', () => {
  // Degree Map Collapse Logic
  document.querySelectorAll('.semester-block').forEach(block => {
    block.addEventListener('click', () => {
      const courseList = block.querySelector('ul');
      courseList.style.display =
        courseList.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Remove old dropdown logic for navigation bar
  // The dropdown behavior is now entirely handled by CSS.

  // Quiz Logic
  document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get the selected field
    const field = document.getElementById('field').value;

    // Recommendations for each field
    const recommendations = {
      fullstack: [
        "CS 39535: UI/UX Design",
        "CS 39537: Intro to APIs",
        "CS 39548: Practical Web Development",
        "CS 39549: Agile Software Development",
      ],
      datascience: [
        "CS 39542: Intro to Data Science",
        "CS 39543: Intro to Data Mining",
        "CS 39579: Data Visualization",
        "CS 49376: Big Data Technology",
      ],
      cybersecurity: [
        "CS 39582: Computer Forensics",
        "CS 39539: Intro to Cryptography",
        "CS 49375: Network Security",
        "CS 39598: Intro to Cyber Risk",
      ],
      gamedev: [
        "CS 39541: Basics of Game Engines",
        "CS 39545: VR, AR, Mixed Reality",
        "CS 39594: Advanced Visual Tools",
        "CS 39597: iOS Development",
      ],
      ai: [
        "CS 350: Artificial Intelligence",
        "CS 353: Machine Learning",
        "CS 49377: Deep Learning",
        "CS 49369: Computer Vision",
      ],
    };

    // Get recommendations for the selected field
    const selectedRecommendations = recommendations[field];

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block'; // Show the results container
    resultsDiv.innerHTML = `
      <h3>Recommended Electives for ${field.replace(/^\w/, (c) => c.toUpperCase())}</h3>
      <ul>
        ${selectedRecommendations.map((course) => `<li>${course}</li>`).join('')}
      </ul>
    `;
  });
});



  
  