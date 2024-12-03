document.addEventListener('DOMContentLoaded', () => {

    const eventosDiv = document.querySelectorAll('.evento-opcion');
    const trabajoRealizarCajaPequena = document.querySelectorAll('.trabajoRealizarCajaPequeña')
    const transformadorCambiaPorCajaPequeña = document.querySelectorAll('.transformadorCambiaPorCajaPequeña')
    const condicionEquipoEvaluadoCajaPequena = document.querySelectorAll('.condicionEquipoEvaluadoCajaPequena')
    

    const mainContenido = document.querySelector('.contenido');
    const sectionPlanillasBtn = document.getElementById('section-planillas');
    const sectionEstadisticasBtn = document.getElementById('section-estadisticas');
    const modal = document.getElementById('modal-form');
    const modalPlanilla = document.getElementById('contenedor-planilla-madre');
    const ventanaNegra = document.getElementById('ventana-negra')
    const ventanaNegraPlanilla = document.getElementById('ventana-negra-planilla')
    const crearPlanillaBtn = document.getElementById('crear-planilla-btn');
    const cerrarModalBtn = document.getElementById('cerrar-modal');
    const cerrarModalPlanillaBtn = document.getElementById('cerrar-modal-planilla')
    const listaPlanillas = document.getElementById('lista-planillas');
    const guardarBtn = document.getElementById('guardar-planilla-btn');
    const paginacionDiv = document.getElementById('paginacion');
    const searchInput = document.getElementById('buscar-planillas');  //NO LO QUITEN PORQUE SE DAÑA TODO XD
    const buscarBtn = document.getElementById('search-btn'); // Nuevo botón de búsqueda
    //const buscarInput = document.getElementById('buscar-planillas'); // El input para búsqueda

   // localStorage.removeItem('planillas'); //SI SE DAÑA, ACTIVA ESTA opcion, PARECE QUE HAY UNA cosa CORRUPTA

    // Configuración inicial
    var planillas = JSON.parse(localStorage.getItem('planillas')) || [];
    console.log(planillas)
    let planillaEnEdicion = null; // Planilla en edición
    let verPlanilla = null //Cuadro de planilla
    let paginaActual = 1;
    const elementosPorPagina = 5;

const MostrarPlanillas = () => {

//     const MostrarPlanillas = () => {
//     // Renderizar la estructura inicial en el contenedor
//     mainContenido.innerHTML = `
//         <div id="planillas-section">
//             <button id="crear-planilla-btn">Crear Planilla</button>
//             <input type="text" id="buscar-planillas" placeholder="Buscar planillas...">
//             <button id="search-btn">Buscar</button>
//             <div id="lista-planillas"></div>
//             <div id="paginacion"></div
//     `;>
//         </div>

//     // Reasignar referencias a los elementos generados dinámicamente
//     const crearPlanillaBtn = document.getElementById('crear-planilla-btn');
//     const listaPlanillas = document.getElementById('lista-planillas');
//     const buscarBtn = document.getElementById('search-btn');
//     const searchInput = document.getElementById('buscar-planillas');
//     const paginacionDiv = document.getElementById('paginacion');

//     // Aquí llama a las funciones que cargan datos y eventos
//     cargarPlanillas();

//     // Reagrega los eventos necesarios para los botones dentro de esta sección
//     crearPlanillaBtn.addEventListener('click', () => {
//         modal.classList.remove('hidden');
//     });

//     buscarBtn.addEventListener('click', () => {
//         cargarPlanillas();
//     });
// };


       

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        document.getElementById('marca-transformador').value = '';
        document.getElementById('serial-transformador').value = '';
        document.getElementById('nombreGrupoTrabajo-transformador').value = '';
        document.getElementById('correlativo-transformador').value = '';
        document.getElementById('fechaTrabajo-transformador').value = '';
        document.getElementById('responsableGrupoTrabajo-transformador').value = '';
        document.getElementById('centroServicio-transformador').value = '';
        document.getElementById('operadorMesa-transformador').value = '';

        document.querySelectorAll('input[name="evento"]').forEach(a => a.checked = false);
       
        document.getElementById('numeroEvento-transformador').value = '';
        document.getElementById('subestacion-transformador').value = '';
        document.getElementById('estado-transformador').value = '';
        document.getElementById('municipio-transformador').value = '';
        document.getElementById('sectorParroquiaNPlano-transformador').value = '';
        document.getElementById('circuito-transformador').value = '';
        document.getElementById('numeroPosteUbicacion-transformador').value = '';
        document.getElementById('identificacion-transformador').value = '';
        document.getElementById('direccionPuntoReferencia-transformador').value = '';

        document.querySelectorAll('input[name="trabajoRealizar"]').forEach(a => a.checked = false);
        document.querySelectorAll('input[name="transformadorCambiaPor"]').forEach(a => a.checked = false);

        document.getElementById('numeroUsuariosAfectados-transformador').value = '';
        document.getElementById('observaciones-transformador').value = '';

        // PARA SER LLENADO POR EL RESPONSABLE DEL TRABAJO EN CAMPO/SUPERVISOR TÉCNICO

        document.getElementById('nombreSupervisorTecnico-transformador').value = '';
        document.getElementById('firmaSupervisorTecnico-transformador').value = '';
        document.getElementById('cedulaSupervisorTecnico-transformador').value = '';
        document.getElementById('numeroReservaSupervisorTecnico-transformador').value = '';
        document.getElementById('FechaSolicitudSupervisorTecnico-transformador').value = '';
        document.getElementById('tensionesPrimarias-transformador').value = '';
        document.getElementById('tensionesSecundarias-transformador').value = '';
        document.getElementById('kva-transformador').value = '';
        document.getElementById('añoFabricacion-transformador').value = '';
        document.getElementById('retiradoNombre-transformador').value = '';
        document.getElementById('retiradoFecha-transformador').value = '';
        document.getElementById('retiradoHora-transformador').value = '';
        document.getElementById('sustitutoMarca-transformador').value = '';
        document.getElementById('sustitutoSerial-transformador').value = '';
        document.getElementById('sustitutoCapacidad-transformador').value = '';
        document.getElementById('sustitutoAnoFab-transformador').value = '';

        // PARA SER LLENADO POR EL RESPONSABLE DEL CENTRO DE SERVICIO AL RECIBIR UN EQUIPO RETIRADO DE LA RED

        document.getElementById('centroServicioNombre-transformador').value = '';
        document.getElementById('centroServicioFecha-transformador').value = '';
        document.getElementById('centroServicioHora-transformador').value = '';
        document.getElementById('centroServicioSello-transformador').value = '';
        document.getElementById('centroServicioEstadoFisico-transformador').value = '';

        // PARA SER LLENADO POR LA DIVISIÓN DE MANTENIMIENTO ESPECIALIZADO DE DISTRIBUCIÓN

        document.getElementById('divManEsDiNombre-transformador').value = '';
        document.getElementById('divManEsDiFecha-transformador').value = '';
        document.getElementById('divManEsDiHora-transformador').value = '';

        document.querySelectorAll('input[name="divManEsDiCondicion"]').forEach(a => a.checked = false);

        // DIAGNÓSTICO OBTENIDO

        document.getElementById('diagnosticoObtenido-transformador').value = '';

        // PARA SER LLENADO POR LA UNIDAD QUE RETIRA EL EQUIPO

        document.getElementById('tallerReparacionesMenores-transformador').value = '';
        document.getElementById('plantaRecuperacionTransformadores-transformador').value = '';

        document.getElementById('fabricante-transformador').value = '';
        document.getElementById('plantaRecuperacionTransformadoresPorExternos-transformador').value = '';

        document.getElementById('unidadRetiraEquipoNombre-transformador').value = '';
        document.getElementById('unidadRetiraEquipoSello-transformador').value = '';
        document.getElementById('unidadRetiraEquipoFecha-transformador').value = '';
        document.getElementById('unidadRetiraEquipoHora-transformador').value = '';
    };

    // Función para llenar el formulario con datos existentes
    const llenarFormulario = (planilla) => {
        

        document.getElementById('nombreGrupoTrabajo-transformador').value = planilla.nombreGrupoTrabajo;
        document.getElementById('correlativo-transformador').value = planilla.correlativo;
        document.getElementById('fechaTrabajo-transformador').value = planilla.fechaTrabajo;
        document.getElementById('responsableGrupoTrabajo-transformador').value = planilla.responsableGrupoTrabajo;
        document.getElementById('centroServicio-transformador').value = planilla.centroServicio;
        document.getElementById('operadorMesa-transformador').value = planilla.operadorMesa;

        planilla.evento == null? document.querySelectorAll('input[name="evento"]').forEach( a=> a.checked=false ) : document.querySelector('input[name="evento"][value="' + planilla.evento + '"]').checked=true

        document.getElementById('numeroEvento-transformador').value = planilla.numeroEvento;
        document.getElementById('subestacion-transformador').value = planilla.subestacion;
        document.getElementById('estado-transformador').value = planilla.estado;
        document.getElementById('municipio-transformador').value = planilla.municipio;
        document.getElementById('sectorParroquiaNPlano-transformador').value = planilla.sectorParroquiaNPlano;
        document.getElementById('circuito-transformador').value = planilla.circuito;
        document.getElementById('numeroPosteUbicacion-transformador').value = planilla.numeroPosteUbicacion;
        document.getElementById('identificacion-transformador').value = planilla.identificacion;
        document.getElementById('direccionPuntoReferencia-transformador').value = planilla.direccionPuntoReferencia;

        planilla.trabajoRealizar == null? document.querySelectorAll('input[name="trabajoRealizar"]').forEach( a=> a.checked=false ) : document.querySelector('input[name="trabajoRealizar"][value="' + planilla.trabajoRealizar + '"]').checked=true
        planilla.transformadorCambiaPor == null? document.querySelectorAll('input[name="transformadorCambiaPor"]').forEach( a=> a.checked=false ) : document.querySelector('input[name="transformadorCambiaPor"][value="' + planilla.transformadorCambiaPor + '"]').checked=true
        document.getElementById('numeroUsuariosAfectados-transformador').value = planilla.numeroUsuariosAfectados;
        document.getElementById('observaciones-transformador').value = planilla.observaciones;


        //PARA SER LLENADO POR EL RESPONSABLE DEL TRABAJO EN CAMPO/SUPERVISOR TECNICO

        document.getElementById('nombreSupervisorTecnico-transformador').value = planilla.nombreSupervisorTecnico;
        document.getElementById('firmaSupervisorTecnico-transformador').value = planilla.firmaSupervisorTecnico;
        document.getElementById('cedulaSupervisorTecnico-transformador').value = planilla.cedulaSupervisorTecnico;
        document.getElementById('numeroReservaSupervisorTecnico-transformador').value = planilla.numeroReservaSupervisorTecnico;
        document.getElementById('FechaSolicitudSupervisorTecnico-transformador').value = planilla.FechaSolicitudSupervisorTecnico;
        document.getElementById('tensionesPrimarias-transformador').value = planilla.tensionesPrimarias;
        document.getElementById('tensionesSecundarias-transformador').value = planilla.tensionesSecundarias;
        document.getElementById('kva-transformador').value = planilla.kva;
        document.getElementById('serial-transformador').value = planilla.serial;  //serial obligatorio, si no, no carga la planilla
        document.getElementById('marca-transformador').value = planilla.marca;
        document.getElementById('añoFabricacion-transformador').value = planilla.añoFabricacion;
        document.getElementById('retiradoNombre-transformador').value = planilla.retiradoNombre;
        document.getElementById('retiradoFecha-transformador').value = planilla.retiradoFecha;
        document.getElementById('retiradoHora-transformador').value = planilla.retiradoHora;
        document.getElementById('sustitutoMarca-transformador').value = planilla.sustitutoMarca;
        document.getElementById('sustitutoSerial-transformador').value = planilla.sustitutoSerial;
        document.getElementById('sustitutoCapacidad-transformador').value = planilla.sustitutoCapacidad;
        document.getElementById('sustitutoAnoFab-transformador').value = planilla.sustitutoAnoFab;

        //PARA SER LLENADO POR EL RESPONSABLE DEL CENTRO DE SERVICIO AL RECIBIR UN EQUIPO RETIRADO DE LA RED

        document.getElementById('centroServicioNombre-transformador').value = planilla.centroServicioNombre;
        document.getElementById('centroServicioFecha-transformador').value = planilla.centroServicioFecha;
        document.getElementById('centroServicioHora-transformador').value = planilla.centroServicioHora;
        document.getElementById('centroServicioSello-transformador').value = planilla.centroServicioSello;
        document.getElementById('centroServicioEstadoFisico-transformador').value = planilla.centroServicioEstadoFisico;
        
        //PARA SER LLENADO POR LA DIVISION DE MANTENIMIENTO ESPECIALIZADO DE DISTRIBUCION

        document.getElementById('divManEsDiNombre-transformador').value = planilla.divManEsDiNombre;
        document.getElementById('divManEsDiFecha-transformador').value = planilla.divManEsDiFecha;
        document.getElementById('divManEsDiHora-transformador').value = planilla.divManEsDiHora;
        
        planilla.divManEsDiCondicion == null? document.querySelectorAll('input[name="divManEsDiCondicion"]').forEach( a=> a.checked=false ) : document.querySelector('input[name="divManEsDiCondicion"][value="' + planilla.divManEsDiCondicion + '"]').checked=true

        //DIAGNOSTICO OBTENIDO

        document.getElementById('diagnosticoObtenido-transformador').value = planilla.diagnosticoObtenido;

        //PARA SER LLENADO POR LA UNIDAD QUE RETIRA EL EQUIPO

        document.getElementById('tallerReparacionesMenores-transformador').value = planilla.tallerReparacionesMenores;
        document.getElementById('plantaRecuperacionTransformadores-transformador').value = planilla.plantaRecuperacionTransformadores;

        document.getElementById('fabricante-transformador').value = planilla.fabricante;
        document.getElementById('plantaRecuperacionTransformadoresPorExternos-transformador').value = planilla.plantaRecuperacionTransformadoresPorExternos;



        document.getElementById('unidadRetiraEquipoNombre-transformador').value = planilla.unidadRetiraEquipoNombre;
        document.getElementById('unidadRetiraEquipoSello-transformador').value = planilla.unidadRetiraEquipoSello;
        document.getElementById('unidadRetiraEquipoFecha-transformador').value = planilla.unidadRetiraEquipoFecha;
        document.getElementById('unidadRetiraEquipoHora-transformador').value = planilla.unidadRetiraEquipoHora;
        






    };

    const llenarPlanilla = (planillaEncontrada) => {
        document.getElementById('nombreGrupoTrabajo-planilla').innerHTML = planillaEncontrada.nombreGrupoTrabajo
        document.getElementById('correlativo-planilla').innerHTML = planillaEncontrada.correlativo
        document.getElementById('fechaTrabajo-dato-planilla').innerHTML = planillaEncontrada.fechaTrabajo

        document.getElementById('nombreResponsableGrupoTrabajo-dato-planilla').innerHTML = planillaEncontrada.responsableGrupoTrabajo
        document.getElementById('centroServicio-dato-planilla').innerHTML = planillaEncontrada.centroServicio
        document.getElementById('operadorMesa-dato-planilla').innerHTML = planillaEncontrada.operadorMesa

        eventosDiv.forEach((elemento)=> {
            elemento.innerHTML = '';
            elemento.style.backgroundColor = "white";
    })
        if(planillaEncontrada.evento=="averia") {
            eventosDiv[0].innerHTML = "X"
            eventosDiv[0].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.evento=="proyecto") {
            eventosDiv[1].innerHTML = "X"
            eventosDiv[1].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.evento=="orden de") {
            eventosDiv[2].innerHTML = "X"
            eventosDiv[2].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.evento=="memo") {
            eventosDiv[3].innerHTML = "X"
            eventosDiv[3].style.backgroundColor = "#c62bc3"
        }



        document.getElementById('numeroEvento-dato-planilla').innerHTML = planillaEncontrada.numeroEvento
        document.getElementById('subestacion-dato-planilla').innerHTML = planillaEncontrada.subestacion
        document.getElementById('estado-dato-planilla').innerHTML = planillaEncontrada.estado
        document.getElementById('municipio-dato-planilla').innerHTML = planillaEncontrada.municipio
        document.getElementById('sectorParroquiaNPlano-dato-planilla').innerHTML = planillaEncontrada.sectorParroquiaNPlano
        document.getElementById('circuito-dato-planilla').innerHTML = planillaEncontrada.circuito
        document.getElementById('numeroPosteUbicacion-dato-planilla').innerHTML = planillaEncontrada.numeroPosteUbicacion
        document.getElementById('identificacion-dato-planilla').innerHTML = planillaEncontrada.identificacion


        trabajoRealizarCajaPequena.forEach((elemento)=> {
            elemento.innerHTML = '';
            elemento.style.backgroundColor = "white";
    })
        if(planillaEncontrada.trabajoRealizar=="solo retiro") {
            trabajoRealizarCajaPequena[0].innerHTML = "X"
            trabajoRealizarCajaPequena[0].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.trabajoRealizar=="cambio de equipo") {
            trabajoRealizarCajaPequena[1].innerHTML = "X"
            trabajoRealizarCajaPequena[1].style.backgroundColor = "#c62bc3"
        }




        transformadorCambiaPorCajaPequeña.forEach((elemento)=> {
            elemento.innerHTML = '';
            elemento.style.backgroundColor = "white";
    })
        if(planillaEncontrada.transformadorCambiaPor=="igual capacidad") {
            transformadorCambiaPorCajaPequeña[0].innerHTML = "X"
            transformadorCambiaPorCajaPequeña[0].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.transformadorCambiaPor=="diferente capacidad") {
            transformadorCambiaPorCajaPequeña[1].innerHTML = "X"
            transformadorCambiaPorCajaPequeña[1].style.backgroundColor = "#c62bc3"
        }
       





        document.getElementById('direccionPuntoReferencia-dato-planilla').innerHTML = planillaEncontrada.direccionPuntoReferencia
        document.getElementById('numeroUsuariosAfectados-dato-planilla').innerHTML = planillaEncontrada.numeroUsuariosAfectados;
        document.getElementById('observaciones-dato-planilla').innerHTML = planillaEncontrada.observaciones;


        document.getElementById('nombreSupervisorTecnico-dato-planilla').innerHTML = planillaEncontrada.nombreSupervisorTecnico;
        document.getElementById('firmaSupervisorTecnico-dato-planilla').innerHTML = planillaEncontrada.firmaSupervisorTecnico;
        document.getElementById('cedulaSupervisorTecnico-dato-planilla').innerHTML = planillaEncontrada.cedulaSupervisorTecnico;
        document.getElementById('numeroReservaSupervisorTecnico-dato-planilla').innerHTML = planillaEncontrada.numeroReservaSupervisorTecnico;
        document.getElementById('FechaSolicitudSupervisorTecnico-dato-planilla').innerHTML = planillaEncontrada.FechaSolicitudSupervisorTecnico;
        document.getElementById('tensionesPrimarias-dato-planilla').innerHTML = planillaEncontrada.tensionesPrimarias;
        document.getElementById('tensionesSecundarias-dato-planilla').innerHTML = planillaEncontrada.tensionesSecundarias;
        document.getElementById('kva-dato-planilla').innerHTML = planillaEncontrada.kva;
        document.getElementById('serial-dato-planilla').innerHTML = planillaEncontrada.serial;
        document.getElementById('marca-dato-planilla').innerHTML = planillaEncontrada.marca;
        document.getElementById('añoFabricacion-dato-planilla').innerHTML = planillaEncontrada.añoFabricacion;
        document.getElementById('retiradoNombre-dato-planilla').innerHTML = planillaEncontrada.retiradoNombre;
        document.getElementById('retiradoFecha-dato-planilla').innerHTML = planillaEncontrada.retiradoFecha;
        document.getElementById('retiradoHora-dato-planilla').innerHTML = planillaEncontrada.retiradoHora;
        document.getElementById('sustitutoMarca-dato-planilla').innerHTML = planillaEncontrada.sustitutoMarca;
        document.getElementById('sustitutoSerial-dato-planilla').innerHTML = planillaEncontrada.sustitutoSerial;
        document.getElementById('sustitutoCapacidad-dato-planilla').innerHTML = planillaEncontrada.sustitutoCapacidad;


         //PARA SER LLENADO POR EL RESPONSABLE DEL CENTRO DE SERVICIO AL RECIBIR UN EQUIPO RETIRADO DE LA RED

         document.getElementById('centroServicioNombre-dato-planilla').innerHTML = planillaEncontrada.centroServicioNombre;
         document.getElementById('centroServicioFecha-dato-planilla').innerHTML = planillaEncontrada.centroServicioFecha;
         document.getElementById('centroServicioHora-dato-planilla').innerHTML = planillaEncontrada.centroServicioHora;
         document.getElementById('centroServicioSello-dato-planilla').innerHTML = planillaEncontrada.centroServicioSello;
         document.getElementById('centroServicioEstadoFisico-dato-planilla').innerHTML = planillaEncontrada.centroServicioEstadoFisico;

         //PARA SER LLENADO POR LA DIVISION DE MANTENIMIENTO ESPECIALIZADO DE DISTRIBUCION
         document.getElementById('divManEsDiNombre-dato-planilla').innerHTML = planillaEncontrada.divManEsDiNombre;
         document.getElementById('divManEsDiFecha-dato-planilla').innerHTML = planillaEncontrada.divManEsDiFecha;
         document.getElementById('divManEsDiHora-dato-planilla').innerHTML = planillaEncontrada.divManEsDiHora;


         condicionEquipoEvaluadoCajaPequena.forEach((elemento)=> {
            elemento.innerHTML = '';
            elemento.style.backgroundColor = "white";
    })
        if(planillaEncontrada.divManEsDiCondicion=="mantenimiento") {
            condicionEquipoEvaluadoCajaPequena[0].innerHTML = "X"
            condicionEquipoEvaluadoCajaPequena[0].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.divManEsDiCondicion=="garantia") {
            condicionEquipoEvaluadoCajaPequena[1].innerHTML = "X"
            condicionEquipoEvaluadoCajaPequena[1].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.divManEsDiCondicion=="reconstruccion") {
            condicionEquipoEvaluadoCajaPequena[2].innerHTML = "X"
            condicionEquipoEvaluadoCajaPequena[2].style.backgroundColor = "#c62bc3"
        }
        else if(planillaEncontrada.divManEsDiCondicion=="no procesable") {
            condicionEquipoEvaluadoCajaPequena[3].innerHTML = "X"
            condicionEquipoEvaluadoCajaPequena[3].style.backgroundColor = "#c62bc3"
        }


         //DIAGNOSTICO OBTENIDO
         document.getElementById('diagnosticoObtenido-dato-planilla').innerHTML = planillaEncontrada.diagnosticoObtenido;

         //PARA SER LLENADO POR LA UNIDAD QUE RETIRA EL EQUIPO
         document.getElementById('tallerReparacionesMenores-dato-planilla').innerHTML = planillaEncontrada.tallerReparacionesMenores;
         document.getElementById('plantaRecuperacionTransformadores-dato-planilla').innerHTML = planillaEncontrada.plantaRecuperacionTransformadores;

        document.getElementById('fabricante-dato-planilla').innerHTML = planillaEncontrada.fabricante;
        document.getElementById('plantaRecuperacionTransformadoresPorExternos-dato-planilla').innerHTML = planillaEncontrada.plantaRecuperacionTransformadoresPorExternos;
    

        document.getElementById('unidadRetiraEquipoNombre-dato-planilla').innerHTML = planillaEncontrada.unidadRetiraEquipoNombre;
        document.getElementById('unidadRetiraEquipoSello-dato-planilla').innerHTML = planillaEncontrada.unidadRetiraEquipoSello;
        document.getElementById('unidadRetiraEquipoFecha-dato-planilla').innerHTML = planillaEncontrada.unidadRetiraEquipoFecha;
        document.getElementById('unidadRetiraEquipoHora-dato-planilla').innerHTML = planillaEncontrada.unidadRetiraEquipoHora;



    }   


    // Función para guardar las planillas en LocalStorage
    const guardarEnLocalStorage = () => {
        localStorage.setItem('planillas', JSON.stringify(planillas));
    };



    // Función para filtrar planillas por búsqueda
    const buscarPlanillas = (query) => {
        const upperCaseQuery = query.toUpperCase();   
        return planillas.filter(planilla => 
            planilla.serial.toUpperCase().includes(upperCaseQuery) || 
            planilla.marca.toUpperCase().includes(upperCaseQuery)
        );
    };

    // Función para obtener las planillas de la página actual
    const obtenerPlanillasPorPagina = (planillas, pagina) => {
        const inicio = (pagina - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        return planillas.slice(inicio, fin);
    };

    // Función para renderizar las planillas
    const cargarPlanillas = () => {

        // Obtener el texto de búsqueda y filtrar
        const searchTerm = searchInput.value.toUpperCase();
        const planillasFiltradas = planillas.filter(planilla =>
            planilla.marca.toUpperCase().includes(searchTerm) ||
            planilla.serial.toUpperCase().includes(searchTerm)
        );

        // Ordenar las planillas por id (reciente primero)
        const planillasOrdenadas = planillasFiltradas.sort((a, b) => b.id - a.id);
        const planillasPorPagina = obtenerPlanillasPorPagina(planillasOrdenadas, paginaActual);

        listaPlanillas.innerHTML = ''; // Limpiar lista actual
        planillasPorPagina.forEach((planilla) => {
            const planillaDiv = document.createElement('div');
            planillaDiv.classList.add('elementoPlanilla');
            planillaDiv.innerHTML = `
                <div class="elementoPlanilla__informacion">
                    <span>Marca: ${planilla.marca}</span>
                    <span>Serial: ${planilla.serial}</span>
                </div>
                <div class="elementoPlanilla__botones">
                    <button class="editar-btn elementoPlanilla-botones" data-id="${planilla.id}">Editar</button>
                    <button class="descargar-btn elementoPlanilla-botones" data-id="${planilla.id}">Descargar</button>
                    <button class="borrar-btn elementoPlanilla-botones" data-id="${planilla.id}">Borrar</button>
                </div>
            `;
            listaPlanillas.appendChild(planillaDiv);
        });

        // Renderizar la paginación
        renderizarPaginacion(planillasOrdenadas.length);
    };


//REVISAR 




    // Función para manejar la paginación
    const renderizarPaginacion = (totalElementos) => {
        const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
        paginacionDiv.innerHTML = ''; // Limpiar la paginación

        // Flecha izquierda
        const flechaIzquierda = document.createElement('button');
        flechaIzquierda.textContent = '«';
        flechaIzquierda.disabled = paginaActual === 1;
        flechaIzquierda.addEventListener('click', () => {
            if (paginaActual > 1) {
                paginaActual--;
                cargarPlanillas();
            }
        });
        paginacionDiv.appendChild(flechaIzquierda);

        // Calcular páginas visibles (3 siempre)
        const paginasAMostrar = [];
        for (let i = paginaActual - 1; i <= paginaActual + 1; i++) {
            if (i > 0 && i <= totalPaginas) {
                paginasAMostrar.push(i);
            }
        }

        // Rellenar con ficticios si hay menos de 3 páginas
        while (paginasAMostrar.length < 3) {
            if (paginasAMostrar[0] > 1) {
                paginasAMostrar.unshift(paginasAMostrar[0] - 1);
            } else if (paginasAMostrar[paginasAMostrar.length - 1] < totalPaginas) {
                paginasAMostrar.push(paginasAMostrar[paginasAMostrar.length - 1] + 1);
            } else {
                paginasAMostrar.push(paginasAMostrar.length + 1);
            }
        }

        // Crear los botones de páginas
        paginasAMostrar.forEach((pagina) => {
            const boton = document.createElement('button');
            boton.textContent = pagina;
            boton.style.backgroundColor = pagina === paginaActual ? 'black' : 'white';
            boton.style.color = pagina === paginaActual ? 'white' : 'black';

            if (pagina > totalPaginas) {
                boton.disabled = true; // Deshabilitar botones ficticios
                boton.style.opacity = 0.5; // Visualmente inactivos
            } else {
                boton.addEventListener('click', () => {
                    paginaActual = pagina;
                    cargarPlanillas();
                });
            }
            paginacionDiv.appendChild(boton);
        });

        // Flecha derecha
        const flechaDerecha = document.createElement('button');
        flechaDerecha.textContent = '»';
        flechaDerecha.disabled = paginaActual === totalPaginas || totalPaginas === 0;
        flechaDerecha.addEventListener('click', () => {
            if (paginaActual < totalPaginas) {
                paginaActual++;
                cargarPlanillas();
            }
        });
        paginacionDiv.appendChild(flechaDerecha);
    };

    // Evento para abrir el modal
    crearPlanillaBtn.addEventListener('click', () => {
        limpiarFormulario();
        planillaEnEdicion = null;
        modal.classList.remove('hidden');
        ventanaNegra.classList.remove('hidden');
    });

    // Evento para cerrar el modal
    cerrarModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        ventanaNegra.classList.add('hidden');
    });

    // Evento para cerral modal de planilla 
    cerrarModalPlanillaBtn.addEventListener('click', ()=> {
        modalPlanilla.classList.add('planilla-hidden')
        ventanaNegraPlanilla.classList.add('planilla-hidden')
    })

    console.log(document.querySelectorAll('input[name="evento"]')[1])
    // Evento para guardar planilla
    guardarBtn.addEventListener('click', () => {
       
        


        const nombreGrupoTrabajo = document.getElementById('nombreGrupoTrabajo-transformador').value.trim();
        const correlativo = document.getElementById('correlativo-transformador').value.trim();
        const fechaTrabajo = document.getElementById('fechaTrabajo-transformador').value.trim();
        const responsableGrupoTrabajo = document.getElementById('responsableGrupoTrabajo-transformador').value.trim();
        const centroServicio = document.getElementById('centroServicio-transformador').value.trim();
        const operadorMesa = document.getElementById('operadorMesa-transformador').value.trim();
        
        // RESPALDO
        // const evento = document.querySelector('input[name="evento"]:checked').value;
        const evento = document.querySelector('input[name="evento"]:checked') ? 
                   document.querySelector('input[name="evento"]:checked').value : null;


        
        
       

        const numeroEvento = document.getElementById('numeroEvento-transformador').value.trim();
        const subestacion = document.getElementById('subestacion-transformador').value.trim();
        const estado = document.getElementById('estado-transformador').value.trim();
        const municipio = document.getElementById('municipio-transformador').value.trim();
        const sectorParroquiaNPlano = document.getElementById('sectorParroquiaNPlano-transformador').value.trim();
        const circuito = document.getElementById('circuito-transformador').value.trim();
        const numeroPosteUbicacion = document.getElementById('numeroPosteUbicacion-transformador').value.trim();
        const identificacion = document.getElementById('identificacion-transformador').value.trim();
        const direccionPuntoReferencia = document.getElementById('direccionPuntoReferencia-transformador').value.trim();
        
        // RESPALDO
        // const trabajoRealizar = document.querySelector('input[name="trabajoRealizar"]:checked').value;
        const trabajoRealizar = document.querySelector('input[name="trabajoRealizar"]:checked') ? 
                   document.querySelector('input[name="trabajoRealizar"]:checked').value : null;
             

       
        // RESPALDO
        // const transformadorCambiaPor = document.querySelector('input[name="transformadorCambiaPor"]:checked').value;
         const transformadorCambiaPor = document.querySelector('input[name="transformadorCambiaPor"]:checked') ? 
                   document.querySelector('input[name="transformadorCambiaPor"]:checked').value : null;

        const numeroUsuariosAfectados = document.getElementById('numeroUsuariosAfectados-transformador').value.trim();
        const observaciones = document.getElementById('observaciones-transformador').value.trim();
        const nombreSupervisorTecnico = document.getElementById('nombreSupervisorTecnico-transformador').value.trim();
        const firmaSupervisorTecnico = document.getElementById('firmaSupervisorTecnico-transformador').value.trim();
        const cedulaSupervisorTecnico = document.getElementById('cedulaSupervisorTecnico-transformador').value.trim();
        const numeroReservaSupervisorTecnico = document.getElementById('numeroReservaSupervisorTecnico-transformador').value.trim();
        const FechaSolicitudSupervisorTecnico = document.getElementById('FechaSolicitudSupervisorTecnico-transformador').value.trim();
        const tensionesPrimarias = document.getElementById('tensionesPrimarias-transformador').value.trim();
        const tensionesSecundarias = document.getElementById('tensionesSecundarias-transformador').value.trim();
        const kva = document.getElementById('kva-transformador').value.trim();

        const marca = document.getElementById('marca-transformador').value.trim();
        const serial = document.getElementById('serial-transformador').value.trim();



        const añoFabricacion = document.getElementById('añoFabricacion-transformador').value.trim();
        const retiradoNombre = document.getElementById('retiradoNombre-transformador').value.trim();
        const retiradoFecha = document.getElementById('retiradoFecha-transformador').value.trim();
        const retiradoHora = document.getElementById('retiradoHora-transformador').value.trim();
        const sustitutoMarca = document.getElementById('sustitutoMarca-transformador').value.trim();
        const sustitutoSerial = document.getElementById('sustitutoSerial-transformador').value.trim();
        const sustitutoCapacidad = document.getElementById('sustitutoCapacidad-transformador').value.trim();
        const sustitutoAnoFab = document.getElementById('sustitutoAnoFab-transformador').value.trim();
        const centroServicioNombre = document.getElementById('centroServicioNombre-transformador').value.trim();
        const centroServicioFecha = document.getElementById('centroServicioFecha-transformador').value.trim();
        const centroServicioHora = document.getElementById('centroServicioHora-transformador').value.trim();
        const centroServicioSello = document.getElementById('centroServicioSello-transformador').value.trim();
        const centroServicioEstadoFisico = document.getElementById('centroServicioEstadoFisico-transformador').value.trim();
        const divManEsDiNombre = document.getElementById('divManEsDiNombre-transformador').value.trim();
        const divManEsDiFecha = document.getElementById('divManEsDiFecha-transformador').value.trim();
        const divManEsDiHora = document.getElementById('divManEsDiHora-transformador').value.trim();

       
        // RESPALDO
        // const divManEsDiCondicion = document.querySelector('input[name="divManEsDiCondicion"]:checked').value;
        const divManEsDiCondicion = document.querySelector('input[name="divManEsDiCondicion"]:checked') ? 
                   document.querySelector('input[name="divManEsDiCondicion"]:checked').value : null;

        const diagnosticoObtenido = document.getElementById('diagnosticoObtenido-transformador').value.trim();
        const tallerReparacionesMenores = document.getElementById('tallerReparacionesMenores-transformador').value.trim();
        const plantaRecuperacionTransformadores = document.getElementById('plantaRecuperacionTransformadores-transformador').value.trim();
        const fabricante = document.getElementById('fabricante-transformador').value.trim();
        const plantaRecuperacionTransformadoresPorExternos = document.getElementById('plantaRecuperacionTransformadoresPorExternos-transformador').value.trim();
        const unidadRetiraEquipoNombre = document.getElementById('unidadRetiraEquipoNombre-transformador').value.trim();
        const unidadRetiraEquipoSello = document.getElementById('unidadRetiraEquipoSello-transformador').value.trim();
        const unidadRetiraEquipoFecha = document.getElementById('unidadRetiraEquipoFecha-transformador').value.trim();
        const unidadRetiraEquipoHora = document.getElementById('unidadRetiraEquipoHora-transformador').value.trim();
        


        if (!marca || !serial) {
            alert('Por favor, complete el campo MARCA y SERIAL antes de guardar');
            return;
        }

        if (planillaEnEdicion) {
            planillaEnEdicion.nombreGrupoTrabajo = nombreGrupoTrabajo;
            planillaEnEdicion.correlativo = correlativo;
            planillaEnEdicion.fechaTrabajo = fechaTrabajo;
            planillaEnEdicion.responsableGrupoTrabajo = responsableGrupoTrabajo;
            planillaEnEdicion.centroServicio = centroServicio;
            planillaEnEdicion.operadorMesa = operadorMesa;
            planillaEnEdicion.evento = evento; 
            planillaEnEdicion.numeroEvento = numeroEvento;
            planillaEnEdicion.subestacion = subestacion;
            planillaEnEdicion.estado = estado;
            planillaEnEdicion.municipio = municipio;
            planillaEnEdicion.sectorParroquiaNPlano = sectorParroquiaNPlano;
            planillaEnEdicion.circuito = circuito;
            planillaEnEdicion.numeroPosteUbicacion = numeroPosteUbicacion;
            planillaEnEdicion.identificacion = identificacion;
            planillaEnEdicion.direccionPuntoReferencia = direccionPuntoReferencia;
            planillaEnEdicion.trabajoRealizar = trabajoRealizar;
            planillaEnEdicion.transformadorCambiaPor = transformadorCambiaPor;
            planillaEnEdicion.numeroUsuariosAfectados = numeroUsuariosAfectados;
            planillaEnEdicion.observaciones = observaciones;
            planillaEnEdicion.nombreSupervisorTecnico = nombreSupervisorTecnico;
            planillaEnEdicion.firmaSupervisorTecnico = firmaSupervisorTecnico;
            planillaEnEdicion.cedulaSupervisorTecnico = cedulaSupervisorTecnico;
            planillaEnEdicion.numeroReservaSupervisorTecnico = numeroReservaSupervisorTecnico;
            planillaEnEdicion.FechaSolicitudSupervisorTecnico = FechaSolicitudSupervisorTecnico;
            planillaEnEdicion.tensionesPrimarias = tensionesPrimarias;
            planillaEnEdicion.tensionesSecundarias = tensionesSecundarias;
            planillaEnEdicion.kva = kva;
            planillaEnEdicion.serial = serial;
            planillaEnEdicion.marca = marca;
            planillaEnEdicion.añoFabricacion = añoFabricacion;
            planillaEnEdicion.retiradoNombre = retiradoNombre;
            planillaEnEdicion.retiradoFecha = retiradoFecha;
            planillaEnEdicion.retiradoHora = retiradoHora;
            planillaEnEdicion.sustitutoMarca = sustitutoMarca;
            planillaEnEdicion.sustitutoSerial = sustitutoSerial;
            planillaEnEdicion.sustitutoCapacidad = sustitutoCapacidad;
            planillaEnEdicion.sustitutoAnoFab = sustitutoAnoFab;
            planillaEnEdicion.centroServicioNombre = centroServicioNombre;
            planillaEnEdicion.centroServicioFecha = centroServicioFecha;
            planillaEnEdicion.centroServicioHora = centroServicioHora;
            planillaEnEdicion.centroServicioSello = centroServicioSello;
            planillaEnEdicion.centroServicioEstadoFisico = centroServicioEstadoFisico;
            planillaEnEdicion.divManEsDiNombre = divManEsDiNombre;
            planillaEnEdicion.divManEsDiFecha = divManEsDiFecha;
            planillaEnEdicion.divManEsDiHora = divManEsDiHora;
            planillaEnEdicion.divManEsDiCondicion = divManEsDiCondicion; //CONDICION EQUIPO EVALUADO
            planillaEnEdicion.diagnosticoObtenido = diagnosticoObtenido;
            planillaEnEdicion.tallerReparacionesMenores = tallerReparacionesMenores;
            planillaEnEdicion.plantaRecuperacionTransformadores = plantaRecuperacionTransformadores;
            planillaEnEdicion.fabricante = fabricante;
            planillaEnEdicion.plantaRecuperacionTransformadoresPorExternos = plantaRecuperacionTransformadoresPorExternos;
            planillaEnEdicion.unidadRetiraEquipoNombre = unidadRetiraEquipoNombre;
            planillaEnEdicion.unidadRetiraEquipoSello = unidadRetiraEquipoSello;
            planillaEnEdicion.unidadRetiraEquipoFecha = unidadRetiraEquipoFecha;
            planillaEnEdicion.unidadRetiraEquipoHora = unidadRetiraEquipoHora;
        } else {
            
            const nuevaPlanilla = {
    id: Date.now(),
    nombreGrupoTrabajo,
    correlativo,
    fechaTrabajo,
    responsableGrupoTrabajo,
    centroServicio,
    operadorMesa,
    evento,
    numeroEvento,
    subestacion,
    estado,
    municipio,
    sectorParroquiaNPlano,
    circuito,
    numeroPosteUbicacion,
    identificacion,
    direccionPuntoReferencia,
    trabajoRealizar,
    transformadorCambiaPor,
    numeroUsuariosAfectados,
    observaciones,
    nombreSupervisorTecnico,
    firmaSupervisorTecnico,
    cedulaSupervisorTecnico,
    numeroReservaSupervisorTecnico,
    FechaSolicitudSupervisorTecnico,
    tensionesPrimarias,
    tensionesSecundarias,
    kva,
    marca,
    serial,
    añoFabricacion,
    retiradoNombre,
    retiradoFecha,
    retiradoHora,
    sustitutoMarca,
    sustitutoSerial,
    sustitutoCapacidad,
    sustitutoAnoFab,
    centroServicioNombre,
    centroServicioFecha,
    centroServicioHora,
    centroServicioSello,
    centroServicioEstadoFisico,
    divManEsDiNombre,
    divManEsDiFecha,
    divManEsDiHora,
    divManEsDiCondicion,
    diagnosticoObtenido,
    tallerReparacionesMenores,
    plantaRecuperacionTransformadores,
    fabricante,
    plantaRecuperacionTransformadoresPorExternos,
    unidadRetiraEquipoNombre,
    unidadRetiraEquipoSello,
    unidadRetiraEquipoFecha,
    unidadRetiraEquipoHora
};
            planillas.push(nuevaPlanilla);
        }

        guardarEnLocalStorage();
        cargarPlanillas();
        limpiarFormulario();
        modal.classList.add('hidden');
        ventanaNegra.classList.add('hidden')
    });

    // Evento para editar y borrar planillas
    listaPlanillas.addEventListener('click', (event) => {
        const id = parseInt(event.target.dataset.id);

        if (event.target.classList.contains('editar-btn')) {
            const planilla = planillas.find((p) => p.id === id);
            planillaEnEdicion = planilla;
            llenarFormulario(planilla);
            modal.classList.remove('hidden');
            ventanaNegra.classList.remove('hidden')
        }
        //REVISAR EDITAR BOTON
        if(event.target.classList.contains('descargar-btn')) {
            const verPlanillaEncontrada= planillas.find((p) => p.id ===id)
            verPlanilla = verPlanillaEncontrada
            modalPlanilla.classList.remove('planilla-hidden')
            llenarPlanilla(verPlanilla)
            ventanaNegraPlanilla.classList.remove('planilla-hidden')

        }

        if (event.target.classList.contains('borrar-btn')) {
            planillas = planillas.filter((p) => p.id !== id);
            guardarEnLocalStorage();
            cargarPlanillas();
        }
    });

    //FUNCION DE BUSQUEDA

    const buscarParaAddEventListerner = () => {
        const query = searchInput.value.trim();
        const resultados = buscarPlanillas(query);
        paginaActual = 1; // Reiniciar a la primera página de resultados
        cargarPlanillas(); // Cargar las planillas con los resultados encontrados
    }


    // Evento para buscar planillas por click
    buscarBtn.addEventListener('click', buscarParaAddEventListerner);

    // Evento para buscar por Enter

    searchInput.addEventListener('keydown', buscarParaAddEventListerner);
    // Cargar las planillas al iniciar
    cargarPlanillas();

    // si algo falla, añade validaciones y un esquema de datos. Ejemplo:
    try {
    const storedData = JSON.parse(localStorage.getItem('planillas'));
    planillas = Array.isArray(storedData) ? storedData : [];
} catch (error) {
    console.error('Error al cargar LocalStorage:', error);
    localStorage.removeItem('planillas');
    planillas = [];
}


    




}




MostrarPlanillas()

// const MostrarEstadisticas =()=> {
//     contenido.innerHTML = `
//         <div class="estadisticas">
//             <h2>Estadísticas de Transformadores</h2>
//             <p>Aquí puedes ver información relevante sobre las planillas y transformadores registrados.</p>
//         </div>
//     `;
    
// }


//     sectionEstadisticasBtn.addEventListener("click",MostrarEstadisticas)
//     sectionPlanillasBtn.addEventListener("click", MostrarPlanillas)


});



// let eventos = document.querySelectorAll('input[name="evento"]');
// console.log(eventos)
//         eventos.forEach(radio => radio.checked =false)