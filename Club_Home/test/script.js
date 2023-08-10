const animatedText = document.querySelector('.animated-text');

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

// 이 부분에서 'animatedText' 대신 실제 사용하는 대상 요소의 선택자를 사용해야 합니다.
// 예: const elementToObserve = document.querySelector('.some-element');
observer.observe(animatedText);
