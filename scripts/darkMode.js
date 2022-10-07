const modeBtn = document.querySelector(".mode-btn");
const modeBtnImg = document.querySelector(".mode-btn-img")
const html = document.querySelector("html")


modeBtn.addEventListener('click', () => {
   html.classList.toggle('dark-mode')
  
   if(html.classList.contains('dark-mode')) {
     modeBtnImg.src = 'assets/img/sun.png'
     localStorage.setItem('darkmode', true)
   } else {
     modeBtnImg.src = 'assets/img/moon.png'
     localStorage.setItem('darkmode', false)
   }
 })

 if(localStorage.getItem('darkmode') === 'true') {
   html.classList.add('dark-mode')
   modeBtnImg.src = 'assets/img/sun.png'
 }