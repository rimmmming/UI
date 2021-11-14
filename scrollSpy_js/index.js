const navElem = document.querySelector('#nav');
const navItems = Array.from(navElem.children); //상단 탭 각각 버튼들 배열
const contentsElem = document.querySelector('#contents');
const contentItems = Array.from(contentsElem.children); // 본문에 각각 컨텐츠들 배열

// scroll event가 300ms마다 실행되도록 만든 함수
const throttle = (func, delay) => {
    let throttled = false;
    return (...args) => {
        if(!throttled) {
            throttled = true;
            setTimeout( ()=>{
                func(...args);
                throttled = false;
            }, delay)
        }
    }
}

const debounce = (func,delay) => {
    console.log(1)
    let timeoutId = null;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(null, ...args), delay)
    }
}

// console.log(navItems, contentItems)
let offsetTop = [];
const getOffestTop = () => {
    offsetTop = contentItems.map(elem => {
        // 컨텐츠 각각의 높이와 offsetTop값들 구하기
        const [offsetT , clientH] = [elem.offsetTop, elem.clientHeight];
        // console.log( offsetT - clientH / 2, offsetT + clientH / 2 )
        // 각각의 컨텐츠의 기준점을 구해서 배열로 리턴 ( 기준점 : -높이값/2, +높이값/2 ) 
        // 기준점이 위와 같은 이유는 해당 컨텐츠가 화면에 반이상 보이기 시작하면 탭 활성화 하기 위함
        return [offsetT - clientH / 2, offsetT + clientH / 2]
        // return [offsetT, offsetT + clientH]
    })
}
getOffestTop();

window.addEventListener('scroll', throttle(e => {
    const {scrollTop} = e.target.scrollingElement;
    // from = offsetT - clientH / 2
    // to = offsetT + clientH / 2 
    // 조건과 일치하는 배열의 인덱스를 반환
    const targetIndex = offsetTop.findIndex(([from, to]) => (
        scrollTop >= from && scrollTop < to    
    ))
    Array.from(navElem.children).forEach((c, i) => {
        if(i !== targetIndex) c.classList.remove('on')
        else c.classList.add('on')
    })
}, 300))

window.addEventListener('resize', debounce(getOffestTop, 300))

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