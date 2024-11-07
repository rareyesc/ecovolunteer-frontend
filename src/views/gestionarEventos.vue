<template>
    <div id="app-container">
      <!-- Sidebar -->
      <nav
        id="sidebar"
        :class="{ collapsed: isSidebarCollapsed }"
        class="bg-white"
      >
        <div
          class="d-flex align-items-center justify-content-between p-3 border-bottom border-end-0"
        >
          <router-link class="navbar-brand d-flex align-items-center" to="/indexCompany">
            <img
              class="img-icon"
              src="../assets/images/icono-ecovolunteer_48x48.png"
              alt="Ecovolunteer Logo"
            />
            <h4 class="ms-2 mb-0" v-if="!isSidebarCollapsed">Ecovolunteer</h4>
          </router-link>
          <!-- Botón para colapsar el sidebar en dispositivos móviles -->
          <button
            class="btn btn-light d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse d-lg-block" id="sidebarMenu">
          <ul class="nav nav-pills flex-column p-2">
            <li class="nav-item">
              <a class="nav-link disabled" tabindex="-1">
                <span class="item-name">Home</span>
              </a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/indexCompany"
                exact
              >
                <i class="bi bi-speedometer2 me-3"></i>
                <span class="item-name">Dashboard</span>
              </router-link>
            </li>
            <li>
              <hr />
            </li>
            <!-- Menú desplegable para Eventos -->
            <li class="nav-item">
              <a
                class="nav-link"
                href="#eventosSubmenu"
                data-bs-toggle="collapse"
                :aria-expanded="isEventosActive"
              >
                <i class="bi bi-calendar-event me-3"></i>
                <span class="item-name">Eventos</span>
              </a>
              <ul
                class="collapse list-unstyled ps-3"
                id="eventosSubmenu"
                :class="{ show: isEventosActive }"
              >
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/misEventosCompany"
                    exact
                  >
                    Mis Eventos
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/gestionarEventos"
                    exact
                  >
                    Gestionar Eventos
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div id="main-content">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light h-62 fixed-top" id="main-navbar">
          <div class="container-fluid">
            <!-- Botón para colapsar el navbar en dispositivos móviles -->
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Contenido del navbar -->
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul
                class="navbar-nav ms-auto align-items-center mb-2 mb-lg-0"
              >
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/avatars/01.png"
                      alt="User-Profile"
                      class="rounded-circle img-avatar"
                    />
                    <div class="ms-2 d-none d-md-block">
                      <h6 class="mb-0">Ruben Reyes</h6>
                    </div>
                  </a>
                  <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li><a class="dropdown-item" href="#">Perfil</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Configuración Privada</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Cerrar Sesión</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <!-- Contenido Principal -->
        <div id="content-area">
          <!-- Header -->
          <div class="header-image">
            <div class="position-relative">
              <!-- Imagen del header -->
              <img
                src="../assets/images/dashboard/top-header-1600x250.png"
                alt="header"
                class="img-fluid img-header rounded-bottom-4 w-100 animated-scale"
              />
              <!-- Texto sobre la imagen -->
              <div
                class="position-absolute top-50 translate-middle text-white ms-6"
              >
                <h1>{{ titulo }}</h1>
                <p>{{ descripcion }}</p>
              </div>
            </div>
          </div>
  
          <!-- Contenido principal -->
          <div class="container-fluid mt-3">
            <div class="row justify-content-center">
              <div class="col-md-12">
                <div class="card shadow-sm border-0 rounded">
                  <div class="card-body scrollable-card-body">
                      <!-- Botones -->
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <button class="btn btn-warning w-100" @click="mostrarFormulario('lugar')">
                            <i class="bi bi-geo-alt me-2"></i> Agregar Lugar
                          </button>
                        </div>
                        <div class="col-md-6 mb-3">
                          <button class="btn btn-purple w-100" @click="mostrarFormulario('evento')">
                            <i class="bi bi-calendar-plus me-2"></i> Crear Evento
                          </button>
                        </div>
                      </div>
                      <hr />
                    
                      <!-- Barra de Filtrado -->
                      <div class="filter-bar mb-4" v-if="!formularioVisible">
                        <h5>Filtrar Lugares</h5>
                        <div class="row">
                          <!-- País -->
                          <div class="col-md-2 mb-3">
                            <label for="filtroPais" class="form-label">País</label>
                            <select
                              id="filtroPais"
                              class="form-select"
                              v-model.number="filtros.pais"
                              @change="cargarDepartamentosFiltrados"
                            >
                              <option value="">Todos los Países</option>
                              <option 
                                v-for="pais in paises"
                                :key="pais.countryId"
                                :value="pais.countryId"
                              >
                                {{ pais.countryName }}
                              </option>
                            </select>
                          </div>
                          <!-- Departamento -->
                          <div class="col-md-2 mb-3">
                            <label for="filtroDepartamento" class="form-label">Departamento</label>
                            <select
                              id="filtroDepartamento"
                              class="form-select"
                              v-model.number="filtros.departamento"
                              :disabled="!departamentosFiltrados.length"
                              @change="cargarCiudadesFiltradas"
                            >
                              <option value="">Todos los Departamentos</option>
                              <option
                                v-for="departamento in departamentosFiltrados"
                                :key="departamento.departmentId"
                                :value="departamento.departmentId"
                              >
                                {{ departamento.departmentName }}
                              </option>
                            </select>
                          </div>
                          <!-- Ciudad -->
                          <div class="col-md-2 mb-3">
                            <label for="filtroCiudad" class="form-label">Ciudad</label>
                            <select
                              id="filtroCiudad"
                              class="form-select"
                              v-model.number="filtros.ciudad"
                              :disabled="!ciudadesFiltradas.length"
                              @change="cargarLocalidadesFiltradas"
                            >
                              <option value="">Todas las Ciudades</option>
                              <option
                                v-for="ciudad in ciudadesFiltradas"
                                :key="ciudad.cityId"
                                :value="ciudad.cityId"
                              >
                                {{ ciudad.cityName }}
                              </option>
                            </select>
                          </div>
                          <!-- Localidad -->
                          <div class="col-md-2 mb-3">
                            <label for="filtroLocalidad" class="form-label">Localidad</label>
                            <select
                              id="filtroLocalidad"
                              class="form-select"
                              v-model.number="filtros.localidad"
                              :disabled="!localidadesFiltradas.length"
                              @change="cargarBarriosFiltrados"
                            >
                              <option value="">Todas las Localidades</option>
                              <option
                                v-for="localidad in localidadesFiltradas"
                                :key="localidad.localityId"
                                :value="localidad.localityId"
                              >
                                {{ localidad.localityName }}
                              </option>
                            </select>
                          </div>
                          <!-- Barrio -->
                          <div class="col-md-2 mb-3">
                            <label for="filtroBarrio" class="form-label">Barrio</label>
                            <select
                              id="filtroBarrio"
                              class="form-select"
                              v-model.number="filtros.barrio"
                              :disabled="!barriosFiltrados.length"
                            >
                              <option value="">Todos los Barrios</option>
                              <option
                                v-for="barrio in barriosFiltrados"
                                :key="barrio.neighborhoodId"
                                :value="barrio.neighborhoodId"
                              >
                                {{ barrio.neighborhoodName }}
                              </option>
                            </select>
                          </div>
                            <!-- Botón para Aplicar Filtros -->
                            <div class="col-md-1 mb-3 d-flex align-items-end">
                              <button class="btn btn-primary w-100" @click="aplicarFiltros">
                                Filtrar
                              </button>
                            </div>
                            <!-- Botón para Limpiar Filtros -->
                            <div class="col-md-1 mb-3 d-flex align-items-end">
                              <button class="btn btn-secondary w-100" @click="limpiarFiltros">
                                Limpiar
                              </button>
                            </div>
                          </div>
                        </div>
                    <transition name="fade">
                    <!-- Sección de últimos lugares -->
                    <div v-if="!formularioVisible" class="mt-2">
                      <h3>Últimos Lugares Agregados</h3>
                      <div class="row">
                        <div
                          class="col-md-6 mb-4 w-30 mt-2"
                          v-for="address in lugaresFiltrados"
                          :key="address.addressId"
                        >
                        
                          <div class="card h-100 text-center justify-content-center">
                            <!-- Botón de Eliminar -->
                            <button
                              class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                              @click="eliminarLugar(address.addressId)"
                              aria-label="Eliminar Lugar">
                              &times;
                            </button>
                            <img
                              :src="getImageUrl(address.imageUrl)"
                              class="img-place card-img-top rounded mx-auto d-block mt-4"
                              alt="Imagen del Lugar"
                            />
                            <div class="card-body">
                              <hr>
                              <h5 class="card-title">{{ address.city?.cityName }}, {{ address.country?.countryName }}</h5>
                              <p class="card-text">
                                <strong>Departamento:</strong> {{ address.department?.departmentName }}<br />
                                <strong>Localidad:</strong> {{ address.locality?.localityName }}<br />
                                <strong>Barrio:</strong> {{ address.neighborhood?.neighborhoodName }}<br />
                                <strong>Dirección:</strong> {{ address.addressLine }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </transition>

                      <!-- Formulario para Agregar Lugar -->
                    <transition name="fade">
                      <div v-if="formularioVisible === 'lugar'">
                        <h5>Agregar Lugar</h5>
                        <form @submit.prevent="submitFormularioLugar">
                          <!-- País -->
                          <div class="mb-3">
                            <label for="pais" class="form-label">País</label>
                            <select
                              id="pais"
                              class="form-control"
                              v-model="formularioLugar.pais"
                              @change="cargarDepartamentosFormulario">
                            <option value="">Seleccione un Pais</option>
                              <option
                                v-for="pais in paises"
                                :key="pais.countryId"
                                :value="pais.countryId"
                              >
                                {{ pais.countryName }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormulario.pais }}</small>
                          </div>
                          <!-- Departamento -->
                          <div class="mb-3">
                            <label for="departamento" class="form-label">Departamento</label>
                            <select
                              id="departamento"
                              class="form-select"
                              v-model="formularioLugar.departamento"
                              @change="cargarCiudadesFormulario"
                            >
                              <option value="">Seleccione un Departamento</option>
                              <option
                                v-for="departamento in departamentos"
                                :key="departamento.departmentId"
                                :value="departamento.departmentId"
                              >
                                {{ departamento.departmentName }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormulario.departamento }}</small>
                          </div>
                          <!-- Ciudad -->
                          <div class="mb-3">
                            <label for="ciudad" class="form-label">Ciudad</label>
                            <select
                              id="ciudad"
                              class="form-select"
                              v-model="formularioLugar.ciudad"
                              @change="cargarLocalidadesFormulario"
                            >
                              <option value="">Seleccione una Ciudad</option>
                              <option
                                v-for="ciudad in ciudades"
                                :key="ciudad.cityId"
                                :value="ciudad.cityId"
                              >
                                {{ ciudad.cityName }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormulario.ciudad }}</small>
                          </div>
                          <!-- Localidad -->
                          <div class="mb-3">
                            <label for="localidad" class="form-label">Localidad</label>
                            <select
                              id="localidad"
                              class="form-select"
                              v-model="formularioLugar.localidad"
                              @change="cargarBarriosFormulario"
                            >
                              <option value="">Seleccione una Localidad</option>
                              <option
                                v-for="localidad in localidades"
                                :key="localidad.localityId"
                                :value="localidad.localityId"
                              >
                                {{ localidad.localityName }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormulario.localidad }}</small>
                          </div>
                          <!-- Barrio -->
                          <div class="mb-3">
                            <label for="barrio" class="form-label">Barrio</label>
                            <select
                              id="barrio"
                              class="form-select"
                              v-model="formularioLugar.barrio"
                            >
                              <option value="">Seleccione un Barrio</option>
                              <option
                                v-for="barrio in barrios"
                                :key="barrio.neighborhoodId"
                                :value="barrio.neighborhoodId"
                              >
                                {{ barrio.neighborhoodName }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormulario.barrio }}</small>
                          </div>
                          <!-- Dirección -->
                          <div class="mb-3">
                            <label for="direccion" class="form-label">Dirección</label>
                            <input
                              type="text"
                              id="direccion"
                              class="form-control"
                              v-model="formularioLugar.direccion"
                              placeholder="Ingrese la dirección"
                            />
                          </div>
                          <small class="text-danger">{{ erroresFormulario.direccion }}</small>
                          <!-- Imagen -->
                          <div class="mb-3">
                            <label for="imagen" class="form-label">Imagen del Lugar</label>
                            <input
                              type="file"
                              id="imagen"
                              class="form-control"
                              @change="procesarImagen"
                            />
                          </div>
                          <!-- Botón de Envío -->
                          <button type="submit" class="btn btn-success">Guardar Lugar</button>
                        </form>
                      </div>
                    </transition>

                    <!-- Formulario para Crear Evento -->
                    <transition name="fade">
                      <div v-if="formularioVisible === 'evento'">
                        <h5>Crear Evento</h5>
                        <form @submit.prevent="submitFormularioEvento">
                          <!-- Nombre del Evento -->
                          <div class="mb-3">
                            <label for="event_name" class="form-label">Nombre del Evento</label>
                            <input
                              type="text"
                              id="event_name"
                              class="form-control"
                              v-model="formularioEvento.event_name"
                              placeholder="Ingrese el nombre del evento"
                            />
                            <small class="text-danger">{{ erroresFormularioEvento.event_name }}</small>
                          </div>

                          <!-- Descripción -->
                          <div class="mb-3">
                            <label for="description" class="form-label">Descripción</label>
                            <textarea
                              id="description"
                              class="form-control"
                              v-model="formularioEvento.description"
                              placeholder="Ingrese la descripción del evento"
                            ></textarea>
                            <small class="text-danger">{{ erroresFormularioEvento.description }}</small>
                          </div>

                          <!-- Seleccionar Lugar -->
                          <div class="mb-3">
                            <label for="location_id" class="form-label">Lugar</label>
                            <select
                              id="location_id"
                              class="form-select"
                              v-model.number="formularioEvento.location_id"
                            >
                              <option value="">Seleccione un Lugar</option>
                              <option
                                v-for="lugar in allLugares"
                                :key="lugar.addressId"
                                :value="lugar.addressId"
                              >
                                {{ lugar.city?.cityName }}, {{ lugar.country?.countryName }}, {{ lugar.addressLine }}
                              </option>
                            </select>
                            <small class="text-danger">{{ erroresFormularioEvento.location_id }}</small>
                          </div>

                          <!-- Seleccionar Fecha -->
                          <div class="mb-3">
                            <label for="event_date" class="form-label">Fecha</label>
                            <datepicker
                              v-model="formularioEvento.event_date"
                              :input-class="'form-control'"
                              :format="'yyyy-MM-dd'"
                              :monday-first="true"
                              :auto-close="true"
                              placeholder="Seleccione la fecha del evento"
                              :day-class="customDateClass"
                            ></datepicker>
                            <small class="text-danger">{{ erroresFormularioEvento.event_date }}</small>
                          </div>

                          <!-- Seleccionar Hora -->
                          <div class="mb-3">
                            <label for="event_time" class="form-label">Hora</label>
                            <input
                              type="time"
                              id="event_time"
                              class="form-control"
                              v-model="formularioEvento.event_time"
                            />
                            <small class="text-danger">{{ erroresFormularioEvento.event_time }}</small>
                          </div>

                          <!-- Voluntarios Requeridos (Opcional) -->
                          <div class="mb-3">
                            <label for="required_volunteers" class="form-label">Voluntarios Requeridos</label>
                            <input
                              type="number"
                              id="required_volunteers"
                              class="form-control"
                              v-model.number="formularioEvento.required_volunteers"
                              placeholder="Ingrese el número de voluntarios requeridos"
                              min="1"
                            />
                          </div>

                          <!-- Botón de Envío -->
                          <button type="submit" class="btn btn-success">Crear Evento</button>
                        </form>
                      </div>
                    </transition>

                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Footer -->
          <footer class="bg-light mt-3">
            <div
              class="d-flex justify-content-between align-items-center p-3"
            >
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a href="#">Políticas de privacidad</a>
                </li>
                <li class="list-inline-item"><a href="#">Términos de uso</a></li>
              </ul>
              <div>
                ©{{ currentYear }} Ecovolunteer, Hecho por Ecovolunteer.
              </div>
            </div>
          </footer>
        </div>
      </div>
  
      <!-- Botón para colapsar el sidebar -->
      <button
        class="btn toggle-button"
        @click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        <i
          class="bi"
          :class="isSidebarCollapsed ? 'bi-arrow-right' : 'bi-arrow-left'"
          style="color: white; font-size: 1.2rem;"
        ></i>
      </button>
    </div>
  </template>
  
  <script>
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
export default {
  name: 'gestionarEventos',
  components: {
    Datepicker,
  },
  data() {
    return {
      titulo: 'Gestionar Eventos',
      descripcion: 'Aquí podrás Crear, Modificar y Eliminar tus Eventos',
      currentYear: new Date().getFullYear(),
      isSidebarCollapsed: false,
      formularioVisible: null,
      paises: [],
      formularioEvento: {
        eventName: '',
        description: '',
        locationId: '',
        eventDate: null,
        eventTime: '',
        requiredVolunteers: null,
      },
      erroresFormularioEvento: {
        eventName: '',
        description: '',
        locationId: '',
        eventDate: '',
        eventTime: '',
        requiredVolunteers: '',
      },
      // Lista de lugares para seleccionar en el formulario de eventos
      lugaresParaEvento: [],
      // Datos para el formulario de agregar lugar
      formularioLugar: {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
        direccion: '',
        imagen: null,
      },
      departamentos: [],
      ciudades: [],
      localidades: [],
      barrios: [],
      erroresFormulario: {
        pais: '',
        departamento: '',
        ciudad: '',
        localidad: '',
        barrio: '',
        direccion: '',
      },
      // Datos para los filtros
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
      // Festivos de Colombia para 2024
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
      fetch('http://localhost:8090/api/addresses/all')
        .then(this.handleResponse)
        .then(response => response.json())
        .then(data => {
          this.allLugares = data;
        })
        .catch(error => {
          console.error('Error al obtener todas las direcciones:', error);
          alert('No se pudieron cargar los lugares. Por favor, intenta nuevamente.');
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
          alert('No se pudieron cargar los países. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar los departamentos. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar las ciudades. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar las localidades. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar los barrios. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar los departamentos. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar las ciudades. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar las localidades. Por favor, intenta nuevamente.');
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
            alert('No se pudieron cargar los barrios. Por favor, intenta nuevamente.');
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
          alert('Lugar guardado exitosamente.');
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
          alert(error.message);
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
        alert('Evento creado exitosamente.');
        this.resetFormularioEvento();
        this.fetchLatestAddresses();
        this.fetchAllAddresses();
      } catch (error) {
        console.error('Error al crear el evento:', error);
        alert(error.message);
      }
    },

    handleResponse(response) {
      if (response.status === 401) {
        // Token expirado o no autorizado
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        // Limpiar el token del almacenamiento
        sessionStorage.removeItem('jwt_token');
        // Redirigir a la página de login
        window.location.href = '/login';
        return Promise.reject('No autorizado');
      }
      return response;
    },

    fetchLatestAddresses() {
      fetch('http://localhost:8090/api/addresses/latest?limit=6')
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
      if (!confirm('¿Estás seguro de que deseas eliminar este lugar? Esta acción no se puede deshacer.')) {
        return;
      }

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
            alert('Lugar eliminado exitosamente.');
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
          alert(error.message);
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