if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
};

const socket = io();  

funciones.loadView('./views/viewAlumnos/viewAlumnos.html','root')
.then(async ()=>{
    funciones.loadScript('./views/viewAlumnos/controller.js','root')
        .then(()=>{
            Inicializar();
        })
    
})
