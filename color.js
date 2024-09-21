    window.addEventListener('scroll', function() {
    var links = document.querySelectorAll('nav .menu li a');
    var scrollPos = window.scrollY;
    var index = Math.floor(scrollPos / window.innerHeight); // 스크롤 위치에 따라 색상 선택

    // 링크들의 색상 변경
    links.forEach(function(link, i) {
        if (i === index % links.length) {
            link.style.color = 'rgb(255, 192, 203)'; // 핑크색
        } else {
            link.style.color = 'rgb(0)'; // 회색
        }
    });
    });

