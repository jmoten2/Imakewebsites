```javascript
// ========================================
// QUESTIONNAIRE
// ========================================

const goal = document.getElementById("website-goal");
const pages = document.getElementById("page-count");
const style = document.getElementById("visual-style");
const features = document.getElementById("features");
const brief = document.getElementById("project-brief");


function updateBrief() {

    if (!goal || !pages || !style || !features || !brief) {
        return;
    }

    brief.value =
        "Website Goal: " + goal.value + "\n" +
        "Number of Pages: " + pages.value + "\n" +
        "Visual Style: " + style.value + "\n" +
        "Features: " + features.value;
}


if (goal) {
    goal.addEventListener("change", updateBrief);
}

if (pages) {
    pages.addEventListener("change", updateBrief);
}

if (style) {
    style.addEventListener("change", updateBrief);
}

if (features) {
    features.addEventListener("input", updateBrief);
}



// ========================================
// CONTACT / EMAIL
// ========================================

const sendEmail = document.getElementById("send-email");


if (sendEmail) {

    sendEmail.addEventListener("click", function () {

        const name =
            document.getElementById("contact-name").value.trim();

        const email =
            document.getElementById("contact-email").value.trim();

        const message =
            document.getElementById("contact-message").value.trim();


        if (name === "" || email === "" || message === "") {

            alert("Please fill out all fields.");

            return;
        }


        const subject =
            "Website Request from " + name;


        const body =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;


        window.location.href =
            "mailto:?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);

    });

}



// ========================================
// FAQ QUESTION
// ========================================

const submitQuestion =
    document.getElementById("submit-question");


if (submitQuestion) {

    submitQuestion.addEventListener("click", function () {

        const question =
            document.getElementById("new-question").value.trim();


        if (question === "") {

            alert("Please enter a question.");

            return;
        }


        alert("Thanks! Your question was submitted.");


        document.getElementById("new-question").value = "";

    });

}



// ========================================
// REVIEWS
// ========================================

const postReview =
    document.getElementById("post-review");


// Load reviews when the page opens
loadReviews();


if (postReview) {

    postReview.addEventListener("click", function () {

        const name =
            document.getElementById("review-name").value.trim();


        const rating =
            document.getElementById("review-rating").value;


        const review =
            document.getElementById("review-text").value.trim();


        // Check that the user entered everything
        if (name === "" || review === "") {

            alert("Please enter your name and review.");

            return;
        }


        // Get reviews already saved
        let reviews =
            JSON.parse(localStorage.getItem("reviews")) || [];


        // Add the new review
        reviews.push({

            name: name,

            rating: rating,

            review: review

        });


        // Save the reviews
        localStorage.setItem(
            "reviews",
            JSON.stringify(reviews)
        );


        // Clear the form
        document.getElementById("review-name").value = "";

        document.getElementById("review-rating").value = "5";

        document.getElementById("review-text").value = "";


        // Display the review immediately
        loadReviews();


        alert("Your review was posted!");

    });

}



// ========================================
// LOAD REVIEWS
// ========================================

function loadReviews() {

    const reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];


    const reviewsSection =
        document.getElementById("reviews");


    if (!reviewsSection) {
        return;
    }


    // Remove reviews already displayed
    const oldReviews =
        reviewsSection.querySelectorAll(".saved-review");


    oldReviews.forEach(function (review) {

        review.remove();

    });


    // Display every saved review
    reviews.forEach(function (item) {

        const reviewCard =
            document.createElement("div");


        reviewCard.className =
            "project-card saved-review";


        reviewCard.style.marginTop = "20px";


        reviewCard.innerHTML =

            "<h3>" +
            item.name +
            "</h3>" +

            "<p>Rating: " +
            item.rating +
            "/5 ⭐</p>" +

            "<p>" +
            item.review +
            "</p>";


        reviewsSection.appendChild(reviewCard);

    });

}



// ========================================
// SQUARE JUMP GAME
// ========================================

const gameArea =
    document.getElementById("game-area");

const player =
    document.getElementById("player");

const restartGame =
    document.getElementById("restart-game");


let jumping = false;


function jump() {

    if (jumping || !player) {
        return;
    }


    jumping = true;


    let position = 0;


    // Move up
    const up = setInterval(function () {

        position += 5;

        player.style.bottom = position + "px";


        if (position >= 100) {

            clearInterval(up);


            // Move down
            const down = setInterval(function () {

                position -= 5;

                player.style.bottom =
                    position + "px";


                if (position <= 0) {

                    clearInterval(down);

                    jumping = false;

                }

            }, 20);

        }

    }, 20);

}



// Spacebar jumps
document.addEventListener("keydown", function (event) {

    if (event.code === "Space") {

        event.preventDefault();

        jump();

    }

});



// Clicking the game also jumps
if (gameArea) {

    gameArea.addEventListener("click", function () {

        jump();

    });

}



// Restart game
if (restartGame) {

    restartGame.addEventListener("click", function () {

        player.style.bottom = "0px";

        jumping = false;

    });

}
```

