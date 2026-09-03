```javascript
// ========================================
// WEBSITE QUESTIONNAIRE
// ========================================

// Get the questionnaire elements
const websiteGoal = document.getElementById("website-goal");
const pageCount = document.getElementById("page-count");
const visualStyle = document.getElementById("visual-style");
const features = document.getElementById("features");
const projectBrief = document.getElementById("project-brief");

// Update the project brief
function updateProjectBrief() {

  let goal = websiteGoal.value;

  let pages = pageCount.value;

  let style = visualStyle.value;

  let featureList = features.value;

  // If nothing was entered, show default text
  if (goal === "") {
    goal = "Not specified yet";
  }

  if (style === "") {
    style = "Not specified yet";
  }

  if (featureList === "") {
    featureList = "None specified yet";
  }

  // Update the page
  projectBrief.innerHTML =
    "1. Main Goal: " + goal + "<br>" +
    "2. Pages Needed: " + pages + "<br>" +
    "3. Visual Style: " + style + "<br>" +
    "4. Features Needed: " + featureList;
}


// Update the brief whenever the user types
websiteGoal.addEventListener("input", updateProjectBrief);

pageCount.addEventListener("change", updateProjectBrief);

visualStyle.addEventListener("input", updateProjectBrief);

features.addEventListener("input", updateProjectBrief);


// ========================================
// SEND EMAIL
// ========================================

const sendEmailButton = document.getElementById("send-email");

sendEmailButton.addEventListener("click", function() {

  const name = document.getElementById("contact-name").value;

  const email = document.getElementById("contact-email").value;

  const message = document.getElementById("contact-message").value;

  // Check if required information was entered
  if (name === "" || email === "" || message === "") {
    alert("Please fill out your name, email, and project details.");
    return;
  }

  // Create the email
  const subject = "Website Project Request from " + name;

  const body =
    "Name: " + name + "\n" +
    "Email: " + email + "\n\n" +
    "Project Details:\n" +
    message;

  // Opens the user's email program
  window.location.href =
    "mailto:?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
});


// ========================================
// SUBMIT QUESTION
// ========================================

const submitQuestionButton =
  document.getElementById("submit-question");

submitQuestionButton.addEventListener("click", function() {

  const question =
    document.getElementById("new-question").value;

  if (question === "") {
    alert("Please type a question first.");
    return;
  }

  alert("Thanks! Your question was submitted.");

  document.getElementById("new-question").value = "";
});


// ========================================
// CLIENT REVIEWS
// ========================================

const postReviewButton =
  document.getElementById("post-review");

postReviewButton.addEventListener("click", function() {

  const name =
    document.getElementById("review-name").value;

  const rating =
    document.getElementById("review-rating").value;

  const review =
    document.getElementById("review-text").value;

  if (name === "" || review === "") {
    alert("Please enter your name and review.");
    return;
  }

  // Create a new review
  const reviewBox = document.createElement("div");

  reviewBox.className = "project-card";

  reviewBox.style.marginTop = "2rem";

  reviewBox.innerHTML =
    "<h3>" + name + "</h3>" +
    "<p>" + rating + "</p>" +
    "<p>" + review + "</p>";

  // Add review to the Reviews section
  document.getElementById("reviews").appendChild(reviewBox);

  // Clear the form
  document.getElementById("review-name").value = "";

  document.getElementById("review-text").value = "";

  alert("Your review has been posted!");
});


// ========================================
// SQUARE JUMP GAME
// ========================================

// Get the restart button
const restartGameButton =
  document.getElementById("restart-game");

// Create the game area
const gameArea = document.createElement("div");

gameArea.style.width = "100%";
gameArea.style.height = "250px";
gameArea.style.background = "#171717";
gameArea.style.border = "2px solid #262626";
gameArea.style.borderRadius = "10px";
gameArea.style.position = "relative";
gameArea.style.overflow = "hidden";
gameArea.style.marginBottom = "1rem";

// Create the player
const player = document.createElement("div");

player.style.width = "40px";
player.style.height = "40px";
player.style.background = "#dc2626";
player.style.position = "absolute";
player.style.bottom = "0";
player.style.left = "50px";
player.style.borderRadius = "5px";

// Add game area to the page
const gameSection = document.getElementById("game");

gameSection.insertBefore(gameArea, gameSection.querySelector("div"));

gameArea.appendChild(player);


// ========================================
// GAME VARIABLES
// ========================================

let isJumping = false;

let jumpHeight = 120;


// ========================================
// JUMP FUNCTION
// ========================================

function jump() {

  if (isJumping) {
    return;
  }

  isJumping = true;

  let position = 0;

  // Move up
  const upInterval = setInterval(function() {

    position += 5;

    player.style.bottom = position + "px";

    if (position >= jumpHeight) {

      clearInterval(upInterval);

      // Move back down
      const downInterval = setInterval(function() {

        position -= 5;

        player.style.bottom = position + "px";

        if (position <= 0) {

          clearInterval(downInterval);

          player.style.bottom = "0px";

          isJumping = false;
        }

      }, 20);

    }

  }, 20);
}


// ========================================
// CONTROLS
// ========================================

// Spacebar
document.addEventListener("keydown", function(event) {

  if (event.code === "Space") {

    event.preventDefault();

    jump();
  }

});


// Click to jump
gameArea.addEventListener("click", function() {

  jump();

});


// Restart game
restartGameButton.addEventListener("click", function() {

  player.style.bottom = "0px";

  isJumping = false;

});
```
