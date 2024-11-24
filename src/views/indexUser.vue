<template>
  <div id="app-container">
    <!-- Sidebar -->
    <nav id="sidebar" :class="{ collapsed: isSidebarCollapsed }" class="bg-white">
      <div class="d-flex align-items-center justify-content-between p-3 border-bottom border-end-0">
        <router-link class="navbar-brand d-flex align-items-center" to="/indexUser">
          <img
            class="img-icon"
            src="../assets/images/icono-ecovolunteer_48x48.png"
            alt="Ecovolunteer Logo"
          />
          <h4 class="ms-2 mb-0" v-if="!isSidebarCollapsed">Ecovolunteer</h4>
        </router-link>
        <!-- Botón para colapsar el sidebar en dispositivos móviles -->
        <button
          class="btn d-lg-none"
          type="button"
          @click="toggleSidebar"
          aria-label="Toggle navigation"
        >
          <!-- Icono para el botón -->
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse d-lg-block" :class="{ show: !isSidebarCollapsed }" id="sidebarMenu">
        <ul class="nav nav-pills flex-column p-2">
          <li class="nav-item">
            <a class="nav-link disabled" tabindex="-1">
              <span class="item-name">Menú</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/indexUser" exact>
              <!-- Agregar icono -->
              <i class="fas fa-home me-3"></i>
              <span class="item-name">Inicio</span>
            </router-link>
          </li>
          <li>
            <hr />
          </li>
          <!-- Opción directa para Eventos -->
          <li class="nav-item">
            <router-link class="nav-link" to="/eventos" exact>
              <!-- Agregar icono -->
              <i class="fas fa-calendar-alt me-3"></i>
              <span class="item-name">Eventos</span>
            </router-link>
          </li>
          <!-- Puedes agregar más opciones aquí -->
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
            @click="toggleNavbar"
            aria-label="Toggle navigation"
          >
            <!-- Icono para el botón -->
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- Contenido del navbar -->
          <div class="collapse navbar-collapse" :class="{ show: navbarCollapsed }" id="navbarContent">
            <ul class="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  @click.prevent="toggleDropdown"
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
                  :class="{ show: dropdownOpen }"
                  aria-labelledby="navbarDropdown"
                >
                  <li><a class="dropdown-item" href="#">Perfil</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Configuración Privada</a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="/logout">Cerrar Sesión</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Contenido Principal -->
      <div id="content-area" class="p-4 mt-5">
        <!-- Header -->
        <div class="header-image mb-4">
          <div class="position-relative">
            <!-- Imagen del header -->
            <img
              src="../assets/images/dashboard/top-header-1600x250.png"
              alt="header"
              class="img-fluid img-header w-100"
            />
            <!-- Texto sobre la imagen -->
            <div class="position-absolute top-50 translate-middle text-white ms-6">
              <h1>Eventos Disponibles</h1>
              <p>¡Únete a los eventos y sé parte del cambio!</p>
            </div>
          </div>
        </div>

        <!-- Encabezado de Tabla y Buscador -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <!-- Nombres de Columnas -->
          <div class="d-flex gap-4 align-items-center">
            <span class="sortable-column" @click="sortBy('companyName')">
              Compañía
              <i :class="getSortIcon('companyName')" class="ms-2"></i>
            </span>
            <span class="sortable-column" @click="sortBy('eventTitle')">
              Título
              <i :class="getSortIcon('eventTitle')" class="ms-2"></i>
            </span>
            <span class="sortable-column" @click="sortBy('recommendations')">
              Recomendaciones
              <i :class="getSortIcon('recommendations')" class="ms-2"></i>
            </span>
            <span class="sortable-column" @click="sortBy('applications')">
              Postulaciones
              <i :class="getSortIcon('applications')" class="ms-2"></i>
            </span>
          </div>

          <!-- Buscador e Ícono de Filtros -->
          <div class="d-flex align-items-center">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              placeholder="Buscar eventos..."
              @input="applyFilters"
              aria-label="Buscar eventos"
            />
            <!-- Ícono para mostrar el panel de filtros -->
            <i
              class="fas fa-filter ms-3 fs-4"
              role="button"
              @click="toggleFilterPanel"
              aria-label="Mostrar filtros"
            ></i>
          </div>
        </div>

        <!-- Lista de Eventos -->
        <div class="events-container">
          <div v-if="isLoading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>

          <div v-else-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <div v-else-if="sortedEvents.length === 0" class="alert alert-info" role="alert">
            No se encontraron eventos.
          </div>

          <div v-else class="event-list">
            <div class="event-card" v-for="event in sortedEvents" :key="event.eventId">
              <!-- Icono de personas en la esquina superior derecha -->
              <div class="participants-info">
                <i class="fas fa-users"></i> {{ event.totalParticipantsApplied }}/{{ event.requiredVolunteers }}
              </div>
              <div class="event-card-content">
                <!-- Imagen del evento -->
                <div class="event-image">
                  <img :src="getFullImageUrl(event.image_url)" alt="Imagen del Evento" />
                </div>
                <!-- Detalles del evento -->
                <div class="event-details">
                  <h5 class="event-title"><strong>{{ event.eventName }}</strong></h5>
                  <p class="event-company"><strong>Compañía:</strong> {{ event.companyName }}</p>
                  <p class="event-address"><strong>Dirección:</strong> {{ event.addressLine }}</p>
                  <p class="event-location">
                    <strong>Ubicación:</strong> {{ event.addressLine }}, {{ event.cityName }}, {{ event.countryName }}
                  </p>
                  <p class="event-date-time">
                    <strong>Fecha:</strong> {{ event.eventDate }} 
                    <strong>Hora:</strong> {{ event.eventTime }}
                  </p>
                  <p class="event-description"><strong>Descripción:</strong> {{ event.description }}</p>
                </div>
              </div>
              <!-- Línea divisoria -->
              <hr />

              <!-- Botones -->
              <div class="event-footer">
                <div class="row">
                  <p class="text-end"> {{ event.totalRecommendations }} Recomendaciones</p>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <button class="btn btn-primary w-100" @click="joinEvent(event)">
                      Postularse como Voluntario
                    </button>
                  </div>
                  <div class="col-md-6 mb-2">
                    <button class="btn btn-secondary w-100" @click="recommendEvent(event)">
                      <i class="fas fa-thumbs-up"></i> Recomendar
                    </button>
                  </div>
                </div>
                <!-- Sección de preguntas -->
                <div class="event-questions mt-3">
                  <h6>Preguntas</h6>
                  <ul>
                    <li v-for="(question, index) in (event.questions ? event.questions.slice(0, 3) : [])" :key="index">
                      <strong>{{ question.user }}:</strong> {{ question.text }}
                      <div v-if="question.answer" class="answer">
                        <strong>Respuesta:</strong> {{ question.answer }}
                      </div>
                    </li>
                  </ul>
                  <div class="add-question">
                    <input
                      type="text"
                      v-model="newQuestionText[event.eventId]"
                      placeholder="Haz una pregunta..."
                      class="form-control"
                      @keyup.enter="addQuestion(event)"
                      aria-label="Añadir pregunta"
                    />
                    <button class="btn btn-primary mt-2" @click="addQuestion(event)">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel Lateral de Filtros -->
        <transition name="slide">
          <div class="filter-panel bg-light shadow-lg p-4" v-if="showFilters">
            <h5>Filtrar Eventos</h5>
            <!-- Dropdowns de Filtros -->
            <div class="mb-3">
              <select class="form-select" v-model="selectedCountry" @change="loadDepartments" aria-label="Seleccionar país">
                <option value="">País</option>
                <option v-for="country in countries" :key="country.id" :value="country.name">
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="selectedDepartment" @change="loadCities" :disabled="!departments.length" aria-label="Seleccionar departamento">
                <option value="">Departamento</option>
                <option v-for="department in departments" :key="department.id" :value="department.name">
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="selectedCity" @change="loadLocalities" :disabled="!cities.length" aria-label="Seleccionar ciudad">
                <option value="">Ciudad</option>
                <option v-for="city in cities" :key="city.id" :value="city.name">
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="selectedLocality" @change="loadNeighborhoods" :disabled="!localities.length" aria-label="Seleccionar localidad">
                <option value="">Localidad</option>
                <option v-for="locality in localities" :key="locality.id" :value="locality.name">
                  {{ locality.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="selectedNeighborhood" :disabled="!neighborhoods.length" aria-label="Seleccionar barrio">
                <option value="">Barrio</option>
                <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.name">
                  {{ neighborhood.name }}
                </option>
              </select>
            </div>
            <!-- Botones -->
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary" @click="applyFilters">Aplicar</button>
              <button class="btn btn-secondary" @click="clearFilters">Limpiar</button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <footer class="bg-light mt-3">
        <div class="d-flex justify-content-between align-items-center p-3">
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

    <!-- Botón para colapsar el sidebar -->
    <button
      class="btn toggle-button"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
    >
      <i
        class="fas"
        :class="isSidebarCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'"
        style="color: white; font-size: 1.2rem;"
      ></i>
    </button>
  </div>
</template>


<script>
import { eventApiClient } from '@/services/api'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'indexUser',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      isSidebarCollapsed: false,
      navbarCollapsed: false,
      dropdownOpen: false,
      searchQuery: '',
      selectedCompanyName: '', // Para filtrar por empresa
      selectedCountry: '',
      selectedDepartment: '',
      selectedCity: '',
      selectedLocality: '',
      selectedNeighborhood: '',
      showFilters: false, // Mostrar/ocultar filtros
      countries: [],
      departments: [],
      cities: [],
      localities: [],
      neighborhoods: [],
      events: [], // Eventos obtenidos desde el backend
      newQuestionText: {},
      isLoading: false,
      errorMessage: '',
      sortColumn: 'recommendations', // Ordenamiento inicial
      sortDirection: 'desc', // Dirección de ordenamiento inicial
    };
  },
  computed: {
    sortedEvents() {
      if (!this.sortColumn) return this.events;

      return this.events.slice().sort((a, b) => {
        let modifier = this.sortDirection === 'asc' ? 1 : -1;
        // Asegúrate de que los campos existen y son comparables
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    getFullImageUrl(imagePath) {
      const baseUrl = "http://localhost:8090"; // Cambia este valor si tu backend está en otro dominio
      return imagePath ? `${baseUrl}${imagePath}` : "https://via.placeholder.com/300x200";
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    toggleNavbar() {
      this.navbarCollapsed = !this.navbarCollapsed;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleFilterPanel() {
      this.showFilters = !this.showFilters;
      if (!this.showFilters) {
        // Opcional: Limpiar filtros al cerrar el panel
        // this.clearFilters();
      }
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        // Cambiar la dirección de ordenamiento si se hace clic en la misma columna
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // Cambiar a una nueva columna y establecer la dirección ascendente
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
    getSortIcon(column) {
      if (this.sortColumn !== column) return 'fa-sort';
      return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    },
    async fetchEvents() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const params = {};

        if (this.selectedCompanyName) params.companyName = this.selectedCompanyName;
        if (this.selectedCity) params.cityName = this.selectedCity;
        if (this.sortColumn) params.sortBy = this.sortColumn;
        if (this.sortDirection) params.sortDirection = this.sortDirection;

        // Añadir searchQuery si deseas buscar por nombre
        if (this.searchQuery) params.searchQuery = this.searchQuery;

        const response = await eventApiClient.get('');
        this.events = response.data;
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
        this.errorMessage = 'No se pudieron obtener los eventos. Por favor, intenta nuevamente más tarde.';
      } finally {
        this.isLoading = false;
      }
    },
    async applyFilters() {
      await this.fetchEvents();
    },
    async clearFilters() {
      this.searchQuery = '';
      this.selectedCompanyName = '';
      this.selectedCountry = '';
      this.selectedDepartment = '';
      this.selectedCity = '';
      this.selectedLocality = '';
      this.selectedNeighborhood = '';
      this.departments = [];
      this.cities = [];
      this.localities = [];
      this.neighborhoods = [];
      await this.fetchEvents(); // Obtener todos los eventos sin filtros
    },
    joinEvent(event) {
      alert(`Te has unido al evento: ${event.eventName}`);
      // Aquí puedes agregar la lógica para unirse al evento
    },
    recommendEvent(event) {
      alert(`Has recomendado el evento: ${event.eventName}`);
      // Lógica para manejar recomendaciones
    },
    addQuestion(event) {
      if (this.newQuestionText[event.eventId]) {
        // Aquí deberías realizar una llamada al backend para agregar la pregunta
        // Por ahora, agregaremos la pregunta localmente
        if (!event.questions) {
          this.$set(event, 'questions', []);
        }
        event.questions.push({
          user: 'Tú',
          text: this.newQuestionText[event.eventId],
          answer: null, // Respuesta pendiente
        });
        this.newQuestionText[event.eventId] = '';
      }
    },
    // Métodos para cargar datos de los filtros (ahora estáticos)
    loadCountries() {
      // Datos estáticos para países
      this.countries = [
        { id: 1, name: 'Colombia' },
        { id: 2, name: 'México' },
        // Agrega más países si es necesario
      ];
    },
    loadDepartments() {
      // Datos estáticos para departamentos según el país seleccionado
      if (this.selectedCountry === 'Colombia') {
        this.departments = [
          { id: 1, name: 'Atlántico' },
          { id: 2, name: 'Cundinamarca' },
          { id: 3, name: 'Antioquia' },
          // Agrega más departamentos
        ];
      } else if (this.selectedCountry === 'México') {
        this.departments = [
          { id: 4, name: 'Jalisco' },
          { id: 5, name: 'Nuevo León' },
          // Agrega más departamentos para México
        ];
      } else {
        this.departments = [];
      }
      this.selectedDepartment = '';
      this.cities = [];
      this.selectedCity = '';
      this.localities = [];
      this.selectedLocality = '';
      this.neighborhoods = [];
      this.selectedNeighborhood = '';
    },
    loadCities() {
      // Datos estáticos para ciudades según el departamento seleccionado
      if (this.selectedDepartment === 'Atlántico') {
        this.cities = [
          { id: 1, name: 'Barranquilla' },
          { id: 2, name: 'Sabanalarga' },
          // Agrega más ciudades
        ];
      } else if (this.selectedDepartment === 'Cundinamarca') {
        this.cities = [
          { id: 3, name: 'Bogotá' },
          { id: 4, name: 'Soacha' },
          // Agrega más ciudades
        ];
      } else if (this.selectedDepartment === 'Antioquia') {
        this.cities = [
          { id: 5, name: 'Medellín' },
          { id: 6, name: 'Envigado' },
          // Agrega más ciudades
        ];
      } else if (this.selectedDepartment === 'Jalisco') {
        this.cities = [
          { id: 7, name: 'Guadalajara' },
          { id: 8, name: 'Puerto Vallarta' },
          // Agrega más ciudades
        ];
      } else if (this.selectedDepartment === 'Nuevo León') {
        this.cities = [
          { id: 9, name: 'Monterrey' },
          { id: 10, name: 'San Pedro Garza García' },
          // Agrega más ciudades
        ];
      } else {
        this.cities = [];
      }
      this.selectedCity = '';
      this.localities = [];
      this.selectedLocality = '';
      this.neighborhoods = [];
      this.selectedNeighborhood = '';
    },
    loadLocalities() {
      // Datos estáticos para localidades según la ciudad seleccionada
      if (this.selectedCity === 'Barranquilla') {
        this.localities = [
          { id: 1, name: 'Centro' },
          { id: 2, name: 'El Prado' },
          // Agrega más localidades
        ];
      } else if (this.selectedCity === 'Bogotá') {
        this.localities = [
          { id: 3, name: 'Usaquén' },
          { id: 4, name: 'Chapinero' },
          // Agrega más localidades
        ];
      } else if (this.selectedCity === 'Medellín') {
        this.localities = [
          { id: 5, name: 'El Poblado' },
          { id: 6, name: 'Bello' },
          // Agrega más localidades
        ];
      } else if (this.selectedCity === 'Guadalajara') {
        this.localities = [
          { id: 7, name: 'Tlaquepaque' },
          { id: 8, name: 'Zapopan' },
          // Agrega más localidades
        ];
      } else if (this.selectedCity === 'Monterrey') {
        this.localities = [
          { id: 9, name: 'San Pedro Garza García' },
          { id: 10, name: 'Cumbres' },
          // Agrega más localidades
        ];
      } else {
        this.localities = [];
      }
      this.selectedLocality = '';
      this.neighborhoods = [];
      this.selectedNeighborhood = '';
    },
    loadNeighborhoods() {
      // Datos estáticos para barrios según la localidad seleccionada
      if (this.selectedLocality === 'Centro') {
        this.neighborhoods = [
          { id: 1, name: 'La Candelaria' },
          { id: 2, name: 'La Merced' },
          // Agrega más barrios
        ];
      } else if (this.selectedLocality === 'Usaquén') {
        this.neighborhoods = [
          { id: 3, name: 'Santa Bárbara' },
          { id: 4, name: 'La Florida' },
          // Agrega más barrios
        ];
      } else if (this.selectedLocality === 'El Poblado') {
        this.neighborhoods = [
          { id: 5, name: 'La 70' },
          { id: 6, name: 'Castilla' },
          // Agrega más barrios
        ];
      } else if (this.selectedLocality === 'Tlaquepaque') {
        this.neighborhoods = [
          { id: 7, name: 'El Arenal' },
          { id: 8, name: 'Plaza Patria' },
          // Agrega más barrios
        ];
      } else if (this.selectedLocality === 'San Pedro Garza García') {
        this.neighborhoods = [
          { id: 9, name: 'Villa Fontana' },
          { id: 10, name: 'Fundidora' },
          // Agrega más barrios
        ];
      } else {
        this.neighborhoods = [];
      }
      this.selectedNeighborhood = '';
    },
  },
  mounted() {
    this.loadCountries();
    this.fetchEvents(); // Obtener eventos al montar el componente
  },
};
</script>



<style scoped>

/* Estilos personalizados */
#app-container {
  display: flex;
  height: 100vh; /* Ocupar toda la altura de la ventana */
  overflow: hidden; /* Evitar scroll en el body */
}

/* Estilos para el sidebar y su colapso */
#sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
  transition: width 0.3s ease;
}

#sidebar.collapsed {
  width: 80px;
}

