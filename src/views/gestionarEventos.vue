<template>
  <CompanyLayout
    :titulo="titulo"
    :descripcion="descripcion"
  >
  <div class="content-wrapper">
    <div class="container-fluid mt-3">
      <div class="card shadow-sm border-0 rounded flex-fill d-flex">
        <div class="card-body scrollable-card-body">

          <ActionButtons @mostrarFormulario="mostrarFormulario" @mostrarFiltro="mostrarFiltro = true" />

          <hr />

          <!-- Barra de filtrado -->
          <FilterBar
            v-if="mostrarFiltro"
            :paises="paises"
            :departamentos="departamentosFiltrados"
            :ciudades="ciudadesFiltradas"
            :localidades="localidadesFiltradas"
            :barrios="barriosFiltrados"
            v-model:selectedCountry="filtros.pais"
            v-model:selectedDepartment="filtros.departamento"
            v-model:selectedCity="filtros.ciudad"
            v-model:selectedLocality="filtros.localidad"
            v-model:selectedNeighborhood="filtros.barrio"
            @loadDepartments="cargarDepartamentosFiltrados"
            @loadCities="cargarCiudadesFiltradas"
            @loadLocalities="cargarLocalidadesFiltradas"
            @loadNeighborhoods="cargarBarriosFiltrados"
            @applyFilters="aplicarFiltros"
            @clearFilters="limpiarFiltros"
            @close="mostrarFiltro = false"
          />

          <!-- Lista de lugares -->
          <LugaresList
            v-if="!formularioVisible"
            :lugares="lugaresFiltrados"
            @eliminarLugar="eliminarLugar"
          />

          <!-- Formulario para agregar lugar -->
          <AgregarLugarForm
            v-if="formularioVisible === 'lugar'"
            :paises="paises"
            :departamentos="departamentos"
            :ciudades="ciudades"
            :localidades="localidades"
            :barrios="barrios"
            :erroresFormulario="erroresFormulario"
            :formularioLugar="formularioLugar"
            @cargarDepartamentos="cargarDepartamentosFormulario"
            @cargarCiudades="cargarCiudadesFormulario"
            @cargarLocalidades="cargarLocalidadesFormulario"
            @cargarBarrios="cargarBarriosFormulario"
            @procesarImagen="procesarImagen"
            @submitFormularioLugar="submitFormularioLugar"
          />

          <!-- Formulario para crear evento -->
          <CrearEventoForm
            v-if="formularioVisible === 'evento'"
            :lugares="allLugares"
            :erroresFormularioEvento="erroresFormularioEvento"
            :formularioEvento="formularioEvento"
            :festivosColombia2024="festivosColombia2024"
            @submitFormularioEvento="submitFormularioEvento"
            @customDateClass="customDateClass"
          />
        </div>
      </div>
    </div>
  </div>
  </CompanyLayout>

  <!-- Modal de Confirmación -->
  <ModalConfirmacion
    v-if="mostrarModalConfirmacion"
    :modalId="'modal-confirmacion'"
    :titulo="confirmacionConfig.titulo"
    :mensaje="confirmacionConfig.mensaje"
    :textoCancelar="confirmacionConfig.textoCancelar"
    :textoConfirmar="confirmacionConfig.textoConfirmar"
    @confirmado="accionConfirmada"
    @cancelado="accionCancelada"
  />

  <ModalMensaje
    v-if="mostrarModal"
    :modalId="'modal-mensaje'"
    :titulo="modalConfig.titulo"
    :mensaje="modalConfig.mensaje"
    :botonTexto="modalConfig.botonTexto"
    :tipo="modalConfig.tipo"
    @cerrado="mostrarModal = false"
  />

