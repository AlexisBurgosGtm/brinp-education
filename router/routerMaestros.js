const express = require('express');
const execute = require('./connection')
const router = express.Router();

router.post("/login", async(req,res)=>{
	const {usuario,clave} = req.body;
	let qry =`SELECT DPI AS USUARIO, * FROM EDUCATION_MAESTROS WHERE DPI='${usuario}' AND CLAVE='${clave}'`
	execute.Query(res,qry);
})

router.post("/nuevo", async(req,res)=>{
	const {token,dpi,nombres,apellidos,profesion,notitulo,registroescalafonario,igss,ciclo,grado,seccion,telefonos,clave} = req.body

	let qry = `INSERT INTO EDUCATION_MAESTROS 
			(TOKEN,DPI,NOMBRES,APELLIDOS,PROFESION,NOTITULO,REGISTROESCALAFONARIO,IGSS,CICLO,GRADO,SECCION,TELEFONOS,CLAVE) 
			VALUES 
			('${token}','${dpi}','${nombres}','${apellidos}','${profesion}','${notitulo}','${registroescalafonario}',${igss},'${ciclo}','${grado}',${seccion},${telefonos},'${clave}')`
	execute.Query(res,qry);
});

router.get("/detalles", async(req,res)=>{
	//let token = req.query.token;
	let dpi = req.query.dpi;

	let qry = `SELECT * FROM EDUCATION_MAESTROS WHERE DPI='${dpi}'`
	execute.Query(res,qry);
});
	
router.delete("/eliminar", async(req,res)=>{
	let id = req.body.id;

	let qry = `DELETE FROM EDUCATION_MAESTROS WHERE ID=${id}`
	execute.Query(res,qry);
});

module.exports = router;