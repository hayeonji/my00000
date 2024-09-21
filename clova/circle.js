document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image-item');

    images.forEach(image => {
        // Change image on hover
        image.addEventListener('mouseenter', function () {
            const originalSrc = image.style.backgroundImage;
            const hoverSrc = image.getAttribute('data-hover-src');
            image.style.backgroundImage = `url(${hoverSrc})`;
            
            // Change back to original on mouse leave
            image.addEventListener('mouseleave', function () {
                image.style.backgroundImage = originalSrc;
            });
        });

        // Make images draggable
        let isDragging = false;
        let offsetX, offsetY;

        image.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - image.offsetLeft;
            offsetY = e.clientY - image.offsetTop;
            image.style.zIndex = 1000;
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                image.style.left = `${e.clientX - offsetX}px`;
                image.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                image.style.zIndex = 1;
            }
        });
    });
});

