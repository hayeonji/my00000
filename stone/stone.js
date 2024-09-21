document.addEventListener("DOMContentLoaded", function() {
    const imageElement = document.querySelector(".image1");
    let originalSize = 40; // 초기 사이즈 설정 (예시)
    let stoneSize = 20; // 초기 사이즈 설정 (예시)
    let currentImageUrlIndex = 0; // 현재 보이는 이미지 인덱스

    const imageUrls = [
        "url('/gif/0005-0188.gif')",
        "url('/gif/외계.gif')",
        "url('/gif/flying.gif')",
        "url('/gif/blossom.gif')"
    ];

    const sections = document.querySelectorAll(".main0, .main1, .main2, .main3");

    // 이미지 변경 및 사이즈 조정 함수
    function setBackgroundImage(index) {
        if (index >= 0 && index < imageUrls.length) {
            currentImageUrlIndex = index; // 현재 이미지 인덱스 업데이트
            imageElement.style.backgroundImage = imageUrls[index];

            const scrollY = window.scrollY;
            let newSize = originalSize;


            if (sections[index] === document.querySelector(".main0")) {
            imageElement.style.width = `${newSize}vh`;
            imageElement.style.height = `${newSize}vh`;
            newSize = stoneSize + scrollY * 0.1; 

            }

            imageElement.style.width = `${newSize}vw`;
            imageElement.style.height = `${newSize}vw`; // 정사각형 비율 유지
        }
    }

    // 스크롤 이벤트 리스너
    let ticking = false;

    window.addEventListener("scroll", function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                let currentSectionIndex = 0;

                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSectionIndex = index;
                    }
                });

                // 현재 보이는 섹션에 따라 배경 이미지 설정
                setBackgroundImage(currentSectionIndex);

                ticking = false;
            });

            ticking = true;
        }
    });

    // 선택사항: 인터랙티브한 기능 또는 애니메이션 추가
    imageElement.addEventListener("mouseenter", function() {
        // 예시: 마우스 오버 시 투명도 변경
        this.style.opacity = "0.5";
    });

    imageElement.addEventListener("mouseleave", function() {
        // 예시: 마우스 떠날 때 투명도 원래대로 복원
        this.style.opacity = "1.0";
    });

    // 초기에 첫 번째 이미지 설정
    setBackgroundImage(currentImageUrlIndex);
});
