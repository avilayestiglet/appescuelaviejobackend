const conn = require('../config/conn');
const { currentDatetime } = require('../utils/utils');
const querys = {};

querys.userLoginQuery = ({ user }) => `select id_usuario, email, clave, tipo_usuario.id_tipo, tipo from usuario inner join tipo_usuario on usuario.id_tipo = tipo_usuario.id_tipo 
where email = '${user.email}' and clave = '${user.password || user.clave}'`;

querys.userMatriculaQuery = ({ user }) => `select id_usuario, email, clave, tipo_usuario.id_tipo, tipo from usuario inner join tipo_usuario on usuario.id_tipo = tipo_usuario.id_tipo 
where email = '${user.email}' and clave = '${user.password}'`;

querys.userQueryEmail = ({ user }) => `select id_usuario, email, clave, tipo_usuario.id_tipo, tipo from usuario inner join tipo_usuario on usuario.id_tipo = tipo_usuario.id_tipo 
where email = '${user.email}'`;

querys.profesoresAllQuery = () => `select id_profesor, nombre_completo, cedula, direccion, edad, profesor.id_usuario, email, usuario.id_tipo, tipo_usuario.tipo tipo from profesor inner join usuario 
on usuario.id_usuario = profesor.id_usuario inner join tipo_usuario on tipo_usuario.id_tipo = usuario.id_tipo`;

querys.profesoresIdQuery = ({ id }) => `select * from profesor inner join usuario on usuario.id_usuario = profesor.id_usuario id_profesor = '${id}'`;

querys.profesorDeletequery = ({ id }) => `delete from profesor WHERE id_profesor = '${id}'`;

querys.profesorCreatequery = ({ profesor }) => `insert into profesor 
(nombre_completo, cedula, direccion, edad, id_usuario) 
values('${profesor.nombre_completo}', '${profesor.cedula}',
'${profesor.direccion}', ${profesor.edad},
${profesor.id_usuario})`;

querys.materiasAllQuery = () => `SELECT * FROM MATERIA`;
querys.materiasIdQuery = ({ id }) => `SELECT * FROM MATERIA WHERE id = '${id}'`;

querys.alumnoAllQuery = () => `select * from alumno inner join matricula 
on matricula.id_matricula = alumno.id_matricula
inner join tutor on tutor.id_tutor = alumno.id_tutor 
inner join curso on curso.id_curso = alumno.id_curso
inner join usuario on usuario.id_usuario = alumno.id_usuario`;

querys.alumnoIdQuery = ({ id }) => `SELECT * FROM ALUMNO  WHERE id_user = '${id}'`;

querys.alumnoCreate = ({ user }) => `INSERT INTO ALUMNO VALUES ()`

querys.alumnoDeleteQuery = ({id}) => `delete from ALUMNO where id_user = '${id}'`;

querys.matriculasQuery = () => `select * from matricula`;

querys.createMatriculaQuery = (matricula) => `INSERT INTO matricula (matricula) VALUES ('${matricula}')`;

querys.tipoUsuarioQuery = ({ user }) => `select * from tipo_usuario where tipo = '${user.tipo_usuario}'`;

querys.registerQuery = ({ user }) => `insert into usuario (email, clave, id_tipo) 
values ('${user.email}', '${user.password}', '${user.id_tipo}')`;

querys.registerBitacoraQuery = ({ user, activity }) => `insert into bitacora (id_usuario, fecha, actividad) 
values (${user.id_usuario}, '${currentDatetime()}', '${activity}')`;

querys.getBitacoraQuery = () => `
        select id_bitacora
        ,usr.id_usuario
        ,usr.email
        ,bi.fecha
        ,bi.actividad
        from bitacora as bi
        inner join usuario as usr on bi.id_usuario = usr.id_usuario
        order by id_bitacora desc
    `

module.exports = querys;