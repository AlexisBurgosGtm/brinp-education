const express = require('express');
const execute = require('./connection')
const router = express.Router();


router.post("/login", async(req,res)=>{
	const {usuario,clave} = req.body;
	let qry =`SELECT CODIGO,TOKEN,NOMBRES FROM EDUCATION_ALUMNOS WHERE CODIGO='${usuario}' AND CLAVE='${clave}'`
	execute.Query(res,qry);
})

router.post("/nuevo", async(req,res)=>{
	const {token,codigo,nombres,apellidos,direccion,fechanac,sexo,encargado,madre,padre,telcasa,telefono,obs} = req.body

	let qry = `INSERT INTO EDUCATION_ALUMNOS 
			(TOKEN,CODIGO,NOMBRES,APELLIDOS,FECHANACIMIENTO,DIRECCION,SEXO,ENCARGADO,MADRE,PADRE,TELCASA,TELCELULAR,OBS) 
			VALUES 
			('${token}','${codigo}','${nombres}','${apellidos}','${fechanac}','${direccion}','${sexo}','${encargado}','${madre}','${padre}',${telcasa},${telefono},'${obs}')`
	execute.Query(res,qry);
});

router.get("/listado", async(req,res)=>{
	let token = req.query.token;

	let qry = `SELECT * FROM EDUCATION_ALUMNOS WHERE TOKEN='${token}'`
	execute.Query(res,qry);
});
	
router.delete("/eliminar", async(req,res)=>{
	const{token,id} = req.body;

	let qry = `DELETE FROM EDUCATION_ALUMNOS WHERE TOKEN='${token}' AND ID=${id}`
	execute.Query(res,qry);
});

module.exports = router;