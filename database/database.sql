-- ELIMINAR BASE DE DATOS
DROP DATABASE SCHOOL;

-- CREAR UNA BASE DE DATOS 
CREATE DATABASE SCHOOL;

-- USAR BASE DE DATOS
USE SCHOOL;

-- CREAR TABLA USUARIOS
CREATE TABLE USUARIOS(
    id_user int not null IDENTITY(1,1) primary key,
    full_name varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    id_matricula int not null
); 
-- CREAR TABLA MATRICULAS
CREATE TABLE MATRICULAS(
    id_matricula int not null IDENTITY(1,1) primary key,
    matricula varchar(10) not null,
    id_tipo int not null
);

-- CREAR TABLA TIPOUSUARIO
CREATE TABLE TIPOUSUARIO(
  id_tipo int not null IDENTITY(1,1) primary key,
  nombre varchar(100) not null,
);
-- CREAR TABLA ALUMNO
CREATE TABLE ALUMNO(
    id_alumno int not null IDENTITY(1,1) primary key,
    full_name varchar(100) not null,
    matricula varchar(10) not null
);
-- CREAR TABLA PROFESOR
CREATE TABLE PROFESOR(
    id_profesor int not null IDENTITY(1,1) primary key,
    full_name varchar(100) not null,
);
-- CREAR TABLA MATERIA
CREATE TABLE MATERIA(
    id_materia int not null IDENTITY(1,1) primary key,
    nombre varchar(50)
);
-- CREAR TABLA ALUMNO_MATERIRA
CREATE TABLE ALUMNO_MATERIA (
  id INT PRIMARY KEY,
  id_alumno INT REFERENCES ALUMNO(id_alumno),
  id_materia INT REFERENCES MATERIA(id_materia),
  CONSTRAINT UQ_ALUMNO_MATERIA UNIQUE (id_alumno, id_materia)
);

-- consultar tabla alumno materia

-- SELECT MATERIA.nombre FROM ALUMNO JOIN ALUMNO_MATERIA ON ALUMNO.id_alumno = ALUMNO_MATERIA.id_alumno JOIN MATERIA ON ALUMNO_MATERIA.id_materia = MATERIA.id_materia WHERE ALUMNO.id_alumno = 1; 

-- RECUERDA QUE DEBES TERNER TANTO MATERIAS COMO ALUMNO LUEGO UTILIZAS ESTO PARA INSERTAR UN NUEVO DATO EN LA TABLA ALUMNO_MATERIA Y YA PUEDES CONSULTAR LAS MATERIAS QUE VE EL ALUMNO

-- INSERT INTO ALUMNO_MATERIA (id_alumno, id_materia)
-- VALUES
-- (1, 101),
-- (2, 101),
-- (2, 102);

-- CREAR TABLA PROFESOR_MATERIA
CREATE TABLE PROFESOR_MATERIA (
  id INT PRIMARY KEY,
  id_profesor INT REFERENCES PROFESOR(id_profesor),
  id_materia INT REFERENCES MATERIA(id_materia),
  CONSTRAINT UQ_PROFESOR_MATERIA UNIQUE (id_profesor, id_materia)
);

-- consultar tabla profesor materia

-- SELECT MATERIA.nombre FROM PROFESOR JOIN PROFESOR_MATERIA ON PROFESOR.id_profesor = PROFESOR_MATERIA.id_profesor JOIN MATERIA ON PROFESOR_MATERIA.id_materia = MATERIA.id_materia WHERE PROFESOR.id_profesor = 1; 

-- RECUERDA QUE DEBES TERNER TANTO MATERIAS COMO ALUMNO LUEGO UTILIZAS ESTO PARA INSERTAR UN NUEVO DATO EN LA TABLA PROFESOR_MATERIA Y YA PUEDES CONSULTAR LAS MATERIAS QUE VE EL ALUMNO

-- INSERT INTO PROFESOR_MATERIA (id_profesor, id_materia)
-- VALUES
-- (1, 101),
-- (2, 101),
-- (2, 102);
ALTER TABLE MATRICULAS ADD CONSTRAINT uq_matricula UNIQUE (matricula)
ALTER TABLE MATRICULAS ADD FOREIGN KEY (id_tipo) REFERENCES TIPOUSUARIO(id_tipo) ON UPDATE CASCADE;
ALTER TABLE USUARIOS ADD CONSTRAINT FK_USUARIOS_MATRICULAS FOREIGN KEY (id_matricula) REFERENCES MATRICULAS(id_matricula);


INSERT INTO TIPOUSUARIO (nombre) VALUES ('ADMINISTRADOR'), ('PROFESOR'), ('ALUMNO'), ('USUARIO');
INSERT INTO MATRICULAS (matricula, id_tipo) VALUES 
    ('C2P1V8T9X5', 1), 
    ('CK2OVKNUO1', 1), 
    ('VIL4SQ9ZU4', 2), 
    ('EZQFL6N4FT', 2), 
    ('5453IDMWBA', 3),
    ('OJL1PNHK70', 3),
    ('SUQ56KGS4F', 3),
    ('QIUJCQXAQY', 3),
    ('LP2YMCU8TN', 3);

INSERT INTO USUARIOS(full_name, email, password, id_matricula) VALUES 
    ('YESTIGLET NAZARET AVILA QUINTANA', 'yesti@gmail.com', 'yesti2205.', 1),
    ('ANGEL EZEQUIEL LUGO OROPEZA', 'angel@gmail.com', 'angel2205.', 2),
    ('PEDRO RAMON ELIAS', 'pedro@gmail.com', 'angel2205.', 3);