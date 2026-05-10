document.addEventListener('DOMContentLoaded', () => {
    // Envelope Interaction
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    
    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.toggle('open');
    });

    // Create Floating Particles
    const particlesContainer = document.getElementById('particles');
    const numParticles = 30;

    for (let i = 0; i < numParticles; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('petal');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 5; // 0s to 5s
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${animationDuration}s, ${animationDuration/2}s`;
        particle.style.animationDelay = `${delay}s, ${delay}s`;
        
        // Randomize color slightly for depth
        const hue = 350 + Math.random() * 20; // Pinks/Reds
        particle.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;

        particlesContainer.appendChild(particle);
        
        // Remove and recreate when animation ends to keep them going infinitely
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (animationDuration + delay) * 1000);
    }
    
    // Smooth scrolling for arrow
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
    });

    // Love Overlay Logic
    const jabeenBtn = document.getElementById('jabeenBtn');
    const overlay = document.getElementById('love-overlay');

    window.showPopup = function() {
        const questionBox = document.getElementById('questionBox');
        const popupPhoto = document.getElementById('popupPhoto');
        const bgMusic = document.getElementById('bgMusic');
        
        // Play the background music!
        bgMusic.volume = 0.4; // Slightly lower volume so it's pleasant
        bgMusic.play().catch(e => console.log("Audio couldn't auto-play"));

        questionBox.style.transition = 'opacity 0.3s ease';
        questionBox.style.opacity = '0';
        
        setTimeout(() => {
            questionBox.style.display = 'none';
            popupPhoto.style.display = 'flex';
            // Trigger reflow
            void popupPhoto.offsetWidth;
            popupPhoto.style.opacity = '1';
            popupPhoto.style.transform = 'scale(1)';
        }, 300);
    };

    window.closeOverlay = function() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    };

    function moveButton() {
        const box = document.querySelector('.love-question-box');
        const boxRect = box.getBoundingClientRect();
        
        if (jabeenBtn.style.position !== 'absolute') {
            jabeenBtn.style.position = 'absolute';
        }
        
        const maxX = boxRect.width - jabeenBtn.offsetWidth - 40;
        const maxY = boxRect.height - jabeenBtn.offsetHeight - 40;
        
        const randomX = Math.floor(Math.random() * maxX) + 20;
        const randomY = Math.floor(Math.random() * maxY) + 20;
        
        jabeenBtn.style.left = randomX + 'px';
        jabeenBtn.style.top = randomY + 'px';
    }

    document.addEventListener('mousemove', (e) => {
        // Only run if overlay is visible
        if (overlay.style.opacity === '0' || overlay.style.display === 'none') return;

        const btnRect = jabeenBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

        // Since the button is 250px wide (radius ~125px), trigger dodge when cursor is within 180px of center
        if (distance < 180) {
            moveButton();
        }
    });

    jabeenBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        moveButton();
    });

    // Photo Modal Logic
    const photoModal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalMessage = document.getElementById('modal-message');

    window.openPhotoModal = function(imgSrc, message) {
        modalImg.src = imgSrc;
        modalMessage.innerText = message;
        
        photoModal.style.display = 'flex';
        // Trigger reflow
        void photoModal.offsetWidth;
        photoModal.style.opacity = '1';
        photoModal.querySelector('.photo-modal-content').style.transform = 'scale(1)';
    };

    window.closePhotoModal = function() {
        photoModal.style.opacity = '0';
        photoModal.querySelector('.photo-modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            photoModal.style.display = 'none';
        }, 400);
    };

    // Close modal when clicking outside of it
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            closePhotoModal();
        }
    });
});
