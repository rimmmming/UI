const navElem = document.querySelector('#nav');
const navItems = Array.from(navElem.children); //상단 탭 각각 버튼들 배열
const contentsElem = document.querySelector('#contents');
const contentItems = Array.from(contentsElem.children); // 본문에 각각 컨텐츠들 배열

const scrollSpyObserver = new IntersectionObserver(
    entries => {
        const {target} = entries.find(entry => entry.isIntersecting) || {};
        const index = contentItems.indexOf(target);
        Array.from(navElem.children).forEach((c, i) => {
            if(i === index) c.classList.add('on');
            else c.classList.remove('on');
        })
    },
    {
        root : null,
        rootMargin: '0px',
        threshold: 0.5
    }
);
contentItems.forEach(item => scrollSpyObserver.observe(item))

navElem.addEventListener('click',  e => {
    const targetElem = e.target;
    if(targetElem.tagName === 'BUTTON'){
        // 클릭한 버튼의 부모요소 인덱스를 구해서 
        const tartetIndex = navItems.indexOf(targetElem.parentElement);
        // 컨텐츠 인덱스로 스크롤 
        contentItems[tartetIndex].scrollIntoView({
            block : "start",
            behavior : "smooth"
        })
    }
})