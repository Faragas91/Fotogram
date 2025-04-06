let allImages = document.getElementsByClassName("picture__images");
let overlay = document.getElementById("overlay");
let currentIndex = 0;
let makePictureBigger = true;

// Iterates through all images
for (let i = 0; i < allImages.length; i++) {
    let image = allImages[i];
        image.addEventListener('click', (event) => {
          
        // This condition prevent to click more than ones the biggerImage
        if (makePictureBigger) {
            // Hide all images and overlay
            hideImage();
            // Enlarge the clicked image
            biggerImage(image);
            // Set the current index to the new index
            currentIndex = i;
            // Set the variable to false to prevent to click more than ones 
            makePictureBigger = false;
        }
    });
}

// Main Function to enlarge the clicked image
function biggerImage(image) {
    image.style.display = 'flex';
    image.classList.add("image-enlarged");
    image.style.zIndex = "100";
    overlay.style.display = "block";


    // Function for the Buttons
    createNextButtonRight(image);
    createNextButtonLeft(image);
    createCloseButton(image);
}

// Create the RightButton on the Image
function createNextButtonRight(image) {
    const nextButtonRight = document.createElement("img");
    nextButtonRight.src = "../../material_symbols/arrow_right.png";
    nextButtonRight.className = "next__button-right";
    
    image.parentNode.appendChild(nextButtonRight);

    nextButtonRight.addEventListener("click", () => {
        removeEnlargedElements(image, nextButtonRight);
        nextImageRight();
    });
}

// Create the LeftButton on the Image
function createNextButtonLeft(image) {
    const nextButtonLeft = document.createElement("img");
    nextButtonLeft.src = "../../material_symbols/arrow_left.png";
    nextButtonLeft.className = "next__button-left";

    image.parentNode.appendChild(nextButtonLeft);

    nextButtonLeft.addEventListener("click", () => {
        removeEnlargedElements(image, nextButtonLeft);
        image.classList.add("pic");
        nextImageLeft();
    });
}

// Create the CloseButton on the Image
function createCloseButton(image) {
    const closeButton = document.createElement("img");
    closeButton.src = "../../material_symbols/close.png";
    closeButton.className = "close__button";
    closeButton.style.zIndex = "100";
    
    image.parentNode.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
      image.classList.remove("image-enlarged");
      image.classList.add("picture__image");
      removeEnlargedElements(image, closeButton);
      showAllImage();
      makePictureBigger = true;
    });
}

// Function to remove all Buttons on the Image
function removeEnlargedElements(image) {
    image.classList.remove("image-enlarged"); 
    image.classList.add("picture__image");
    image.style.display = "none";

    // Collects all classes from the buttons and then removes them
    const buttons = image.parentNode.querySelectorAll('.next__button-right, .next__button-left, .close__button');
    buttons.forEach(button => button.parentNode.removeChild(button));
}

// Hide all pictures and the overlay
function hideImage() {
    for (let i = 0; i < allImages.length; i++) {
      allImages[i].style.display = "none";
    }
    overlay.style.display = "none";
}

// Show all pictures again after the overlay is closed
function showAllImage() {
    for (let i = 0; i < allImages.length; i++) {
      allImages[i].style.display = "flex";
      allImages[i].classList.add("picture__images");
    }
    overlay.style.display = "none";
}

// Function to navigate to the next image when the "next" button is clicked
function nextImageRight() {
    currentIndex++;
    if (currentIndex >= allImages.length) {
      currentIndex = 0;
    }
    const nextImage = allImages[currentIndex];
    biggerImage(nextImage);   
}

// Function to navigate to the previous image when the "previous" button is clicked
function nextImageLeft() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = allImages.length -1;
    }
    const nextImage = allImages[currentIndex];
    biggerImage(nextImage);
}

// Function to toggle the overlay
function toggleOverlay() {
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.toggle("d_on");
}