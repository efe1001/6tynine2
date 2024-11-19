const headerbar = document.querySelector('.headerbar')
fetch('./headerbar.html')
.then(res=>res.text())
.then(data=>{
    headerbar.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})