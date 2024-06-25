const slider = document.querySelector('.slider');
const container = document.querySelector('.container');
const beforeImage = document.querySelector('.before');
const afterImage = document.querySelector('.after');
const dots = document.querySelectorAll('.dot');

let isDragging = false;

slider.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', moveDrag);

slider.addEventListener('touchstart', startDrag);
document.addEventListener('touchend', stopDrag);
document.addEventListener('touchmove', moveDrag);

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
}

function stopDrag() {
    isDragging = false;
}

function moveDrag(e) {
    if (!isDragging) return;

    let clientX;
    if (e.type === 'mousemove') {
        clientX = e.clientX;
    } else if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
    }

    let rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    slider.style.left = `${offsetX}px`;
    beforeImage.style.clip = `rect(0, 1000px, 600px, ${offsetX}px)`;
}

const Before = [
    'image/before1.png',
    'image/before2.png',
    'image/before3.png'
];
const After = [
    'image/after1.png',
    'image/after2.png',
    'image/after3.png'
];
let currentImageIndex = 0;

function UpChangeImage() {
    currentImageIndex = (currentImageIndex + 1) % Before.length;
    beforeImage.src = Before[currentImageIndex];
    afterImage.src = After[currentImageIndex];
    updateDots();
}

function DownChangeImage() {
    if (currentImageIndex == 0){
        currentImageIndex = 2
    }
    else{
        currentImageIndex = (currentImageIndex - 1);
    }
    beforeImage.src = Before[currentImageIndex];
    afterImage.src = After[currentImageIndex];
    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index == currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 초기 슬라이더 위치를 중앙으로 설정
window.addEventListener('load', () => {
    const rect = container.getBoundingClientRect();
    const initialPosition = rect.width / 2;
    slider.style.left = `${initialPosition}px`;
    beforeImage.style.clip = `rect(0, 1000px, 600px, ${initialPosition}px)`;
    updateDots();
});