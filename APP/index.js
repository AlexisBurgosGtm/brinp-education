const navbar = document.getElementById('sidebar');
const navbartop = document.getElementById('navbar-top');
const btnToggler = document.getElementById('btnToggler');


const btnInicio = document.getElementById('btnMenuInicio')
const btnAlumnos = document.getElementById('btnMenuAlumnos');
const btnMaestros = document.getElementById('btnMenuMaestros');
const btnNotas = document.getElementById('btnMenuNotas');
const btnSalir = document.getElementById('btnMenuSalir');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
};

const socket = io(); 

function InicializarMenu(){

    btnSalir.addEventListener('click',()=>{
        funciones.loadView('./views/viewLogin/viewLogin.html','root')
        .then(async ()=>{
            funciones.loadScript('./views/viewLogin/controller.js','root')
            .then(()=>{
                InicializarLogin();
            })
    
        })
    });

    btnInicio.addEventListener('click',()=>{
        switch (GlobalTipoApp) {
            case "MAESTRO":
                funciones.loadView('./views/viewInicio/inicioMaestros.html','root')
                .then(()=>{
                  
                    
                })
                break;
            case "ALUMNO":
                break;

            case "ADMINISTRADOR":
                funciones.loadView('./views/viewAdmin/viewAdmin.html','root')
                .then(()=>{
                      
                        
                })
                break;
        }
    });

    btnMaestros.addEventListener('click',()=>{
        funciones.loadView('./views/viewMaestros/viewMaestros.html','root')
        .then(async ()=>{
            funciones.loadScript('./views/viewMaestros/controller.js','root')
            .then(()=>{
                InicializarMaestros();
            })
    
        })
    });

    btnAlumnos.addEventListener('click',()=>{
        funciones.loadView('./views/viewAlumnos/viewAlumnos.html','root')
        .then(async ()=>{
            funciones.loadScript('./views/viewAlumnos/controller.js','root')
            .then(()=>{
                Inicializar();
            })
    
        })
    });

    btnNotas.addEventListener('click',()=>{
        funciones.loadView('./views/viewNotas/viewNotas.html','root')
        .then(async ()=>{
            funciones.loadScript('./views/viewNotas/controller.js','root')
            .then(()=>{
                
            })
    
        })
    });

    //carga el login
    btnSalir.click();
}

InicializarMenu();

