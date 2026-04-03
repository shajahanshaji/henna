// Initialize AOS Animation Library
AOS.init({
  duration: 600,
  once: true,
  offset: 80,
  easing: 'ease-out-quad',
  disable: window.innerWidth < 768 ? 'phone' : false
});

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);
});

// Custom Cursor - Only on desktop
if (window.innerWidth > 768) {
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      cursorFollower.style.transform = `translate(${e.clientX - 22}px, ${e.clientY - 22}px)`;
    });

    const hoverElements = document.querySelectorAll('a, button, .product-card, .service-item, .gallery-item, .insta-post');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = `scale(1.8)`;
        cursorFollower.style.transform = `scale(1.4)`;
        cursorFollower.style.borderColor = 'rgba(230, 180, 34, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = `scale(1)`;
        cursorFollower.style.transform = `scale(1)`;
        cursorFollower.style.borderColor = 'rgba(230, 180, 34, 0.5)';
      });
    });
  }
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Smooth scrolling + close mobile menu
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});

// Active navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// 🔥 IMPORT FIREBASE (CDN VERSION)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 YOUR CONFIG (ALREADY CORRECT)
const firebaseConfig = {
  apiKey: "AIzaSyC4IeK0o8GPImZYB3cexeB1t9EfUTstJgk",
  authDomain: "nafee-henna-works.firebaseapp.com",
  projectId: "nafee-henna-works",
  storageBucket: "nafee-henna-works.firebasestorage.app",
  messagingSenderId: "617505431228",
  appId: "1:617505431228:web:f04ec87f7f03b39c6e3ab9"
};

// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ======================
// BOOKING FORM
// ======================
const bookingForm = document.getElementById("bookingForm");
const bookingMsg = document.getElementById("bookingMsg");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("bookName").value,
    email: document.getElementById("bookEmail").value,
    service: document.getElementById("bookService").value,
    date: document.getElementById("bookDate").value,
    message: document.getElementById("bookMessage").value,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "bookings"), data);

    bookingMsg.innerText = "✅ Booking saved!";
    bookingMsg.style.color = "lightgreen";

    bookingForm.reset();
  } catch (error) {
    console.error(error);
    bookingMsg.innerText = "❌ Error!";
    bookingMsg.style.color = "red";
  }
});


// ======================
// CONTACT FORM
// ======================
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    message: document.getElementById("contactMessage").value,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "contacts"), data);

    contactMsg.innerText = "✅ Message sent!";
    contactMsg.style.color = "lightgreen";

    contactForm.reset();
  } catch (error) {
  console.error("FULL ERROR:", error);
  contactMsg.innerText = error.message;
  }
  }
);


// Toast notification function
function showToast(message) {
  const toast = document.createElement('div');
  toast.innerHTML = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#e6b422';
  toast.style.color = '#0a0806';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '50px';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.85rem';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  toast.style.whiteSpace = 'nowrap';
  toast.style.maxWidth = '90%';
  toast.style.whiteSpace = 'normal';
  toast.style.textAlign = 'center';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Add to Cart
const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const productCard = btn.closest('.product-card');
    const productName = productCard?.querySelector('h3')?.innerText || 'Item';
    showToast(`✨ ${productName} added to cart ✨`);
    
    // Button animation
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Added! <i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1500);
  });
});

// Gallery Slider with Auto-Slide Functionality
function initGallerySliders() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    const slider = item.querySelector('.gallery-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.slider-track');
    const images = track.querySelectorAll('img');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    if (images.length <= 1) return;
    
    let currentIndex = 0;
    const totalImages = images.length;
    let autoSlideInterval;
    let isHovering = false;
    let slideDelay = 3000; // 3 seconds per slide
    
    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          stopAutoSlide();
          goToImage(i);
          startAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateSlider() {
      const width = images[0]?.clientWidth || track.parentElement.clientWidth;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
      track.style.transition = 'transform 0.5s ease-in-out';
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }
    
    function goToImage(index) {
      currentIndex = index;
      updateSlider();
    }
    
    function nextImage() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
    }
    
    function prevImage() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSlider();
    }
    
    // Start auto-slide
    function startAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      if (totalImages <= 1) return;
      autoSlideInterval = setInterval(() => {
        if (!isHovering) {
          nextImage();
        }
      }, slideDelay);
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }
    
    // Reset auto-slide timer
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }
    
    // Event listeners for manual navigation
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextImage();
        startAutoSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevImage();
        startAutoSlide();
      });
    }
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
      isHovering = true;
      stopAutoSlide();
    });
    
    slider.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoSlide();
    });
    
    // Touch support for mobile (pause on touch)
    slider.addEventListener('touchstart', () => {
      isHovering = true;
      stopAutoSlide();
    });
    
    slider.addEventListener('touchend', () => {
      setTimeout(() => {
        isHovering = false;
        startAutoSlide();
      }, 3000);
    });
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateSlider();
      }, 100);
    });
    
    // Start auto-slide
    startAutoSlide();
    
    // Store interval reference on the element for cleanup if needed
    slider.autoSlideInterval = autoSlideInterval;
  });
}

