// WanderWave JavaScript Functionality

// DOM Elements
const searchTabs = document.querySelectorAll('.search-tab');
const quickSearchForm = document.querySelector('.quick-search-form');
const formRow = document.querySelector('.form-row');
const dockItems = document.querySelectorAll('.dock-item');
const header = document.querySelector('.header');
const newsletterForm = document.querySelector('.newsletter-form');

// Search Form Templates
const searchFormTemplates = {
    bus: `
        <div class="form-group">
            <label>From</label>
            <input type="text" name="from" placeholder="Departure City" required>
        </div>
        <div class="form-group">
            <label>To</label>
            <input type="text" name="to" placeholder="Destination City" required>
        </div>
        <div class="form-group">
            <label>Departure Date</label>
            <input type="date" name="date" required>
        </div>
        <div class="form-group">
            <label>Passengers</label>
            <select name="passengers">
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4+ Passengers</option>
            </select>
        </div>
        <button type="submit" class="search-button">
            <i class="fas fa-search"></i>
            Search Buses
        </button>
    `,
    
    train: `
        <div class="form-group">
            <label>From Station</label>
            <input type="text" name="from" placeholder="Departure Station" required>
        </div>
        <div class="form-group">
            <label>To Station</label>
            <input type="text" name="to" placeholder="Arrival Station" required>
        </div>
        <div class="form-group">
            <label>Departure Date</label>
            <input type="date" name="date" required>
        </div>
        <div class="form-group">
            <label>Class</label>
            <select name="class">
                <option value="sleeper">Sleeper</option>
                <option value="3ac">3A AC</option>
                <option value="2ac">2A AC</option>
                <option value="1ac">1A AC</option>
            </select>
        </div>
        <div class="form-group">
            <label>Passengers</label>
            <select name="passengers">
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4+ Passengers</option>
            </select>
        </div>
        <button type="submit" class="search-button">
            <i class="fas fa-train"></i>
            Search Trains
        </button>
    `,
    
    car: `
        <div class="form-group">
            <label>Pickup Location</label>
            <input type="text" name="pickup" placeholder="Pickup City" required>
        </div>
        <div class="form-group">
            <label>Drop Location</label>
            <input type="text" name="drop" placeholder="Drop City" required>
        </div>
        <div class="form-group">
            <label>Pickup Date</label>
            <input type="date" name="pickup-date" required>
        </div>
        <div class="form-group">
            <label>Return Date</label>
            <input type="date" name="return-date">
        </div>
        <button type="submit" class="search-button">
            <i class="fas fa-car"></i>
            Search Cars
        </button>
    `,
    
    local: `
        <div class="form-group">
            <label>City</label>
            <input type="text" name="city" placeholder="Select City" required>
        </div>
        <div class="form-group">
            <label>Transport Type</label>
            <select name="transport-type">
                <option value="auto">Auto Rickshaw</option>
                <option value="taxi">Taxi</option>
                <option value="bike">Bike Rental</option>
                <option value="metro">Metro Pass</option>
            </select>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" name="date" required>
        </div>
        <button type="submit" class="search-button">
            <i class="fas fa-motorcycle"></i>
            Search Local
        </button>
    `,
    
    experience: `
        <div class="form-group">
            <label>Destination</label>
            <input type="text" name="destination" placeholder="Where to explore?" required>
        </div>
        <div class="form-group">
            <label>Experience Type</label>
            <select name="experience-type">
                <option value="cultural">Cultural Tours</option>
                <option value="adventure">Adventure Sports</option>
                <option value="food">Food Tours</option>
                <option value="nature">Nature Walks</option>
            </select>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" name="date" required>
        </div>
        <button type="submit" class="search-button">
            <i class="fas fa-backpack"></i>
            Explore Packages
        </button>
    `
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchTabs();
    initializeDockNavigation();
    initializeScrollEffects();
    initializeFormHandlers();
    setMinDate();
    initializeAnimations();
});

// Search Tab Functionality
function initializeSearchTabs() {
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the transport type
            const transportType = getTransportType(this);
            
            // Update form fields
            updateSearchForm(transportType);
            
            // Add animation class
            quickSearchForm.style.opacity = '0';
            setTimeout(() => {
                quickSearchForm.style.opacity = '1';
            }, 150);
        });
    });
}

// Get transport type from tab
function getTransportType(tab) {
    const tabText = tab.textContent.toLowerCase();
    if (tabText.includes('bus')) return 'bus';
    if (tabText.includes('train')) return 'train';
    if (tabText.includes('car')) return 'car';
    if (tabText.includes('local')) return 'local';
    if (tabText.includes('experience')) return 'experience';
    return 'bus'; // default
}