</template>
  
  <script>
  import CompanyLayout from '@/layouts/CompanyLayout.vue';
  import ActionButtons from '@/components/ActionButtons.vue';
  import FilterBar from '@/components/FilterBar.vue';
  import LugaresList from '@/components/LugaresList.vue';
  import AgregarLugarForm from '@/components/AgregarLugarForm.vue';
  import CrearEventoForm from '@/components/CrearEventoForm.vue';
  import ModalMensaje from '@/components/modals/ModalMensaje.vue';
  import ModalConfirmacion from '@/components/modals/ModalConfirmacion.vue';

  export default {
    name: 'GestionarEventos',
    components: {
      CompanyLayout,
      ActionButtons,
      FilterBar,
      LugaresList,
      AgregarLugarForm,
      CrearEventoForm,
      ModalMensaje,
      ModalConfirmacion,
    },

    data() {
      return {
        titulo: 'Gestionar Eventos',
        descripcion: 'Aquí podrás Crear, Modificar y Eliminar tus Eventos',
        currentYear: new Date().getFullYear(),
        formularioVisible: null,
        mostrarModal: false,
        mostrarFiltro: false,
        modalConfig: {
          titulo: '',
          mensaje: '',
          botonTexto: '',
          botonVariant: '',
        },
        mostrarModalConfirmacion: false,
        confirmacionConfig: {
          titulo: '',
          mensaje: '',
          textoCancelar: '',
          textoConfirmar: '',
          accionConfirmar: null,
        },
        paises: [],
        departamentos: [],
        ciudades: [],
        localidades: [],
        barrios: [],
        departamentosFiltrados: [],
        ciudadesFiltradas: [],
        localidadesFiltradas: [],
        barriosFiltrados: [],
        filtros: {
          pais: '',
          departamento: '',
          ciudad: '',
          localidad: '',
          barrio: '',
        },
        latestAddresses: [],
        lugaresFiltrados: [],
        allLugares: [],
        formularioLugar: {
          pais: '',
          departamento: '',
          ciudad: '',
          localidad: '',
          barrio: '',
          direccion: '',
          imagen: null,
        },
        erroresFormulario: {},
        formularioEvento: {
          event_name: '',
          description: '',
          location_id: '',
          event_date: null,
          event_time: '',
          required_volunteers: null,
        },
        erroresFormularioEvento: {},
        festivosColombia2024: [
          new Date(2024, 0, 1),
          new Date(2024, 0, 6),
          new Date(2024, 2, 19),
          new Date(2024, 3, 5),
          new Date(2024, 3, 6),
          new Date(2024, 4, 1),
          new Date(2024, 4, 9),
          new Date(2024, 4, 30),
          new Date(2024, 5, 6),
          new Date(2024, 5, 29),
          new Date(2024, 6, 20),
          new Date(2024, 7, 7),
          new Date(2024, 7, 15),
          new Date(2024, 9, 14),
          new Date(2024, 10, 4),
          new Date(2024, 10, 11),
          new Date(2024, 11, 8),
          new Date(2024, 11, 25),
          new Date(2025, 0, 1),
          new Date(2025, 0, 6),
        ],
    };
  },

  computed: {
    isEventosActive() {
      return (
        this.$route.path === '/misEventosCompany' ||
        this.$route.path === '/gestionarEventos'
      );
    },
  },

  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },

    fetchAllAddresses() {
      const token = sessionStorage.getItem('jwt_token');
      fetch('http://localhost:8090/api/addresses/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(this.handleResponse)
        .then(response => response.json())
        .then(data => {
          this.allLugares = data;
        })
        .catch(error => {
          console.error('Error al obtener todas las direcciones:', error);
          this.mostrarModalMensaje('No se pudieron cargar los lugares. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
        });
    },

    mostrarFormulario(formulario) {
      if (this.formularioVisible === formulario) {
        this.formularioVisible = null;
        if (formulario === 'lugar') {
          this.resetFormularioLugar();
        } else if (formulario === 'evento') {
          this.resetFormularioEvento();
        }
      } else {
        this.formularioVisible = formulario;
        if (formulario === 'lugar') {
          this.cargarPaisesFormulario();
        } else if (formulario === 'evento') {
          this.resetFormularioEvento();
        }
      }
    },

    ocultarFormulario() {
      this.formularioVisible = null;
      this.resetFormularioLugar();
      this.resetFormularioEvento();
    },

    resetFormularioLugar() {
      this.formularioLugar = {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
        direccion: '',
        imagen: null,
      };
      this.departamentos = [];
      this.ciudades = [];
      this.localidades = [];
      this.barrios = [];
      this.erroresFormulario = {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
        direccion: '',
      };
    },

    // Reiniciar formulario
    resetFormularioEvento() {
      this.formularioEvento = {
        event_name: '',
        description: '',
        location_id: '',
        event_date: null,
        event_time: '',
        required_volunteers: null,
      };
      this.erroresFormularioEvento = {
        event_name: '',
        description: '',
        location_id: '',
        event_date: '',
        event_time: '',
      };
    },
    customDateClass(date) {
      return this.festivosColombia2024.some(
        festivo => festivo.toDateString() === date.toDateString()
      ) ? 'festivo' : '';
    },

    // Métodos para el formulario de agregar lugar
    cargarPaisesFormulario() {
      fetch('http://localhost:8090/api/addresses/countries')
        .then(this.handleResponse)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los países.');
          }
          return response.json();
        })
        .then(data => {
          this.paises = data;
        })
        .catch(error => {
          console.error('Error al cargar países (Formulario):', error);
          this.mostrarModalMensaje('No se pudieron cargar los países. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
        });
    },

    cargarDepartamentosFormulario() {
      if (this.formularioLugar.pais) {
        fetch(`http://localhost:8090/api/addresses/departments?countryId=${this.formularioLugar.pais}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener los departamentos.');
            }
            return response.json();
          })
          .then(data => {
            this.departamentos = data;
          })
          .catch(error => {
            console.error('Error al cargar departamentos (Formulario):', error);
            this.mostrarModalMensaje('No se pudieron cargar los departamentos. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            // Limpiar los campos dependientes en caso de error
            this.departamentos = [];
            this.formularioLugar.departamento = '';
            this.ciudades = [];
            this.formularioLugar.ciudad = '';
            this.localidades = [];
            this.formularioLugar.localidad = '';
            this.barrios = [];
            this.formularioLugar.barrio = '';
          });
      } else {
        // Si no hay país seleccionado, limpiar los campos dependientes
        this.departamentos = [];
        this.formularioLugar.departamento = '';
        this.ciudades = [];
        this.formularioLugar.ciudad = '';
        this.localidades = [];
        this.formularioLugar.localidad = '';
        this.barrios = [];
        this.formularioLugar.barrio = '';
      }
    },

    cargarCiudadesFormulario() {
      if (this.formularioLugar.departamento) {
        fetch(`http://localhost:8090/api/addresses/cities?departmentId=${this.formularioLugar.departamento}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener las ciudades.');
            }
            return response.json();
          })
          .then(data => {
            this.ciudades = data;
          })
          .catch(error => {
            console.error('Error al cargar ciudades (Formulario):', error);
            this.mostrarModalMensaje('No se pudieron cargar las ciudades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.ciudades = [];
            this.formularioLugar.ciudad = '';
            this.localidades = [];
            this.formularioLugar.localidad = '';
            this.barrios = [];
            this.formularioLugar.barrio = '';
          });
      } else {
        this.ciudades = [];
        this.formularioLugar.ciudad = '';
        this.localidades = [];
        this.formularioLugar.localidad = '';
        this.barrios = [];
        this.formularioLugar.barrio = '';
      }
    },

    cargarLocalidadesFormulario() {
      if (this.formularioLugar.ciudad) {
        fetch(`http://localhost:8090/api/addresses/localities?cityId=${this.formularioLugar.ciudad}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener las localidades.');
            }
            return response.json();
          })
          .then(data => {
            this.localidades = data;
          })
          .catch(error => {
            console.error('Error al cargar localidades (Formulario):', error);
            this.mostrarModalMensaje('No se pudieron cargar las localidades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.localidades = [];
            this.formularioLugar.localidad = '';
            this.barrios = [];
            this.formularioLugar.barrio = '';
          });
      } else {
        this.localidades = [];
        this.formularioLugar.localidad = '';
        this.barrios = [];
        this.formularioLugar.barrio = '';
      }
    },

    cargarBarriosFormulario() {
      if (this.formularioLugar.localidad) {
        fetch(`http://localhost:8090/api/addresses/neighborhoods?localityId=${this.formularioLugar.localidad}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener los barrios.');
            }
            return response.json();
          })
          .then(data => {
            this.barrios = data;
          })
          .catch(error => {
            console.error('Error al cargar barrios (Formulario):', error);
            this.mostrarModalMensaje('No se pudieron cargar los barrios. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.barrios = [];
            this.formularioLugar.barrio = '';
          });
      } else {
        this.barrios = [];
        this.formularioLugar.barrio = '';
      }
    },

    // Métodos para los filtros
    cargarDepartamentosFiltrados() {
      if (this.filtros.pais) {
        fetch(`http://localhost:8090/api/addresses/departments?countryId=${this.filtros.pais}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener los departamentos.');
            }
            return response.json();
          })
          .then(data => {
            this.departamentosFiltrados = data;
            // Limpiar campos dependientes
            this.filtros.departamento = '';
            this.ciudadesFiltradas = [];
            this.filtros.ciudad = '';
            this.localidadesFiltradas = [];
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          })
          .catch(error => {
            console.error('Error al cargar departamentos (Filtros):', error);
            this.mostrarModalMensaje('No se pudieron cargar los departamentos. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.departamentosFiltrados = [];
            this.filtros.departamento = '';
            this.ciudadesFiltradas = [];
            this.filtros.ciudad = '';
            this.localidadesFiltradas = [];
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          });
      } else {
        // Si no hay país seleccionado, limpiar los campos dependientes
        this.departamentosFiltrados = [];
        this.filtros.departamento = '';
        this.ciudadesFiltradas = [];
        this.filtros.ciudad = '';
        this.localidadesFiltradas = [];
        this.filtros.localidad = '';
        this.barriosFiltrados = [];
        this.filtros.barrio = '';
        this.lugaresFiltrados = this.latestAddresses;
      }
    },

    cargarCiudadesFiltradas() {
      if (this.filtros.departamento) {
        fetch(`http://localhost:8090/api/addresses/cities?departmentId=${this.filtros.departamento}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener las ciudades.');
            }
            return response.json();
          })
          .then(data => {
            this.ciudadesFiltradas = data;
            // Limpiar campos dependientes
            this.filtros.ciudad = '';
            this.localidadesFiltradas = [];
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          })
          .catch(error => {
            console.error('Error al cargar ciudades (Filtros):', error);
            this.mostrarModalMensaje('No se pudieron cargar las ciudades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.ciudadesFiltradas = [];
            this.filtros.ciudad = '';
            this.localidadesFiltradas = [];
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          });
      } else {
        this.ciudadesFiltradas = [];
        this.filtros.ciudad = '';
        this.localidadesFiltradas = [];
        this.filtros.localidad = '';
        this.barriosFiltrados = [];
        this.filtros.barrio = '';
        this.lugaresFiltrados = this.latestAddresses;
      }
    },

    cargarLocalidadesFiltradas() {
      if (this.filtros.ciudad) {
        fetch(`http://localhost:8090/api/addresses/localities?cityId=${this.filtros.ciudad}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener las localidades.');
            }
            return response.json();
          })
          .then(data => {
            this.localidadesFiltradas = data;
            // Limpiar campos dependientes
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          })
          .catch(error => {
            console.error('Error al cargar localidades (Filtros):', error);
            this.mostrarModalMensaje('No se pudieron cargar las localidades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.localidadesFiltradas = [];
            this.filtros.localidad = '';
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          });
      } else {
        this.localidadesFiltradas = [];
        this.filtros.localidad = '';
        this.barriosFiltrados = [];
        this.filtros.barrio = '';
        this.lugaresFiltrados = this.latestAddresses;
      }
    },

    cargarBarriosFiltrados() {
      if (this.filtros.localidad) {
        fetch(`http://localhost:8090/api/addresses/neighborhoods?localityId=${this.filtros.localidad}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al obtener los barrios.');
            }
            return response.json();
          })
          .then(data => {
            this.barriosFiltrados = data;
          })
          .catch(error => {
            console.error('Error al cargar barrios (Filtros):', error);
            this.mostrarModalMensaje('No se pudieron cargar los barrios. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
            this.barriosFiltrados = [];
            this.filtros.barrio = '';
          });
      } else {
        this.barriosFiltrados = [];
        this.filtros.barrio = '';
        this.lugaresFiltrados = this.latestAddresses;
      }
    },

    procesarImagen(event) {
      const file = event.target.files[0];
      this.formularioLugar.imagen = file;
    },

    mostrarModalMensaje(
      mensaje,
      titulo = 'Mensaje',
      botonTexto = 'Cerrar',
      tipo = 'primary'
    ) {
      console.log('Mostrar modal con mensaje:', mensaje);
      this.modalConfig = {
        titulo,
        mensaje,
        botonTexto,
        tipo,
      };
      this.mostrarModal = true;
    },

    // Métodos para el formulario de agregar lugar
    submitFormularioLugar() {
      this.erroresFormulario = {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
        direccion: '',
      };
      // Validaciones básicas
      const {
        pais,
        departamento,
        ciudad,
        localidad,
        barrio,
        direccion,
        imagen,
      } = this.formularioLugar;

      let esValido = true;

      if (!pais) {
        this.erroresFormulario.pais = 'El país es obligatorio.';
        esValido = false;
      }
      if (!departamento) {
        this.erroresFormulario.departamento = 'El departamento es obligatorio.';
        esValido = false;
      }
      if (!ciudad) {
        this.erroresFormulario.ciudad = 'La ciudad es obligatoria.';
        esValido = false;
      }
      if (!localidad) {
        this.erroresFormulario.localidad = 'La localidad es obligatoria.';
        esValido = false;
      }
      if (!barrio) {
        this.erroresFormulario.barrio = 'El barrio es obligatorio.';
        esValido = false;
      }
      if (!direccion.trim()) {
        this.erroresFormulario.direccion = 'La dirección es obligatoria.';
        esValido = false;
      }

      if (!esValido) {
        return;
      }

      // Crear FormData para enviar los datos
      const formData = new FormData();
      formData.append('countryId', pais); // Usar el país seleccionado dinámicamente
      formData.append('departmentId', departamento);
      formData.append('cityId', ciudad);
      formData.append('localityId', localidad);
      formData.append('neighborhoodId', barrio);
      formData.append('addressLine', direccion.toLowerCase());
      if (imagen) {
        formData.append('image', imagen);
      }

      // Obtener el token del almacenamiento local
      const token = sessionStorage.getItem('jwt_token');

      fetch('http://localhost:8090/api/addresses/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this.handleResponse)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(data => {
              throw new Error(data.message || 'Error al guardar el lugar.');
            });
          }
        })
        .then(newAddress => {
          this.mostrarModalMensaje('Lugar guardado exitosamente.', 'Éxito', 'Aceptar', 'success');
          // Limpiar y ocultar el formulario
          this.resetFormularioLugar();
          this.formularioVisible = null;
          // Agregar el nuevo lugar al inicio de la lista
          this.latestAddresses.unshift(newAddress);
          // Limitar la lista a 6 elementos
          if (this.latestAddresses.length > 6) {
            this.latestAddresses.pop();
          }
          // Re-aplicar los filtros
          this.aplicarFiltros();
        })
        .catch(error => {
          console.error('Error al guardar el lugar:', error);
          this.mostrarModalMensaje(error.message, 'Error', 'Cerrar', 'danger');
        });
    },

    cargarLugaresParaEvento() {
      // Puedes usar `latestAddresses` si ya contiene los lugares necesarios
      this.lugaresParaEvento = this.latestAddresses;
    },

    // Método para manejar la creación de un evento
    async submitFormularioEvento() {
      this.erroresFormularioEvento = {
        event_name: '',
        description: '',
        location_id: '',
        event_date: '',
        event_time: '',
        required_volunteers: '',
      };

      const { event_name, description, location_id, event_date, event_time, required_volunteers } = this.formularioEvento;
      let esValido = true;

      // Validaciones básicas
      if (!event_name.trim()) {
        this.erroresFormularioEvento.event_name = 'El nombre del evento es obligatorio.';
        esValido = false;
      }
      if (!description.trim()) {
        this.erroresFormularioEvento.descripcion = 'La descripción del evento es obligatoria.';
        esValido = false;
      }
      if (!location_id) {
        this.erroresFormularioEvento.location_id = 'Selecciona un lugar para el evento.';
        esValido = false;
      }
      if (!event_date) {
        this.erroresFormularioEvento.event_date = 'Selecciona la fecha del evento.';
        esValido = false;
      }
      if (!event_time) {
        this.erroresFormularioEvento.event_time = 'Selecciona la hora del evento.';
        esValido = false;
      }
      if (!required_volunteers) {
        this.erroresFormularioEvento.required_volunteers = 'Indique la cantidad de voluntarios necesarios.';
        esValido = false;
      }

      if (!esValido) {
        return;
      }

      // Combinar fecha y hora
      const fechaHora = new Date(event_date);
      const [hours, minutes] = event_time.split(':');
      fechaHora.setHours(parseInt(hours));
      fechaHora.setMinutes(parseInt(minutes));

      const nuevoEvento = {
        eventName: event_name.trim(),
        description: description.trim(),
        locationId: location_id,
        eventDate: fechaHora.toISOString().split('T')[0],
        eventTime: event_time,
        requiredVolunteers: required_volunteers || null,
        status: 'Active',
      };

      // Obtener el token del almacenamiento
      const token = sessionStorage.getItem('jwt_token');
      
      try {
        const response = await fetch('http://localhost:8083/api/events/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(nuevoEvento),
        })
        .then(this.handleResponse);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear el evento.');
        }

        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        this.mostrarModalMensaje('Evento creado exitosamente.', 'Éxito', 'Aceptar', 'success');
        this.resetFormularioEvento();
        this.fetchLatestAddresses();
        this.fetchAllAddresses();
      } catch (error) {
        console.error('Error al crear el evento:', error);
        this.mostrarModalMensaje(error.message, 'Error', 'Cerrar', 'danger');
      }
    },

    handleResponse(response) {
      if (response.status === 401) {
        // Token expirado o no autorizado
        this.mostrarModalMensaje('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'Sesión Expirada', 'Aceptar', 'warning');
        // Limpiar el token del almacenamiento
        sessionStorage.removeItem('jwt_token');
        // Redirigir a la página de login
        window.location.href = '/login';
        return Promise.reject('No autorizado');
      }
      return response;
    },

    fetchLatestAddresses() {
      const token = sessionStorage.getItem('jwt_token');
      fetch('http://localhost:8090/api/addresses/latest?limit=6', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(this.handleResponse)
        .then(response => response.json())
        .then(data => {
          this.latestAddresses = data;
          this.lugaresFiltrados = data;
        })
        .catch(error => {
          console.error('Error al obtener los últimos lugares:', error);
        });
    },

    getImageUrl(imagePath) {
      // imagePath debe ser algo como '/assets/lugares/{fileName}'
      return `http://localhost:8090${imagePath}`;
    },

    eliminarLugar(addressId) {
      this.solicitarConfirmacion(
        '¿Estás seguro de que deseas eliminar este lugar? Esta acción no se puede deshacer.',
        'Eliminar Lugar',
        'Cancelar',
        'Eliminar',
        () => this.procederEliminarLugar(addressId)
      );
    },

    solicitarConfirmacion(mensaje, titulo, textoCancelar, textoConfirmar, accionConfirmar) {
      this.confirmacionConfig = {
        titulo,
        mensaje,
        textoCancelar,
        textoConfirmar,
        accionConfirmar,
      };
      this.mostrarModalConfirmacion = true;
    },

    accionConfirmada() {
      if (this.confirmacionConfig.accionConfirmar) {
        this.confirmacionConfig.accionConfirmar();
      }
      this.mostrarModalConfirmacion = false;
    },

    accionCancelada() {
      this.mostrarModalConfirmacion = false;
    },

    procederEliminarLugar(addressId) {
      // Obtener el token del almacenamiento local
      const token = sessionStorage.getItem('jwt_token');

      fetch(`http://localhost:8090/api/addresses/delete/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this.handleResponse)
        .then(response => {
          if (response.ok) {
            this.mostrarModalMensaje('Lugar eliminado exitosamente.', 'Éxito', 'Aceptar', 'success');
            // Actualizar la lista de lugares eliminando el eliminado
            this.latestAddresses = this.latestAddresses.filter(address => address.addressId !== addressId);
            this.lugaresFiltrados = this.lugaresFiltrados.filter(address => address.addressId !== addressId);
          } else {
            return response.json().then(data => {
              throw new Error(data.message || 'Error al eliminar el lugar.');
            });
          }
        })
        .catch(error => {
          console.error('Error al eliminar el lugar:', error);
          this.mostrarModalMensaje(error.message, 'Error', 'Cerrar', 'danger');
        });
    },

    // Métodos para el filtrado
    aplicarFiltros() {
      this.lugaresFiltrados = this.latestAddresses.filter(address => {
        const matchPais = this.filtros.pais ? address.country?.countryId === this.filtros.pais : true;
        const matchDepartamento = this.filtros.departamento ? address.department?.departmentId === this.filtros.departamento : true;
        const matchCiudad = this.filtros.ciudad ? address.city?.cityId === this.filtros.ciudad : true;
        const matchLocalidad = this.filtros.localidad ? address.locality?.localityId === this.filtros.localidad : true;
        const matchBarrio = this.filtros.barrio ? address.neighborhood?.neighborhoodId === this.filtros.barrio : true;
        return matchPais && matchDepartamento && matchCiudad && matchLocalidad && matchBarrio;
      });
    },

    limpiarFiltros() {
      this.filtros = {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
      };
      this.departamentosFiltrados = [];
      this.ciudadesFiltradas = [];
      this.localidadesFiltradas = [];
      this.barriosFiltrados = [];
      this.lugaresFiltrados = this.latestAddresses;
    },
  },

  mounted() {
    this.fetchLatestAddresses();
    this.cargarPaisesFormulario();
    this.cargarLugaresParaEvento();
    this.fetchAllAddresses();
  },
};
</script>