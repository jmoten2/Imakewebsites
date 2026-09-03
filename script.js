```javascript
// ==========================================
// PROFILE PHOTO / OWNER MODE
// ==========================================

const profileImage = document.getElementById("profile-image");
const ownerControls = document.getElementById("owner-controls");
const profileUpload = document.getElementById("profile-upload");
const removeProfilePhoto = document.getElementById("remove-profile-photo");

const defaultProfileImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><rect width='100%' height='100%' fill='%23120a0a'/></svg>";


// Load saved profile picture
const savedProfileImage = localStorage.getItem("profileImage");

if (savedProfileImage) {
  profileImage.src = savedProfileImage;
  removeProfilePhoto.hidden = false;
}


// Owner mode with Ctrl + Shift + E
document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    event.shiftKey &&
    event.key.toLowerCase() === "e"
  ) {
    event.preventDefault();

    if (ownerControls.hidden) {
      ownerControls.hidden = false;
      ownerControls.setAttribute("aria-hidden", "false");
      ownerControls.style.display = "flex";
    } else {
      ownerControls.hidden = true;
      ownerControls.setAttribute("aria-hidden", "true");
    }
  }
});


// Change profile photo
profileUpload.addEventListener("change", function () {
  const file = profileUpload.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageData = event.target.result;

    profileImage.src = imageData;

    localStorage.setItem("profileImage", imageData);

    removeProfilePhoto.hidden = false;
  };

  reader.readAsDataURL(file);
});


// Remove profile photo
removeProfilePhoto.addEventListener("click", function () {
  profileImage.src = defaultProfileImage;

  localStorage.removeItem("profileImage");

  removeProfilePhoto.hidden = true;

  profileUpload.value = "";
});


// ==========================================
// PORTFOLIO IMAGE MODAL
// ==========================================

function openModal(imageSource) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-img");

  modalImage.src = imageSource;

  modal.style.display = "flex";
}


function closeModal() {
  const modal = document.getElementById("image-modal");

  modal.style.display = "none";
}


// Prevent clicking the image itself from closing the modal
document
  .getElementById("modal-img")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });


// ==========================================
// WEBSITE QUESTIONNAIRE
// ==========================================

function updateBriefBox() {
  const goal = document.getElementById("q-goal").value;
  const pages = document.getElementById("q-pages").value;
  const style = document.getElementById("q-style").value;
  const features = document.getElementById("q-features").value;

  const goalText = goal.trim()
    ? goal
    : "Not specified yet";

  const styleText = style.trim()
    ? style
    : "Not specified yet";

  const featuresText = features.trim()
    ? features
    : "None specified yet";

  const brief =
    "1. Main Goal: " +
    goalText +
    "\n" +
    "2. Pages Needed: " +
    pages +
    "\n" +
    "3. Visual Style: " +
    styleText +
    "\n" +
    "4. Features Needed: " +
    featuresText;

  document.getElementById("brief-summary-text").textContent = brief;
}


// ==========================================
// CONTACT FORM
// ==========================================

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  const subject = "Website Project Request from " + name;

  const body =
    "Name: " +
    name +
    "\n" +
    "Email: " +
    email +
    "\n\n" +
    "Project Details:\n" +
    message;

  const mailto =
    "mailto:jmoten2@charlotte.edu" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  window.location.href = mailto;
}


// ==========================================
// FAQ
// ==========================================

function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const symbol = button.querySelector("span");

  answer.classList.toggle("show");

  if (answer.classList.contains("show")) {
    symbol.textContent = "-";
  } else {
    symbol.textContent = "+";
  }
}


// ==========================================
// SUBMIT A NEW FAQ QUESTION
// ==========================================

function submitFaq(event) {
  event.preventDefault();

  const input = document.getElementById("faq-input");
  const question = input.value.trim();

  if (!question) {
    return;
  }

  const faqList = document.getElementById("faq-list");

  const faqItem = document.createElement("div");
  faqItem.className = "faq-item";

  const questionButton = document.createElement("button");
  questionButton.className = "faq-question";
  questionButton.type = "button";

  const questionNumber =
    faqList.querySelectorAll(".faq-item").length + 1;

  questionButton.innerHTML =
    questionNumber +
    ". " +
    escapeHtml(question) +
    "<span>+</span>";

  questionButton.onclick = function () {
    toggleFaq(questionButton);
  };

  const answer = document.createElement("div");
  answer.className = "faq-answer";
  answer.textContent =
    "Thank you for your question! I will answer this question soon.";

  faqItem.appendChild(questionButton);
  faqItem.appendChild(answer);

  faqList.appendChild(faqItem);

  input.value = "";

  alert("Your question has been submitted!");
}


// ==========================================
// REVIEWS
// ==========================================

function addReview(event) {
  event.preventDefault();

  const name = document.getElementById("reviewer-name").value.trim();
  const rating = document.getElementById("reviewer-rating").value;
  const comment = document
    .getElementById("reviewer-comment")
    .value.trim();

  if (!name || !comment) {
    return;
  }

  const review = {
    name: name,
    rating: rating,
    comment: comment,
    date: new Date().toLocaleDateString()
  };

  const reviews =
    JSON.parse(localStorage.getItem("reviews")) || [];

  reviews.push(review);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  displayReviews();

  document.getElementById("review-form").reset();

  alert("Your review has been posted!");
}


// Display saved reviews
function displayReviews() {
  const container =
    document.getElementById("reviews-container");

  container.innerHTML = "";

  const reviews =
    JSON.parse(localStorage.getItem("reviews")) || [];

  reviews.forEach(function (review) {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    const reviewHeader = document.createElement("div");
    reviewHeader.className = "review-header";

    const reviewName = document.createElement("div");
    reviewName.className = "review-name";
    reviewName.textContent = review.name;

    const reviewStars = document.createElement("div");
    reviewStars.className = "review-stars";
    reviewStars.textContent = review.rating;

    reviewHeader.appendChild(reviewName);
    reviewHeader.appendChild(reviewStars);

    const reviewComment = document.createElement("p");
    reviewComment.textContent = review.comment;

    const reviewDate = document.createElement("div");
    reviewDate.className = "review-date";
    reviewDate.textContent = review.date;

    reviewCard.appendChild(reviewHeader);
    reviewCard.appendChild(reviewComment);
    reviewCard.appendChild(reviewDate);

    container.appendChild(reviewCard);
  });
}


// ==========================================
// SECURITY HELPER
// ==========================================

function escapeHtml(text) {
  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


// Load reviews when page opens
displayReviews();


// ==========================================
// FOOTER YEAR
// ==========================================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ==========================================
// SQUARE JUMP GAME
// ==========================================

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let player;
let obstacles;
let score;
let gameSpeed;
let gameRunning;
let gameOver;
let gameLoop;


function startGame() {
  player = {
    x: 50,
    y: 150,
    width: 25,
    height: 25,
    velocityY: 0,
    jumping: false
  };

  obstacles = [];

  score = 0;

  gameSpeed = 3;

  gameRunning = true;

  gameOver = false;

  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
  }

  gameLoop = requestAnimationFrame(updateGame);
}


function jump() {
  if (!gameRunning) {
    return;
  }

  if (!player.jumping) {
    player.velocityY = -10;
    player.jumping = true;
  }
}


function createObstacle() {
  const obstacle = {
    x: canvas.width,
    y: 175,
    width: 20,
    height: 25
  };

  obstacles.push(obstacle);
}


function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}


let obstacleTimer = 0;


function updateGame() {
  if (!gameRunning) {
    drawGame();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player gravity
  player.velocityY += 0.5;

  player.y += player.velocityY;

  // Ground
  if (player.y >= 150) {
    player.y = 150;
    player.velocityY = 0;
    player.jumping = false;
  }

  // Create obstacles
  obstacleTimer++;

  if (obstacleTimer > 100) {
    createObstacle();
    obstacleTimer = 0;
  }

  // Move obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= gameSpeed;

    if (checkCollision(player, obstacles[i])) {
      gameRunning = false;
      gameOver = true;
    }

    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Increase speed
  if (score > 0 && score % 5 === 0) {
    gameSpeed = 3 + score * 0.1;
  }

  drawGame();

  if (gameRunning) {
    gameLoop = requestAnimationFrame(updateGame);
  }
}


function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ground
  ctx.fillStyle = "#dc2626";
  ctx.fillRect(0, 180, canvas.width, 2);

  // Player
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  // Obstacles
  ctx.fillStyle = "#dc2626";

  obstacles.forEach(function (obstacle) {
    ctx.fillRect(
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );
  });

  // Score
  ctx.fillStyle = "#ffffff";
  ctx.font = "16px Fira Code";
  ctx.fillText("Score: " + score, 10, 25);

  // Game over
  if (gameOver) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Fira Code";
    ctx.fillText(
      "GAME OVER",
      125,
      90
    );

    ctx.font = "14px Fira Code";
    ctx.fillText(
      "Press Restart",
      140,
      115
    );
  }
}


// Keyboard controls
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});


// Mouse / click controls
canvas.addEventListener("click", function () {
  jump();
});


// Restart button
function resetGame() {
  startGame();
}


// Start the game
startGame();
```