/* Estilos para el contenido principal */
#main-content {
  flex-grow: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

#sidebar.collapsed ~ #main-content {
  margin-left: 80px;
}

#content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Estilos para el navbar */
#main-navbar {
  width: calc(100% - 250px);
  margin-left: 250px;
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

#sidebar.collapsed ~ #main-navbar {
  width: calc(100% - 80px);
  margin-left: 80px;
}

/* Nombres de Columnas Ordenables */
.sortable-column {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
}

.sortable-column i {
  transition: transform 0.2s;
}

/* Transición del panel lateral de filtros */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

/* Panel lateral de filtros */
.filter-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  z-index: 1050;
  overflow-y: auto;
  background-color: #f8f9fa;
}

/* Estilo para la lista de eventos */
.events-container {
  overflow-y: auto;
  flex-grow: 1; /* Para que ocupe el espacio disponible */
  padding-right: 1rem; /* Espacio para evitar superposición con el scrollbar */
}

.event-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem; /* Evitar que el último elemento quede pegado al borde */
}

/* Estilos para las tarjetas de eventos */
.event-card {
  position: relative;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Icono de participantes */
.participants-info {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Contenido del evento */
.event-card-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

/* Imagen del evento */
.event-image img {
  width: 300px;
  height: 220px;
  object-fit: cover;
  border-radius: 0.25rem;
}

/* Detalles del evento */
.event-details {
  flex-grow: 1;
}

/* Sección de preguntas */
.event-questions {
  margin-top: 1rem;
}

.event-questions ul {
  list-style-type: none;
  padding: 0;
}

.event-questions li {
  background-color: #f1f1f1;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.event-questions .answer {
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #007bff;
}

.add-question {
  margin-top: 1rem;
}

.add-question input {
  width: 100%;
}

.add-question button {
  float: right;
  margin-top: 0.5rem;
}

/* Botones */
.btn {
  background-color: #2fb13a;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #279c33;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}

/* Ajuste para dispositivos móviles */
@media (max-width: 991.98px) {
  #sidebar,
  #sidebar.collapsed {
    left: -250px;
    transition: left 0.3s ease-in-out;
  }
  #sidebar.show {
    left: 0;
  }
  #main-content {
    margin-left: 0;
  }
  #main-navbar {
    width: 100%;
    margin-left: 0;
  }
  .toggle-button {
    display: none;
  }

  /* Ajuste del card en dispositivos móviles */
  .event-card-content {
    flex-direction: column;
    align-items: center;
  }

  .event-image img {
    width: 100%;
    height: auto;
  }

  .event-details {
    width: 100%;
    text-align: center;
  }

  /* Ajuste del panel de filtros en móviles */
  .filter-panel {
    width: 80%;
  }
}
</style>

