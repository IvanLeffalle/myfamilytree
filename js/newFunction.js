$(function () {
    // Function to toggle the visibility of child nodes
    function toggleMemberTree(e) {
        var children = $(this).find('> ul');
        if (children.is(":visible")) {
            children.hide('fast').removeClass('active');
        } else {
            children.show('fast').addClass('active');
        }
        e.stopPropagation();
    }

    // Hide all child nodes initially
    $('.genealogy-tree ul').hide();

    // Show the direct children of the root node
    $('.genealogy-tree > ul').show();

    // Show nodes that have the "active" class (can be used to pre-expand certain nodes)
    $('.genealogy-tree ul.active').show();

    // Add click event handler to the list items (tree nodes)
    $('.genealogy-tree li').on('click', toggleMemberTree);
  
   
    //texto que cambia
    const elts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2")
    };
    
    const texts = [
        "Leffalle",
        "Peralta",
        "Porto",
        "Muñoz",
        "Rodriguez",
        "Fragoso",
        "Guerra",
        "Dured",
    ];
    
    const morphTime = 1;
    const cooldownTime = 0.25;
    
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    
    function doMorph() {
        morph -= cooldown;
        cooldown = 0;
    
        let fraction = morph / morphTime;
    
        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }
    
        setMorph(fraction);
    }
    
    function setMorph(fraction) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }
    
    function doCooldown() {
        morph = 0;
    
        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";
    
        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
    }
    
    function animate() {
        requestAnimationFrame(animate);
    
        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;
    
        cooldown -= dt;
    
        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }
    
            doMorph();
        } else {
            doCooldown();
        }
    }
    
    animate();
});
    
// Get references to elements
const allImages = document.querySelectorAll(".images .img");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");
const zoomInBtn = lightbox.querySelector(".zoom-in");
const zoomOutBtn = lightbox.querySelector(".zoom-out");
const lightboxImg = lightbox.querySelector("img");

let currentZoom = 1;
let isDragging = false;
let prevX = 0;
let prevY = 0;

// Function to open the lightbox
const showLightbox = (img) => {
    lightboxImg.src = img;
    lightboxImg.style.transform = `scale(${currentZoom})`;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";

    // Attach the event listener for the "Esc" key press
    document.addEventListener("keydown", handleKeyPress);

    zoomInBtn.addEventListener("click", zoomIn);
    zoomOutBtn.addEventListener("click", zoomOut);
    lightboxImg.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", endDrag);

    // Check if the image is larger than the screen before enabling dragging
    const maxImageWidth = window.innerWidth / currentZoom;
    const maxImageHeight = window.innerHeight / currentZoom;

    if (lightboxImg.naturalWidth > maxImageWidth || lightboxImg.naturalHeight > maxImageHeight) {
        lightboxImg.style.cursor = "grab";
    } else {
        lightboxImg.style.cursor = "default";
    }
};

const zoomIn = () => {
    currentZoom += 0.1;
    updateZoom();
};

const zoomOut = () => {
    currentZoom -= 0.1;
    updateZoom();
};

const updateZoom = () => {
    lightboxImg.style.transform = `scale(${currentZoom})`;
};

const startDrag = (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
    lightboxImg.style.cursor = "grabbing";
};

const drag = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - prevX;
    const deltaY = e.clientY - prevY;

    lightboxImg.style.left = `${parseFloat(getComputedStyle(lightboxImg).left) + deltaX}px`;
    lightboxImg.style.top = `${parseFloat(getComputedStyle(lightboxImg).top) + deltaY}px`;

    prevX = e.clientX;
    prevY = e.clientY;
};

const endDrag = () => {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
};

// Function to close the lightbox
const closeLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
    zoomInBtn.removeEventListener("click", zoomIn);
    zoomOutBtn.removeEventListener("click", zoomOut);
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mouseup", endDrag);
    // Remove the event listener for the "Esc" key press
    document.removeEventListener("keydown", handleKeyPress);
};

// Event listener for the "Esc" key press
const handleKeyPress = (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
};

// Attach event listeners
allImages.forEach(img => {
    img.addEventListener("click", () => showLightbox(img.querySelector("img").src));
});

closeImgBtn.addEventListener("click", closeLightbox);

//end gallery//

var loader = document.getElementById("preloader");

// Set a timeout function to simulate a preloader
setTimeout(function() {
    loader.classList.add("hide"); // Add the 'hide' class to trigger the fade-out effect
}, 3000); // Change the duration (in milliseconds) as needed


function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

/**/
