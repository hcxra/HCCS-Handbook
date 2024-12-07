// Toggle expandable container
function toggleContainer(id) {
    const content = document.getElementById(id);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
  
  // Rotating tips
  const tips = [
    "Start by building your LinkedIn profile.",
    "Follow up with contacts within 48 hours.",
    "Join tech meetups to expand your network.",
    "Include new skills, certifications, or achievements as you progress.",
    "A warm demeanor can make you more inviting to potential connections.",
    "People love sharing their knowledge—ask for guidance to create meaningful conversations.",
    "Alumni are often willing to help students or recent graduates from their alma mater.",
    "Staying updated on industry trends can give you great conversation starters during networking events.",
    "Instead of saying, 'Can you refer me?' try, 'What advice would you give someone applying for this role?'",
    "Prepare a 30-second elevator pitch."
  ];
  let tipIndex = 0;
  
  function rotateTips() {
    const tipElement = document.getElementById("tip");
    tipIndex = (tipIndex + 1) % tips.length;
    tipElement.textContent = tips[tipIndex];
  }
  
  setInterval(rotateTips, 5000);
  
  