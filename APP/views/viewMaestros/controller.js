function InicializarMaestros(){

    getDataUser();

}

function getDataUser(){
    document.getElementById('txtNombre').innerText = GlobalDataUser.NOMBRES;
    document.getElementById('txtApellido').innerText = GlobalDataUser.APELLIDOS;
    
    document.getElementById('txtDpi').value = GlobalDataUser.DPI;
    document.getElementById('txtIgss').value = GlobalDataUser.IGSS;
    document.getElementById('txtNombres').value = GlobalDataUser.NOMBRES;
    document.getElementById('txtApellidos').value = GlobalDataUser.APELLIDOS;
    document.getElementById('txtNoTitulo').value = GlobalDataUser.NOTITULO;
    document.getElementById('txtRegEscalafonario').value = GlobalDataUser.REGISTROESCALAFONARIO;
    document.getElementById('txtCiclo').value = GlobalDataUser.CICLO;
    document.getElementById('txtGrado').value = GlobalDataUser.GRADO;
    document.getElementById('cmbSeccion').value = GlobalDataUser.SECCION;
    document.getElementById('txtClave').value = GlobalDataUser.CLAVE;
}