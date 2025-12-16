let userName = '';
let flippedCardsCount = 0;
const totalCards = 3;

// --- 1. Name Pop-up and Initial State ---
function saveNameAndStart() {
    userName = document.getElementById('user-name-input').value.trim();
    
    if (userName) {
        // Update the greeting with the user's name
        document.getElementById('greeting').innerHTML = `Hey ${userName} ❤️! I have Something for youuuuuuuuu!!!!!!!!!!!!!!!!!!`;
        
        // Hide the pop-up and show the first content (Initial Letter)
        document.getElementById('name-popup').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('initial-letter-section').style.display = 'block';
    } else {
        alert('Please enter your name to continue!');
    }
}

// --- 2. Letter/Envelope Transition ---
function openEnvelope() {
    document.getElementById('initial-letter-section').style.display = 'none';
    document.getElementById('love-letter-section').style.display = 'block';
}

// --- Updated Envelope/Letter Transition ---
function openLoveLetter() {
    const letterSection = document.getElementById('love-letter-section');
    const envelope = letterSection.querySelector('.envelope'); // Get the envelope div
    const letterContent = document.getElementById('love-letter-text');
    const envelopeText = letterSection.querySelector('.envelope-text-overlay');

    // 1. Trigger the CSS flap animation
    envelope.classList.add('opened'); 
    
    // 2. Hide the text overlay immediately
    envelopeText.style.opacity = '0';
    
    // 3. Set the recipient name
    document.getElementById('letter-recipient-name').textContent = userName;
    letterContent.querySelector('.signature').innerHTML = `With all my love, Always yours, <span style="color:#ff69b4;">${userName}</span>`;

    // 4. Wait for the flap animation (0.5s) then reveal the letter content
    setTimeout(() => {
        letterContent.classList.add('open'); 
    }, 500); 

    // 5. Wait for the letter content reveal animation (1s) then show the button
    setTimeout(() => {
        letterContent.querySelector('button').style.display = 'block'; 
        // Optional: Completely hide the envelope container after everything opens
        envelope.style.display = 'none';
    }, 1500); 
}

// --- 3. Playlist Functionality ---
function showPlaylist() {
    document.getElementById('love-letter-section').style.display = 'none';
    document.getElementById('playlist-section').style.display = 'block';
}

function togglePlay(audioId, buttonElement) {
    const audio = document.getElementById(audioId);
    
    // Pause all other tracks and reset their buttons
    document.querySelectorAll('audio').forEach(a => {
        if (a.id !== audioId && !a.paused) {
            a.pause();
            document.querySelector(`[data-track="${a.id}"]`).textContent = '▶️';
        }
    });

    // Toggle the current track
    if (audio.paused) {
        audio.play();
        buttonElement.textContent = '⏸️';
    } else {
        audio.pause();
        buttonElement.textContent = '▶️';
    }
}

// --- NEW FUNCTION: VALIDATE MUSIC ---
function validateMusicAndShowCards() {
    let isPlaying = false;
    // Check if any audio tag is currently playing
    document.querySelectorAll('audio').forEach(a => {
        if (!a.paused) {
            isPlaying = true;
        }
    });

    if (isPlaying) {
        // Music is playing, go to next step
        showCards();
    } else {
        // Music is NOT playing, show alert
        alert("Please choose one music track with cute emoji 🎵🥺");
    }
}

// --- 4. Interactive Card Flip ---
function showCards() {
    // Note: We are NOT pausing music here anymore so it keeps playing in background
    document.getElementById('playlist-section').style.display = 'none';
    document.getElementById('cards-section').style.display = 'block';
}

function flipCard(cardElement, cardIndex) {
    const inner = cardElement.querySelector('.flip-card-inner');

    // Check if the card is already flipped
    if (!cardElement.classList.contains('flipped')) {
        // Only count the flip if it's the first time
        flippedCardsCount++;
        cardElement.classList.add('flipped');
        
        // Check if all cards are flipped
        if (flippedCardsCount === totalCards) {
            setTimeout(() => {
                document.getElementById('cards-unlocked-message').style.display = 'block';
            }, 800); 
        }
    } else {
        // Allow flipping back and forth after the initial reveal
        cardElement.classList.remove('flipped');
    }
}

// --- 5. Final Letter Sequence ---
function showFinalLetterPopup() {
    document.getElementById('cards-section').style.display = 'none';
    
    // Personalize the final letter
    document.getElementById('final-letter-name').textContent = userName;
    
    document.getElementById('final-letter-popup').style.display = 'flex';
}

function sealLetter() {
    const sealingMessage = document.getElementById('sealing-message');
    sealingMessage.style.display = 'block';

    // Simulate sealing delay
    setTimeout(() => {
        document.getElementById('final-letter-popup').style.display = 'none';
        document.getElementById('signed-name').textContent = userName;
        document.getElementById('sealed-letter-section').style.display = 'block';
    }, 1500);
}

// --- 6. NEW: Virtual Kiss & Surprise Reveal ---
function sendVirtualKiss() {
    // Show the full screen overlay with the falling heart
    const overlay = document.getElementById('kiss-overlay');
    overlay.style.display = 'flex';
    
    // Ensure the heart is visible and the reveal is hidden initially
    document.getElementById('falling-heart-container').style.display = 'block';
    document.getElementById('surprise-reveal').style.display = 'none';
}

function unlockSurprise() {
    // Hide the heart
    document.getElementById('falling-heart-container').style.display = 'none';
    
    // Show the Name + Teddy + Restart Button
    const revealDiv = document.getElementById('surprise-reveal');
    revealDiv.style.display = 'block';
    
    // Set the Name
    document.getElementById('reveal-name-text').textContent = userName;
}


// --- Initial Setup ---
// We start by hiding all main content and showing only the name popup
window.onload = function() {
    document.getElementById('name-popup').style.display = 'flex';
    document.getElementById('initial-letter-section').style.display = 'none';
    document.getElementById('love-letter-section').style.display = 'none';
    document.getElementById('playlist-section').style.display = 'none';
    document.getElementById('cards-section').style.display = 'none';
    document.getElementById('sealed-letter-section').style.display = 'none';
    document.getElementById('kiss-overlay').style.display = 'none'; // Hide overlay

    // Hide letter content initially
    document.getElementById('love-letter-text').classList.remove('open');
    document.getElementById('love-letter-text').querySelector('button').style.display = 'none';
};