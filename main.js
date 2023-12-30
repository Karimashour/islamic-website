//explore button
let exploreButton=document.querySelector('.title .btn'),
    hadithSection=document.querySelector('.hadith');
exploreButton.addEventListener('click',()=>{
    hadithSection.scrollIntoView({
        behavior:"smooth"
    })
})
let fixedNav = document.querySelector(".header");
let scrollBtn=document.querySelector('.scrollBtn')
window.addEventListener("scroll", () => {
    window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
    if(window.scrollY>500){
        scrollBtn.classList.add('active')
    }
    else{
        scrollBtn.classList.remove('active')
    }
});
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
//hadith change
let hadithContainer=document.querySelector('.hadithContainer'),
    next=document.querySelector('.buttons .next')
    prev=document.querySelector('.buttons .prev')
    number=document.querySelector('.buttons .number');
    let hadithIndex=0;
hadithChanger();
function hadithChanger(){
    fetch('https://api.hadith.gading.dev/books/bukhari?range=1-300')
    .then(response => response.json())
    .then(data => {  
        let hadiths=data.data.hadiths;
        changeHadith();
        next.addEventListener('click',()=>{
            hadithIndex==299 ? hadithIndex=0 : hadithIndex++;
            changeHadith();
        })
        prev.addEventListener('click',()=>{
            hadithIndex==0? hadithIndex=299: hadithIndex--;
            changeHadith();
        })
        function changeHadith(){
            hadithContainer.innerText=hadiths[hadithIndex].arab;
            number.innerText=`300 - ${hadithIndex+1}`;
        }
    })
}
//link sections
let sections=document.querySelectorAll('section'),
    links=document.querySelectorAll('.header ul li');
links.forEach(link =>{
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target=link.dataset.filter;
        sections.forEach(section =>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior:'smooth'
                })
            }
        })
    })
})
//surah api
let surathContainer=document.querySelector('.surHasContainer')
getSuraths()
function getSuraths(){
    //fetch suraths meta data {name of surah}
    fetch('https://api.alquran.cloud/v1/meta')
    .then(response => response.json())
    .then(data=>{
        let suraths=data.data.surahs.references;
        let numberSurah=114;
        surathContainer.innerHTML="";
        for(let i=0;i<numberSurah;i++){
            surathContainer.innerHTML +=`
            <div class="surah">
               <p> ${suraths[i].name}</p>
               <p>${suraths[i].englishName}</p>
               <p>${suraths[i].revelationType}</p>
            </div>`
        }
        let surahTitle=document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            ayatContainer=document.querySelector('.ayat');
        surahTitle.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                fetch(`https://api.alquran.cloud/v1/surah/${index+1}`)
                .then(response => response.json())
                .then(data=>{
                    ayatContainer.innerHTML="";
                    let ayat=data.data.ayahs;
                    ayat.forEach(aya=>{
                        popup.classList.add('active');
                        ayatContainer.innerHTML +=`
                        <p>{${aya.numberInSurah}} - ${aya.text} </p>
                        `
                    })
                })
            })
        })
        let closepopup=document.querySelector('.close-popup');
        closepopup.addEventListener('click',()=>{
            popup.classList.remove('active');
        })
    }) 
}
// pray time api
let cards=document.querySelector('.cards');
getPrayTimes();
function getPrayTimes(){
    fetch('https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
    .then(response => response.json())
    .then(data => {
        let times=data.data.timings;
        cards.innerHTML="";
        for(let time in times){
            cards.innerHTML+=`
            <div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="prayTime">
                        ${times[time]}
                    </div>
                </div>
                <p>${time}</p>
            </div>`
        }
    })
}
// active sidbar
let bars=document.querySelector('.bars'),
    sidebar=document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    sidebar.classList.toggle('active')
})