// Full Collection Lightbox Data
const fullCollections = [
  {
    id: 0,
    title: "Bridal Mehndi Collection",
    images: [
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+1",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+2",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+3",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+4",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+5",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+6",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+7",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+8",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+9",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+10",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+11",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Bridal+Hand+12"
    ]
  },
  {
    id: 1,
    title: "Arabic Henna Art",
    images: [
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+1",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+2",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+3",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+4",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+5",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+6",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+7",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Arabic+8"
    ]
  },
  {
    id: 2,
    title: "Feet Mehndi",
    images: [
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+1",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+2",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+3",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+4",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+5",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Feet+Design+6"
    ]
  },
  {
    id: 3,
    title: "Product Result",
    images: [
      "images/gallery/result/1.jpg",
      "images/gallery/result/2.jpg",
      "images/gallery/result/3.jpg",
      "images/gallery/result/4.jpg",
      "images/gallery/result/5.jpg",
      "images/gallery/result/6.jpg",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+7",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+8",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+9",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+10",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+11",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+12",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+13",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+14",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Fusion+15"
    ]
  },
  {
    id: 4,
    title: "Traditional Rajasthani",
    images: [
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+1",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+2",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+3",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+4",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+5",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+6",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+7",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+8",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+9",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Rajasthani+10"
    ]
  },
  {
    id: 5,
    title: "Minimalist Designs",
    images: [
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+1",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+2",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+3",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+4",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+5",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+6",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+7",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+8",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+9",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+10",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+11",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+12",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+13",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+14",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+15",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+16",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+17",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+18",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+19",
      "https://placehold.co/800x1000/1a1a1a/d4af37?text=Minimal+20"
    ]
  }
];

// Open Full Collection Lightbox
function openFullCollection(collectionId) {
  const collection = fullCollections[collectionId];
  if (!collection) return;
  
  let currentIndex = 0;
  const images = collection.images;
  
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-full';
  lightbox.innerHTML = `
    <div class="lightbox-close">&times;</div>
    <div class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></div>
    <div class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></div>
    <img class="lightbox-main-image" src="${images[0]}" alt="${collection.title}">
    <div class="lightbox-counter">${currentIndex + 1} / ${images.length}</div>
    <div class="lightbox-title">${collection.title}</div>
    <div class="lightbox-thumbnails"></div>
  `;
  
  // Add thumbnails
  const thumbnailsContainer = lightbox.querySelector('.lightbox-thumbnails');
  images.forEach((img, idx) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.alt = `${collection.title} ${idx + 1}`;
    thumb.addEventListener('click', () => {
      currentIndex = idx;
      updateImage();
      updateActiveThumb();
    });
    thumbnailsContainer.appendChild(thumb);
  });
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  const mainImg = lightbox.querySelector('.lightbox-main-image');
  const counter = lightbox.querySelector('.lightbox-counter');
  const thumbs = lightbox.querySelectorAll('.lightbox-thumbnails img');
  
  function updateImage() {
    mainImg.src = images[currentIndex];
    counter.innerHTML = `${currentIndex + 1} / ${images.length}`;
    updateActiveThumb();
  }
  
  function updateActiveThumb() {
    thumbs.forEach((thumb, idx) => {
      thumb.classList.toggle('active-thumb', idx === currentIndex);
    });
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }
  
  lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });
  
  lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });
  
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.remove();
    document.body.style.overflow = '';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.remove();
      document.body.style.overflow = '';
    }
  });
  
  // Keyboard navigation
  const keydownHandler = (e) => {
    if (!document.querySelector('.lightbox-full')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') {
      lightbox.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  
  updateActiveThumb();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize auto-slide galleries
  initGallerySliders();
  
  // Attach click events to gallery overlays for full collection view
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    const overlay = item.querySelector('.gallery-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        openFullCollection(index);
      });
    }
  });
});

// Optional: Pause all auto-slides when page is not visible (saves resources)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause all sliders when tab is not visible
    document.querySelectorAll('.gallery-slider').forEach(slider => {
      if (slider.autoSlideInterval) {
        clearInterval(slider.autoSlideInterval);
        slider.autoSlideInterval = null;
      }
    });
  } else {
    // Restart all sliders when tab becomes visible
    initGallerySliders();
  }
});

// Instagram feed click
const instaPosts = document.querySelectorAll('.insta-post');
instaPosts.forEach(post => {
  post.addEventListener('click', () => {
    window.open('https://instagram.com/nafeehennarts', '_blank');
  });
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateNumbers = () => {
  if (animated) return;
  statNumbers.forEach(stat => {
    const targetText = stat.innerText;
    const target = parseInt(targetText);
    if (target && !isNaN(target)) {
      let current = 0;
      const increment = target / 40;
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.floor(current) + (targetText.includes('+') ? '+' : '');
          requestAnimationFrame(updateNumber);
        } else {
          stat.innerText = target + (targetText.includes('+') ? '+' : '');
        }
      };
      updateNumber();
    }
  });
  animated = true;
};

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsGrid);
}