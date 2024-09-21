document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById('text');
    const text = arc= 'project 부채꼴= 프로젝트 <br>arc= project 부채꼴= 프로젝트 <br>arc= project 부채꼴= 프로젝트<br><br>arc= project 부채꼴= 프로젝트<br>';
    let index = 0;

    function type() {
        if (index < text.length) {
            if (text.charAt(index) === "<") {
                const nextTag = text.indexOf(">", index);
                textElement.innerHTML += text.substring(index, nextTag + 1);
                index = nextTag + 1;
            } else {
                textElement.innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(type, 50); // Adjust the speed by changing the delay
        }
    }

    type();
});

