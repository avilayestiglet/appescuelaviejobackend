const activity = {};

activity.user = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO USUARIO'; 
        break;
        case 'GET2':
            return 'INICIAR SESIÒN';
        break;
        case 'INSERT':
            return 'INSERTANDO USUARIO'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO USUARIO';
        break;
        case 'DELETE':
            return 'ELIMINANDO USUARIO'; 
        break;
    }
};
activity.profesores = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO PROFESORES'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO PROFESOR';
        break;
        case 'DELETE':
            return 'ELIMINANDO PROFESORES';
        break;
        case 'INSERT':
            return 'CREANDO PROFESOR';
        break;
    }
};
activity.alumnos = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO ALUMNOS'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO ALUMNO';
        break;
        case 'DELETE':
            return 'ELIMINANDO ALUMNO';
        break;
        case 'INSERT':
            return 'CREANDO ALUMNO';
        break;
    }
};
activity.matriculas = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO MATRICULAS'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO MATRICULA';
        break;
        case 'DELETE':
            return 'ELIMINANDO MATRICULA';
        break;
        case 'INSERT':
            return 'CREANDO MATRICULA';
        break;
    }
};

activity.materias = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO MATERIAS'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO MATERIAS';
        break;
        case 'DELETE':
            return 'ELIMINANDO MATERIAS';
        break;
        case 'INSERT':
            return 'CREANDO MATERIAS';
        break;
    }
};

activity.bitacora = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO BITACORA'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO BITACORA';
        break;
        case 'DELETE':
            return 'ELIMINANDO BITACORA';
        break;
        case 'INSERT':
            return 'CREANDO BITACORA';
        break;
    }
};

activity.secciones = (type) => {
    switch(type){
        case 'GET':
            return 'OBTENIENDO SECCIONES'; 
        break;
        case 'UPDATE':
            return 'ACTUALIZANDO SECCIONES';
        break;
        case 'DELETE':
            return 'ELIMINANDO SECCIONES';
        break;
        case 'INSERT':
            return 'CREANDO SECCIONES';
        break;
    }
};

module.exports = activity;