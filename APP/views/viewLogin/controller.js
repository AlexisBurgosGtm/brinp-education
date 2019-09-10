function InicializarLogin(){
    navbar.style = 'visibility:hidden';
    navbartop.style = 'visibility:hidden';
    btnToggler.style = 'visibility:hidden';

    TOKEN='';
    GlobalTipoApp ='';
    GlobalUser = '';
    GlobalNomUser = '';
    GlobalDataUser =[];

    let cmbTipoApp = document.getElementById('cmbAplicacion');
    let txtUser = document.getElementById('txtUser');
    let txtPass = document.getElementById('txtPass');
    let btnLogin = document.getElementById('btnLogin');
    let imgTipoApp = document.getElementById('imgTipoApp');


    cmbTipoApp.addEventListener('change',()=>{
        switch (cmbTipoApp.value) {
            case "MAESTRO":
                imgTipoApp.src = "../assets/img/maestro.png"
                break;
            case "ALUMNO":
                imgTipoApp.src = "../assets/img/alumno.png"
                break;
            case "ADMINISTRADOR":
                imgTipoApp.src = "../assets/img/administrador.png"
                break;
        }    
    })

    btnLogin.addEventListener('click',()=>{

        fcnLogin(cmbTipoApp.value,txtUser.value,txtPass.value);

    })

}

async function fcnLogin(app,user,pass){
    let callstr = '';
    switch (app) {
        case "MAESTRO":
            callstr = 'maestros/login'
            break;
        case "ALUMNO":
            callstr ='alumnos/login'
            break;
        case "ADMINISTRADOR":
            callstr = 'admin/login'
            break;
    }
    
    var data =JSON.stringify({
        usuario:user,
        clave:pass
    });

    var peticion = new Request(callstr, {
        method: 'POST',
        headers: new Headers({
           'Content-Type': 'application/json'
        }),
        body: data
      });

      await fetch(peticion)
      
      .then(async function(res) {
        console.log('Estado: ', res.status);
        if (res.status==200)
        {
                        
            const json = await res.json();
            const ra = json.rowsAffected;
            if (ra==1){
                json.recordset.map((rows)=>{
                    GlobalUser = rows.USUARIO;
                    GlobalNomUser = rows.NOMBRES;
                    TOKEN = rows.TOKEN;
                    GlobalTipoApp=app;

                    navbar.style = 'visibility:visible';
                    navbartop.style = 'visibility:visible';
                    btnToggler.style = 'visibility:visible';

                    switch (GlobalTipoApp) {
                        case "MAESTRO":
                            GlobalDataUser = rows;
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
                }).join('\n');
            }
        }
      })
      .catch(
          ()=>{
            funciones.AvisoError('Credenciales incorrectas');
          }
      )     
}