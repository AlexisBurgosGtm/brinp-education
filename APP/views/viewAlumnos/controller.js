
function Inicializar(){
    
    //BOTON NUEVO ALUMNO
    document.getElementById('btnNuevoAlumno').addEventListener('click',()=>{
        fcnLimpiarDatos();
        $('#ModalNuevoAlumno').modal('show')
    })

    //BOTON GUARDAR
    document.getElementById('btnGuardar').addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea Guardar este Alumno?')
            .then(async (value)=>{
                if(value==true){
                    let codigo = document.getElementById('txtCodigo').value;
                    let fechanac = document.getElementById('txtNacimiento').value;
                    let nombres = document.getElementById('txtNombres').value;
                    let apellidos = document.getElementById('txtApellidos').value;
                    let direccion = document.getElementById('txtDireccion').value;
                    let sexo = document.getElementById('cmbSexo').value;
                    let encargado = document.getElementById('txtEncargado').value;
                    let madre = document.getElementById('txtMadre').value;
                    let padre = document.getElementById('txtPadre').value;
                    let telcasa = document.getElementById('txtTelCasa').value;
                    let telcelular = document.getElementById('txtTelefono').value;
                    let obs = document.getElementById('txtObs').value;                    
                    
                    await fcnGuardar(codigo,fechanac,nombres,apellidos,direccion,sexo,encargado,madre,padre,telcasa,telcelular,obs);            
                }
            })

        
    })

    //BUSQUEDA
    document.getElementById('txtBusqueda').addEventListener('keyup',()=>{
        funciones.crearBusquedaTabla('tblListado',document.getElementById('txtBusqueda').value);
    })

    //CARGA EL GRID O LISTADO DE PRODUCTOS
    fcnCargarGrid('tblAlumnos');

    
};


async function fcnGuardar(codigo,fechanac,nombres,apellidos,direccion,sexo,encargado,madre,padre,telcasa,telcelular,obs){
    var data =JSON.stringify({
        token:TOKEN,
        codigo:codigo,
        fechanac:fechanac,
        nombres:nombres,
        apellidos:apellidos,
        direccion:direccion,
        sexo:sexo,
        encargado:encargado,
        madre:madre,
        padre:padre,
        telcasa:telcasa,
        telefono:telcelular,
        obs:obs
    });

    var peticion = new Request('/alumnos/nuevo', {
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
            funciones.Aviso('Alumno creado exitosamente!!');
            socket.emit('alumno nuevo', document.getElementById('txtCodigo').value || 'sn');
            //cierra el modal
            $('#ModalNuevoAlumno').modal('hide');

             //CARGA EL GRID O LISTADO DE PRODUCTOS
            fcnCargarGrid('tblAlumnos');
        }
      })
      .catch(
          ()=>{
            funciones.AvisoError('No se pudo guardar el Alumno');
          }
      )    
};

async function fcnEliminar(id){
    var data =JSON.stringify({
        token:TOKEN,
        id:id
    });

    var peticion = new Request('/alumnos/eliminar', {
        method: 'DELETE',
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
            funciones.Aviso('Alumno ELIMINADO exitosamente!!');
            await fcnCargarGrid('tblAlumnos');
        }
      })
      .catch(
          ()=>{
            funciones.AvisoError('No se pudo ELIMINAR el Alumno');
          }
      )     
}

async function fcnCargarDetalle(codigo,apellidos,nombres,direccion,sexo,fechanac,encargado,padre,madre,telcasa,telefono,obs){
    
    document.getElementById('txtCodigoData').value = codigo;
    document.getElementById('txtNombresData').value = nombres;
    document.getElementById('txtApellidosData').value = apellidos;
    document.getElementById('txtDireccionData').value = direccion;
    document.getElementById('cmbSexoData').value = sexo;
    document.getElementById('txtNacimientoData').value = fechanac;
    document.getElementById('txtEncargadoData').value = encargado;
    document.getElementById('txtPadreData').value = padre;
    document.getElementById('txtMadreData').value = madre;
    document.getElementById('txtObsData').value = obs;
    document.getElementById('txtTelCasaData').value = telcasa;
    document.getElementById('txtTelefonoData').value = telefono;
};

async function fcnCargarGrid(idContenedor){
    try {

        document.getElementById(idContenedor).innerHTML = '<h6 class="text-danger">Cargando listado de alumnos ...</h6>' 

        const response = await fetch('/alumnos/listado?token=' + TOKEN)
        const json = await response.json();      
         
        let tblBody = json.recordset.map((rows)=>{
       
        return `<tr id=${rows.ID}>
                    <td>${rows.CODIGO}</td>
                    <td>${rows.APELLIDOS}</td>
                    <td>${rows.NOMBRES}</td>
                    <td>${rows.SEXO}</td>
                    <td>${rows.FECHANACIMIENTO}</td>
                    <td>0</td>
                    <td>
                        ${rows.ENCARGADO}
                        <br>
                        <small>${rows.TELCASA} // ${rows.TELCELULAR}</small>
                    </td>
                    <td>
                        <button class="btn btn-md btn-icon btn-warning btn-circle"  data-toggle="modal" data-target="#ModalDetalleAlumno"
                         onclick="fcnCargarDetalle('${rows.CODIGO}','${rows.APELLIDOS}','${rows.NOMBRES}','${rows.DIRECCION}','${rows.SEXO}','${rows.FECHANACIMIENTO}','${rows.ENCARGADO}','${rows.PADRE}','${rows.MADRE}',${rows.TELCASA},${rows.TELCELULAR},'${rows.OBS}');">+
                        </button>
                    </td>
                <td>
                    
                </td>
            </tr>`
       }).join('\n');
       
       document.getElementById(idContenedor).innerHTML = tblBody;

       //funciones.OcultarRows('tblCatalogoProductos')

    } catch (error) {
        document.getElementById(idContenedor).innerHTML = 'No se pudo cargar el Listado de Alumnos' + error;      
    }
};

function fcnLimpiarDatos(){
    document.getElementById('txtCodigo').value = '';
    document.getElementById('txtNacimiento').value= '2019-01-01';
    document.getElementById('txtNombres').value = '';
    document.getElementById('txtApellidos').value = '';
    document.getElementById('txtDireccion').value = 'N/E';
    document.getElementById('cmbSexo').value = 'Masculino';
    document.getElementById('txtEncargado').value = 'N/E';
    document.getElementById('txtMadre').value = 'N/E';
    document.getElementById('txtPadre').value = 'N/E';
    document.getElementById('txtTelCasa').value = '';
    document.getElementById('txtTelefono').value = '';
    document.getElementById('txtObs').value = 'SN';      
}
