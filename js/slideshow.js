let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-image');

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.opacity = '1'; // Fade in the image
        } else {
            slide.style.opacity = '0'; // Hide other images
        }
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

// Initial display
showSlide(slideIndex);

// Automatic slideshow
setInterval(nextSlide, 3000); // Change image every 3 seconds (adjust timing as needed)
