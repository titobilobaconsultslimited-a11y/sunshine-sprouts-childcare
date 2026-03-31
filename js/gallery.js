/* ============================================
   GALLERY LIGHTBOX FUNCTIONALITY
   Image filtering and lightbox display
   ============================================ */

let currentImageIndex = 0;
let filteredImages = [];
let allImages = [];

// ============================================
// 1. INITIALIZE GALLERY
// ============================================
function initGallery() {
  allImages = Array.from(document.querySelectorAll('.gallery-item'));
  filteredImages = allImages;
  setupEventListeners();
}

// ============================================
// 2. GALLERY FILTERING
// ============================================
function setupEventListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Filter button click handler
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter images
      if (filterValue === 'all') {
        filteredImages = allImages;
        galleryItems.forEach((item) => {
          item.style.display = 'block';
          item.classList.add('fade-in');
        });
      } else {
        filteredImages = allImages.filter((item) =>
          item.getAttribute('data-category').includes(filterValue)
        );

        galleryItems.forEach((item) => {
          if (item.getAttribute('data-category').includes(filterValue)) {
            item.style.display = 'block';
            item.classList.add('fade-in');
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });

  // Gallery item click handler
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
}

// ============================================
// 3. LIGHTBOX FUNCTIONALITY
// ============================================
function openLightbox(index) {
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');

  if (!lightbox) return;

  // Get visible images only
  const visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
    .filter((item) => item.style.display !== 'none');

  if (visibleImages.length === 0) return;

  // Find the actual index in visible images
  const clickedItem = allImages[index];
  currentImageIndex = visibleImages.indexOf(clickedItem);

  displayLightboxImage(visibleImages);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function displayLightboxImage(visibleImages) {
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');

  if (!visibleImages[currentImageIndex]) return;

  const currentItem = visibleImages[currentImageIndex];
  const imageSrc = currentItem.getAttribute('data-image') || currentItem.getAttribute('data-src') || currentItem.style.backgroundImage;
  const caption = currentItem.getAttribute('data-caption') || currentItem.getAttribute('alt') || '';

  // Handle background images (gradient placeholders)
  if (imageSrc && imageSrc.includes('url')) {
    // For placeholder divs with background gradients
    lightboxImage.innerHTML = `<div style="width: 100%; height: 100%; ${imageSrc}; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: 600;">${caption}</div>`;
  } else {
    // For actual images
    lightboxImage.innerHTML = `<img src="${imageSrc}" alt="${caption}" loading="lazy">`;
  }

  lightboxCaption.textContent = caption;
  updateLightboxNavigation(visibleImages.length);
}

function updateLightboxNavigation(totalImages) {
  const counter = document.querySelector('.lightbox-counter');
  if (counter) {
    counter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
  }
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function nextImage() {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (!lightbox || !lightbox.classList.contains('active')) return;

  const visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
    .filter((item) => item.style.display !== 'none');

  currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
  displayLightboxImage(visibleImages);
}

function prevImage() {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (!lightbox || !lightbox.classList.contains('active')) return;

  const visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
    .filter((item) => item.style.display !== 'none');

  currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
  displayLightboxImage(visibleImages);
}

// ============================================
// 4. EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Lightbox close button
  const closeBtn = document.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Lightbox navigation buttons
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', prevImage);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextImage);
  }

  // Initialize gallery
  initGallery();
});

// ============================================
// 5. KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  const lightbox = document.querySelector('.lightbox-overlay');
  
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  }
});

// ============================================
// 6. CLICK OUTSIDE TO CLOSE
// ============================================
document.addEventListener('click', (e) => {
  const lightbox = document.querySelector('.lightbox-overlay');
  
  if (!lightbox) return;
  
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// ============================================
// 7. SWIPE SUPPORT FOR MOBILE
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (lightbox && lightbox.classList.contains('active')) {
    touchStartX = e.changedTouches[0].screenX;
  }
}, false);

document.addEventListener('touchend', (e) => {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (!lightbox || !lightbox.classList.contains('active')) return;
  
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left, show next image
      nextImage();
    } else {
      // Swiped right, show previous image
      prevImage();
    }
  }
}

// ============================================
// 8. VIDEO PLACEHOLDER FUNCTIONALITY
// ============================================
function initVideoPlaceholders() {
  const videoTiles = document.querySelectorAll('.video-tile');

  videoTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const videoUrl = tile.getAttribute('data-video');
      if (videoUrl) {
        openVideoLightbox(videoUrl);
      }
    });
  });
}

function openVideoLightbox(videoUrl) {
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');

  if (!lightbox) return;

  // Create iframe for video
  lightboxImage.innerHTML = `<iframe width="100%" height="100%" src="${videoUrl}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  
  lightboxCaption.textContent = 'NobleNest Daycare Center Video';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Hide navigation for videos
  const navButtons = document.querySelectorAll('.lightbox-nav');
  navButtons.forEach((btn) => (btn.style.display = 'none'));
}

document.addEventListener('DOMContentLoaded', () => {
  initVideoPlaceholders();
});

// ============================================
// 9. LAZY LOADING
// ============================================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.hasAttribute('data-src')) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);