// Update search form based on selected transport type
function updateSearchForm(transportType) {
    if (formRow && searchFormTemplates[transportType]) {
        formRow.innerHTML = searchFormTemplates[transportType];
        
        // Update form class for styling
        quickSearchForm.className = `quick-search-form form-fields-${transportType}`;
        
        // Set minimum date for new inputs
        setMinDate();
        
        // Re-attach form handler
        attachFormSubmitHandler();
    }
}

// Set minimum date to today for all date inputs
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = today;
    });
}

// Dock Navigation Functionality
function initializeDockNavigation() {
    // Update active dock item based on current page
    updateActiveDockItem();
    
    // Handle dock item clicks
    dockItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't prevent default for anchor links
            if (this.tagName === 'A') {
                // Let the browser handle the navigation
                return;
            }
            
            // Remove active class from all items
            dockItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Update active dock item based on current page
function updateActiveDockItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    dockItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && (href.includes(currentPage) || (currentPage === '' && href.includes('index.html')))) {
            item.classList.add('active');
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header background change
        if (header) {
            if (currentScroll > 100) {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
                header.style.borderColor = 'rgba(0, 212, 170, 0.3)';
            } else {
                header.style.background = 'rgba(26, 11, 61, 0.2)';
                header.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            }
        }
        
        lastScroll = currentScroll;
    });
}

// Form Handlers
function initializeFormHandlers() {
    attachFormSubmitHandler();
    attachNewsletterHandler();
}

function attachFormSubmitHandler() {
    const form = document.querySelector('.quick-search-form');
    if (form) {
        // Remove existing listeners
        form.replaceWith(form.cloneNode(true));
        
        // Get the new form reference
        const newForm = document.querySelector('.quick-search-form');
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const searchData = Object.fromEntries(formData);
            
            // Get active transport type
            const activeTab = document.querySelector('.search-tab.active');
            const transportType = getTransportType(activeTab);
            
            // Show loading state
            const submitButton = this.querySelector('.search-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            submitButton.disabled = true;
            
            // Simulate search (replace with actual search logic)
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show result message
                showSearchMessage(transportType, searchData);
            }, 2000);
        });
    }
}

function attachNewsletterHandler() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitButton = this.querySelector('button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitButton.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitButton.style.background = 'linear-gradient(135deg, #00d4aa, #4c3085)';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Show search message
function showSearchMessage(transportType, searchData) {
    const message = `🎉 Great! Searching for ${transportType} from ${searchData.from || searchData.pickup || searchData.city || 'selected location'} to ${searchData.to || searchData.drop || 'destination'}. You'll be redirected to results page soon!`;
    
    // Create toast notification
    showToast(message, 'success');
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(26, 11, 61, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'var(--accent-cyan)' : 'var(--secondary-main)'};
        border-radius: 15px;
        padding: 20px;
        color: var(--neutral-light);
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add toast styles if not exist
    if (!document.querySelector('#toast-styles')) {
        const toastStyles = document.createElement('style');
        toastStyles.id = 'toast-styles';
        toastStyles.textContent = `
            .toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 10px;
            }
            .toast-content i {
                font-size: 1.2rem;
                color: var(--accent-cyan);
            }
            .toast-close {
                background: none;
                border: none;
                color: var(--neutral-light);
                cursor: pointer;
                padding: 5px;
                border-radius: 5px;
                transition: all 0.3s ease;
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .toast-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--accent-cyan);
            }
        `;
        document.head.appendChild(toastStyles);
    }
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

elements.forEach((element, index) => {
    if (elementTop < window.innerHeight - elementVisible) {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150); // stagger
    }
});

item.addEventListener('click', () => {
    item.classList.add('clicked');
    setTimeout(() => item.classList.remove('clicked'), 300);
});

const updates = document.querySelectorAll('.update-card');
let index = 0;
setInterval(() => {
    updates.forEach(u => u.style.display = 'none');
    updates[index].style.display = 'block';
    index = (index + 1) % updates.length;
}, 4000);


// Initialize Animations
function initializeAnimations() {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .destination-card, .update-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for animation elements
    const animatedElements = document.querySelectorAll('.feature-card, .destination-card, .update-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    setTimeout(animateOnScroll, 500);
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle (for future implementation)
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations and effects
    initializeScrollEffects();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Console welcome message
console.log(`
🌊 Welcome to WanderWave! 
🚀 Ride the Wave of Adventure
✨ Built with modern web technologies
🎨 Design System: Aurora Adventure
`);

// Export functions for potential future use
window.WanderWave = {
    updateSearchForm,
    showToast,
    initializeAnimations
};