const express = require("express");
const routes = express.Router();
const path = require("../utils/path");
const controller = require('../controllers/controller');
const { 
    loginApi, 
    authApi, 
    getProfesoresApi, 
    getMateriasApi, 
    registerApi, 
    getAlumnosApi, 
    deleteProfesorApi, 
    getMatriculasApi,
    createProfesorApi,
    createBitacoraApi,
    getBitacoraApi,
    createMatriculasApi
} = require("../controllers/controller_api");
const { verifyToken, notFound } = require('../middlewares/middlewares');
const { getUserApi } = require("../controllers/controller_api");


routes.get( path.root, controller.root );
routes.post( path.login , loginApi, authApi,createBitacoraApi );
routes.post( path.user, verifyToken, getUserApi,createBitacoraApi );
routes.get( path.profesor, verifyToken, getProfesoresApi,createBitacoraApi );
routes.post( path.createProfesor, verifyToken, createProfesorApi,createBitacoraApi );
routes.get( path.materias, verifyToken, getMateriasApi,createBitacoraApi );
routes.get( path.alumnos, verifyToken, getAlumnosApi,createBitacoraApi );
routes.get( path.matriculas, verifyToken, getMatriculasApi,createBitacoraApi );
routes.post( path.matricula, verifyToken, createMatriculasApi, createBitacoraApi );
routes.post( path.register, verifyToken, registerApi, createBitacoraApi );
routes.delete( path.profesor, verifyToken, deleteProfesorApi,createBitacoraApi );
routes.get( path.bitacora, verifyToken, getBitacoraApi, createBitacoraApi );

//middleware
routes.use(notFound);

module.exports = routes;