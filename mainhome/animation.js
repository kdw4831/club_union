const animatedTexts = document.querySelectorAll('.animated-text');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // When 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add 'show' class for animation
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, options);

animatedTexts.forEach(text => {
    observer.observe(text);
});
