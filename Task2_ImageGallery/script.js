const images = [
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        title: "Maldives",
        desc: "Paradise Beach"
    },
    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        title: "Swiss Alps",
        desc: "Majestic Mountains"
    },
    {
        src: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800",
        title: "Tokyo",
        desc: "City of Lights"
    },
    {
        src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
        title: "Paris",
        desc: "Eiffel Tower"
    },
    {
        src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800",
        title: "Bali",
        desc: "Tropical Paradise"
    },
    {
        src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
        title: "Himalayas",
        desc: "Roof of the World"
    },
    {
        src: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800",
        title: "New York",
        desc: "The Big Apple"
    },
    {
        src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
        title: "Agra",
        desc: "Taj Mahal"
    },
    {
        src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
        title: "Santorini",
        desc: "Greek Islands"
    },
    {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        title: "Dubai",
        desc: "City of Future"
    },
    {
        src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
        title: "Rome",
        desc: "The Colosseum"
    },
    {
        src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
        title: "Iceland",
        desc: "Northern Lights"
    }
];

let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Change Image
function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    updateLightbox();
}

// Update Lightbox Content
function updateLightbox() {
    document.getElementById('lightbox-img').src = images[currentIndex].src;
    document.getElementById('lightbox-title').textContent = images[currentIndex].title;
    document.getElementById('lightbox-desc').textContent = images[currentIndex].desc;
}

// Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // Remove active from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Close lightbox when clicking outside image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});