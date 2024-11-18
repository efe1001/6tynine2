const promotion = document.querySelector('.sliderpromotion')
fetch('./slider.html')
.then(res=>res.text())
.then(data=>{
    promotion.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})