// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const currentPath = window.location.pathname.split('/').pop();

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Set active tab
    document.querySelectorAll('.tab').forEach(tab => {
        const tabPath = tab.getAttribute('href').split('/').pop();
        if (currentPath === tabPath) {
            tab.classList.add('active');
        }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navbar.classList.remove('active');
        }
    });

    // Mobile tab scrolling
    if (window.innerWidth <= 768) {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            activeTab.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Project Filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });

    // Form Handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = form.querySelector('.form-success');
            if (successMsg) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => successMsg.style.display = 'none', 3000);
            }
        });
    });

    // FAQ Toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    // Dropdown Functionality
    document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                document.querySelectorAll('.dropdown').forEach(other => {
                    if (other !== dropdown) other.classList.remove('active');
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
// Hamburger Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links'); // Update selector to match your menu
    
    // Toggle Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close Menu on Outside Click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && !e.target.closest('.nav-links')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close Menu on Link Click (Mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Handling
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Formspree AJAX submission
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('formSuccess').style.display = 'block';
            this.reset();
            setTimeout(() => {
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});

// Real-time Validation
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', () => {
        if (element.checkValidity()) {
            element.classList.remove('invalid');
        } else {
            element.classList.add('invalid');
        }
    });
});
// Add smooth page transition
document.querySelectorAll('.btn-projects').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.href;
        
        // Add transition effect
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = target;
        }, 300);
    });
});
// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    
    // Get all gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.parentElement.querySelector('figcaption').innerHTML;
        });
    });

    // Close modal
    document.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
// PDF Viewer Enhancement
document.addEventListener('DOMContentLoaded', () => {
    const pdfViewer = document.querySelector('.pdf-viewer object');
    
    // Add PDF navigation controls
    const addPdfControls = () => {
        const controls = document.createElement('div');
        controls.className = 'pdf-nav-controls';
        controls.innerHTML = `
            <button class="btn btn-pdf" onclick="zoomIn()">Zoom In</button>
            <button class="btn btn-pdf" onclick="zoomOut()">Zoom Out</button>
            <button class="btn btn-pdf" onclick="toggleFullscreen()">Fullscreen</button>
        `;
        document.querySelector('.pdf-controls').appendChild(controls);
    };

    // Zoom functions
    window.zoomIn = () => {
        const currentZoom = parseFloat(pdfViewer.style.zoom) || 1;
        pdfViewer.style.zoom = Math.min(currentZoom + 0.1, 2);
    };

    window.zoomOut = () => {
        const currentZoom = parseFloat(pdfViewer.style.zoom) || 1;
        pdfViewer.style.zoom = Math.max(currentZoom - 0.1, 0.5);
    };

    window.toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            pdfViewer.requestFullscreen().catch(err => {
                alert(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Initialize controls
    addPdfControls();
});
