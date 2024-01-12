drop database RAFAELMARIABARALT;

create database RAFAELMARIABARALT;

use RAFAELMARIABARALT;

create table alumno(
    id_alumno int primary key identity(1,1) not null,
    nombre_completo varchar(100) not null,
    cedula varchar(100) not null,
    edad int not null,
    direccion varchar(255) not null,
    id_matricula int not null,
    id_tutor int ,
    id_usuario int not null,
    id_curso int not null,
);


create table tutor (
    id_tutor int primary key identity(1,1) not null,
    nombre_completo varchar(100) not null,
    edad int not null,
    email varchar(100) not null,
    direccion varchar(255) not null,
    cedula varchar(10) not null,
);

create table materia (
    id_materia int primary key identity(1,1) not null,
    nombre_materia varchar(100) not null,
    id_profesor int not null,
);

create table evaluacion (  
    id_evaluacion int primary key identity(1,1) not null,
    nombre_evaluacion varchar(100) not null,
    nota_evaluacion varchar(2) not null,
    fecha_evaluacion datetime,
    id_materia int not null,
);

create table calificacion_alumno(
    id_calificacion int primary key identity(1,1) not null,
    calificacion varchar(2) not null,
    id_alumno int not null,
    id_evaluacion int not null,
);

create table profesor (
    id_profesor int primary key identity(1,1) not null,
    nombre_completo varchar(100) not null,
    cedula varchar(10) not null,
    direccion varchar(255) not null,
    edad int not null,
    id_usuario int not null,
);

create table usuario (
    id_usuario int primary key identity(1,1) not null,
    email varchar(100) not null,
    clave varchar(100) not null,
	id_tipo int not null
);

create table tipo_usuario (
    id_tipo int primary key identity(1,1) not null,
    tipo varchar(100) not null,
);

create table alumno_materia (
  id int primary key identity(1,1) not null,
  id_alumno int references alumno(id_alumno),
  id_materia int references materia(id_materia),
  constraint uq_alumno_materia unique (id_alumno, id_materia)
);

create table profesor_materia (
  id int primary key identity(1,1) not null,
  id_profesor int references profesor(id_profesor),
  id_materia int references materia(id_materia),
  constraint uq_profesor_materia unique (id_profesor, id_materia)
);

create table matricula (
    id_matricula int primary key identity(1,1) not null,
    matricula varchar(10) not null,
);

create table curso (
    id_curso int primary key identity(1,1) not null,
    curso varchar(100) not null,
);

create table solicitud( 
    id_solicitud int primary key identity(1,1) not null,
    solicitud varchar(255) not null,
    curriculum varbinary(max),
    id_tipo_solicitud int not null,
);

create table tipo_solicitud (
    id_tipo_solicitud int primary key identity (1,1) not null,
    tipo_solicitud varchar(255) not null
);

CREATE TABLE BITACORA (
	ID_BITACORA INT PRIMARY KEY IDENTITY(1,1) NOT NULL, 
	ID_USUARIO INT FOREIGN KEY REFERENCES USUARIO(ID_USUARIO) NOT NULL,
	FECHA DATETIME NOT NULL,
	ACTIVIDAD VARCHAR(100) NOT NULL
);

alter table alumno add foreign key (id_tutor) references tutor(id_tutor) on delete cascade on update cascade;
alter table alumno add foreign key (id_usuario) references usuario(id_usuario) on delete cascade on update cascade;
alter table evaluacion add foreign key (id_materia) references materia(id_materia) on delete cascade on update cascade;
alter table alumno add foreign key (id_matricula) references matricula(id_matricula) on delete cascade on update cascade;
alter table alumno add foreign key (id_curso) references curso(id_curso) on delete cascade on update cascade;
alter table calificacion_alumno add foreign key (id_alumno) references alumno(id_alumno) on delete cascade on update cascade;
alter table calificacion_alumno add foreign key (id_evaluacion) references evaluacion(id_evaluacion) on delete cascade on update cascade;
alter table usuario add foreign key (id_tipo) references tipo_usuario(id_tipo) on delete cascade on update cascade;
alter table solicitud add foreign key (id_tipo_solicitud) references tipo_solicitud(id_tipo_solicitud) on delete cascade on update cascade;

insert into tipo_usuario (tipo) values ('alumno'), ('profesor'),('administrador'),('usuario');
insert into usuario (email,clave,id_tipo) values ('avilayestiglet@gmail.com','29622374',3), ('angel26078613@gmail.com','26078613', 3);
insert into usuario (email,clave,id_tipo) values ('sailetquintana@gmail.com','17534491',2);
insert into profesor(nombre_completo, cedula, edad, direccion, id_usuario) values ('Sailet Quintana','17534491',38,'San pedro de los altos',3);


insert into matricula (matricula) values 
    ('C2P1V8T9X5'), 
    ('CK2OVKNUO1'), 
    ('VIL4SQ9ZU4'), 
    ('EZQFL6N4FT'), 
    ('5453IDMWBA'),
    ('OJL1PNHK70'),
    ('SUQ56KGS4F'),
    ('QIUJCQXAQY'),
    ('LP2YMCU8TN');

