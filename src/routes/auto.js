const express = require('express');
const { database } = require('../database.js');
const router = express.Router();

const pool = require('../database.js');

router.get('/',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listAutos = await pool.query('SELECT * FROM autos');
    let idMarca = listAutos.marca
    res.json({
        status:"200",
        message:"Se han recuperado correctamente los autos",
        listAutos: listAutos
    });
});

router.get('/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id=?',[id]);
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente el auto",
        auto: auto
    });
});

router.post('/create',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const dateNow = Date.now();
    const fecha_registro = new Date(dateNow);
    const fecha_actualizacion = new Date(dateNow);
    const {nombre, matricula, verificacion,estado,marca} = req.body;
    const autos={nombre, matricula, verificacion,fecha_registro,fecha_actualizacion,estado,marca};
    await pool.query('INSERT INTO autos set ?', [autos]);
    res.json({
        status:"200",
        message:"Se ha registrado correctamente el auto",
        autos: autos
    });
});

router.post('/update/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    const dateNow = Date.now();
    const fecha_actualizacion = new Date(dateNow);
    const {nombre, matricula, verificacion,estado,marca} = req.body;
    const autos={nombre, matricula, verificacion,fecha_actualizacion,estado,marca};

    await pool.query('UPDATE autos SET ? WHERE id = ?',[autos,id]);
    
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente la oficina",
        autos: autos
    });
});

router.post('/delete/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    await pool.query('DELETE FROM autos WHERE id = ?',[id]);
    res.json({
        status:"200",
        message:"Se ha eliminado correctamente el auto"
    });
});

module.exports = router;