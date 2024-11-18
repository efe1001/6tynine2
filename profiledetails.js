const profiledetails = document.querySelector('.profiledetails')
fetch('./profiles.html')
.then(res=>res.text())
.then(data=>{
    profiledetails.innerHTML=data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    eval(doc.querySelector('script').textContent)
})