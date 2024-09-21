const image1 = document.querySelector('.image1');
const image2 = document.querySelector('.image2');
const image3 = document.querySelector('.image3');
const image4 = document.querySelector('.image4');

// 각 이미지에 마우스 호버 이벤트를 추가합니다.
image1.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.opacity = '1';
    currentPattern = 1; // 패턴 1
});

image1.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.5';
    currentPattern = 0; // 기본 패턴
});

image2.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.opacity = '1';
    currentPattern = 2; // 패턴 2
});

image2.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.5';
    currentPattern = 0; // 기본 패턴
});

image3.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.opacity = '1';
    currentPattern = 3; // 패턴 3
});

image3.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.5';
    currentPattern = 0; // 기본 패턴
});

image4.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.opacity = '1';
    currentPattern = 4; // 패턴 4
});

image4.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.5';
    currentPattern = 0; // 기본 패턴
});


const overview = document.querySelector('.overview');
const h2 = overview.querySelector('h2');


// 이미지에 마우스 호버됐을 때 h2의 문장을 변경합니다.
image1.addEventListener('mouseenter', function() {
    h2.textContent = "작전명! 하늘속 꽃바람";
    
});

image2.addEventListener('mouseenter', function() {
    h2.textContent = "작전명! 하늘속 잎바람";

});

image3.addEventListener('mouseenter', function() {
    h2.textContent = "작전명! 하늘속 별바람";


});

image4.addEventListener('mouseenter', function() {
    h2.textContent = "작전명! 하늘속 눈바람";

});

// 이미지에 마우스가 벗어났을 때 기존의 h2 내용으로 되돌립니다.
const defaultText = "작전명! 하늘속 __바람";
image1.addEventListener('mouseleave', function() {
    h2.textContent = defaultText;
});

image2.addEventListener('mouseleave', function() {
    h2.textContent = defaultText;
});

image3.addEventListener('mouseleave', function() {
    h2.textContent = defaultText;
});

image4.addEventListener('mouseleave', function() {
    h2.textContent = defaultText;
});
