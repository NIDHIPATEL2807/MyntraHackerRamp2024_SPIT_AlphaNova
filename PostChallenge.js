// Function to clear local storage
function clearLocalStorage() {
    localStorage.removeItem('challenges');
}

// Call the function to clear older challenges
clearLocalStorage();

// Sample data to simulate submitted challenges
let challenges = JSON.parse(localStorage.getItem('challenges')) || [];

const challengeForm = document.getElementById('challengeForm');
const challengesContainer = document.getElementById('challengesContainer');

challengeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const challengeName = document.getElementById('challengeName').value;
    const challengeDescription = document.getElementById('challengeDescription').value;
    const challengeImage = document.getElementById('challengeImage').files[0];

    // Simulate submission (you can replace this with actual server-side logic)
    const newChallenge = {
        id: challenges.length + 1,
        name: challengeName,
        description: challengeDescription,
        imageUrl: challengeImage ? URL.createObjectURL(challengeImage) : '',
        comments: []
    };

    challenges.push(newChallenge);

    // Save to local storage
    localStorage.setItem('challenges', JSON.stringify(challenges));

    // Clear form fields
    challengeForm.reset();
    document.getElementById('previewChallengeImage').style.display = 'none';

    // Update UI
    displayChallenges();
});

function displayChallenges() {
    // Sort challenges based on total upvotes of comments
    challenges.sort((a, b) => {
        const upvotesA = a.comments.reduce((total, comment) => total + comment.upvotes, 0);
        const upvotesB = b.comments.reduce((total, comment) => total + comment.upvotes, 0);
        return upvotesB - upvotesA;
    });

    challengesContainer.innerHTML = '';

    challenges.forEach(challenge => {
        const challengeElement = document.createElement('div');
        challengeElement.classList.add('challenge-item');

        challengeElement.innerHTML = `
            <h3>${challenge.name}</h3>
            <p>${challenge.description}</p>
            <img src="${challenge.imageUrl}" alt="Challenge Image">
            <div class="comments">
                <h4>Comments:</h4>
                <ul id="commentsList_${challenge.id}"></ul>
                <form id="commentForm_${challenge.id}">
                    <input type="text" id="commentText_${challenge.id}" placeholder="Add a comment...">
                    <input type="url" id="commentUrl_${challenge.id}" placeholder="Myntra URL">
                    <button type="submit">Post Comment</button>
                </form>
            </div>
            <div class="leaderboard">
                <h4>Leaderboard:</h4>
                <ol id="leaderboardList_${challenge.id}"></ol>
            </div>
        `;

        const commentForm = challengeElement.querySelector(`#commentForm_${challenge.id}`);
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const commentText = document.getElementById(`commentText_${challenge.id}`).value;
            const commentUrl = document.getElementById(`commentUrl_${challenge.id}`).value;

            if (commentText.trim() !== '') {
                const newComment = {
                    text: commentText,
                    url: commentUrl,
                    upvotes: 0
                };

                challenge.comments.push(newComment);
                localStorage.setItem('challenges', JSON.stringify(challenges));
                displayComments(challenge.id);
            }

            commentForm.reset();
        });

        challengesContainer.appendChild(challengeElement);
        displayComments(challenge.id);
    });
}

function displayComments(challengeId) {
    const commentsList = document.getElementById(`commentsList_${challengeId}`);
    const leaderboardList = document.getElementById(`leaderboardList_${challengeId}`);

    commentsList.innerHTML = '';
    leaderboardList.innerHTML = '';

    const challenge = challenges.find(challenge => challenge.id === challengeId);

    // Sort comments based on upvotes (descending)
    challenge.comments.sort((a, b) => b.upvotes - a.upvotes);

    challenge.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `
            <p>${comment.text}</p>
            <a href="${comment.url}" target="_blank">${comment.url}</a>
            <button class="upvote-btn">Upvote</button>
            <span class="upvotes-count">${comment.upvotes}</span>
        `;

        const upvoteButton = commentItem.querySelector('.upvote-btn');
        upvoteButton.addEventListener('click', function() {
            comment.upvotes++;
            localStorage.setItem('challenges', JSON.stringify(challenges));
            displayComments(challengeId);
        });

        commentsList.appendChild(commentItem);
    });

    // Display top comments in the leaderboard
    challenge.comments.slice(0, 3).forEach(comment => {
        const leaderboardItem = document.createElement('li');
        leaderboardItem.textContent = `${comment.text} - Upvotes: ${comment.upvotes}`;
        leaderboardList.appendChild(leaderboardItem);
    });
}

// Initial display of challenges
displayChallenges();








