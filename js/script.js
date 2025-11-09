// Toggle sidebar on mobile
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('show');
});

// Add active class to clicked nav items
document.querySelectorAll('.sidebar-nav .nav-link').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});