// inicio
document.addEventListener('DOMContentLoaded', function (){
    navegacionfija()
    crearGaleria()
    resaltarenlace()
    scrollNav()
})
//funciones
function navegacionfija(){
    const header = document.querySelector('.header')
    const sobrefestival = document.querySelector('.sobres-festival')

    document.addEventListener("scroll", function (){

        if(sobrefestival.getBoundingClientRect().bottom <1){
            header.classList.add('fixed')
        }else {
            header.classList.remove('fixed')
        }

    })
}
function crearGaleria(){
    const cantidad_imagenes = 16
    const galeria = document.querySelector('.galeria-imagenes')
    for (let i = 1; i <= cantidad_imagenes; ++i) {
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function(){
            mostrarimagen(i)
        }
        galeria.appendChild(imagen)
    }
    function mostrarimagen(i){
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
            <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
        `;
        const modal = document.createElement('DIV')
        modal.appendChild(imagen)

        const body = document.querySelector('body')
        body.classList.add('overflow-hidden')
        modal.classList.add('modal')

        modal.onclick = cerrarModal
        const cerrarModalBtn = document.createElement('button')
        cerrarModalBtn.classList.add('btn-cerrar')
        cerrarModalBtn.textContent = 'X';
        cerrarModalBtn.onclick = cerrarModal;
        modal.appendChild(cerrarModalBtn);
        body.appendChild(modal);
    }
}
function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove();
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 499);
}
function resaltarenlace() {
    document.addEventListener('scroll',function (){
        const sections = document.querySelectorAll('section')
        const navlinks = document.querySelectorAll('.navegacion-principal a')

        let actual ='';
        sections.forEach(section => {
            const sectiontop = section.offsetTop
            const sectionheight= section.clientHeight
            if (window.scrollY >= (sectiontop - sectionheight /3) ) {
                actual = section.id
            }
        })

        navlinks.forEach(link =>{
            link.classList.remove('active')
            if (link.getAttribute('href') === '#'+actual){
                link.classList.add('active')
            }
        })
    })
}
function scrollNav() {
    const navlinks = document.querySelectorAll('.navegacion-principal a');

    navlinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);
            console.log('no jala',sectionScroll)
            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}