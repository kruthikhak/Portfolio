// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.querySelector('.lg\\:hidden button');
    
    if (window.innerWidth < 1024 && 
        !sidebar.contains(event.target) && 
        !mobileMenuButton.contains(event.target)) {
        sidebar.classList.add('-translate-x-full');
    }
});

// Skills toggle functionality
function toggleSkill(categoryId) {
    const skillContent = document.getElementById(categoryId);
    if (skillContent) {
        skillContent.classList.toggle('hidden');
    }
}

// Highlight active page in sidebar
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.remove('text-gray-700', 'hover:bg-gray-100');
            link.classList.add('text-white', 'bg-[#768A96]');
        } else {
            link.classList.remove('text-white', 'bg-[#768A96]');
            link.classList.add('text-gray-700', 'hover:bg-gray-100');
        }
    });
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    highlightActivePage();
}); 