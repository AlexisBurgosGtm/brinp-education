async function fcnCargarQry(idContenedor,idfiltro){
    try {
        let filtro = document.getElementById(idfiltro).value;

        document.getElementById(idContenedor).innerHTML = '<h6 class="text-danger">Cargando resultado de query ...</h6>' 
        
        const response = await fetch('/admin/consulta?qry=' + filtro)
        const json = await response.json();      
         
        let tblBody = json.recordset.map((rows)=>{
            return JSON.stringify(rows) + '<br><br>';
       }).join('\n');
       
       document.getElementById(idContenedor).innerHTML = tblBody;

    } catch (error) {
        document.getElementById(idContenedor).innerHTML = 'Error en qry...' + error;      
    }

};