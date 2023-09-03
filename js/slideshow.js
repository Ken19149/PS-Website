const slideshowContainer = document.getElementById('slideshow-container');
const imageFolder = 'img/competition/'; // Replace with your folder path

function createImageElement(imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'slideshow-image';
    return img;
}

function loadImages() {
    fetchImagesFromFolder().then(images => {
        if (images.length === 0) {
            slideshowContainer.textContent = 'No images found.';
            return;
        }

        let currentIndex = 0;
        const imageCount = images.length;

        function showNextImage() {
            const currentImage = images[currentIndex];
            const imgElement = createImageElement(currentImage);
            slideshowContainer.innerHTML = '';
            slideshowContainer.appendChild(imgElement);

            currentIndex = (currentIndex + 1) % imageCount;

            setTimeout(showNextImage, 3000); // Change image every 3 seconds (adjust timing as needed)
        }

        showNextImage();
    });
}

async function fetchImagesFromFolder() {
    const response = await fetch(imageFolder);
    const text = await response.text();
    const matches = text.match(/href="([^"]+\.(jpg|jpeg|png|gif))"/g);

    if (matches) {
        return matches.map(match => {
            const fileName = match.match(/href="([^"]+\.(jpg|jpeg|png|gif))"/)[1];
            return `${imageFolder}${fileName}`;
        });
    } else {
        return [];
    }
}

loadImages();
