<!-- src/views/indexUser.vue -->
<template>
  <UserLayout titulo="Eventos Disponibles" descripcion="¡Únete a los eventos y sé parte del cambio!">
    <!-- Encabezado de Tabla y Buscador -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <!-- Nombres de Columnas y Botón Toggle de Grilla -->
      <div class="d-flex gap-0 align-items-center">
        <!-- Botón Toggle de Grilla -->
        <button
          class="btn btn-light me-2"
          @click="toggleGrid"
          :aria-label="'Cambiar a ' + (gridColumns === 1 ? '2' : gridColumns === 2 ? '3' : '1') + ' columnas'"
        >
          <i :class="getGridIcon(gridColumns)"></i>
        </button>
        
        <!-- Botones de Ordenamiento -->
        <button class="btn btn-light me-2">
          <span class="sortable-column" @click="sortBy('eventDate')">
            Fecha del evento
            <i v-if="sortColumn === 'eventDate'" :class="getSortIcon('eventDate')" class="ms-2"></i>
          </span>
        </button>
        <button class="btn btn-light me-2">
          <span class="sortable-column" @click="sortBy('eventName')">
            Título
            <i v-if="sortColumn === 'eventName'" :class="getSortIcon('eventName')" class="ms-2"></i>
          </span>
        </button>
        <button class="btn btn-light me-2">
          <span class="sortable-column" @click="sortBy('companyName')">
            Compañía
            <i v-if="sortColumn === 'companyName'" :class="getSortIcon('companyName')" class="ms-2"></i>
          </span>
        </button>
        <button class="btn btn-light me-2">
          <span class="sortable-column" @click="sortBy('totalRecommendations')">
            Recomendaciones
            <i v-if="sortColumn === 'totalRecommendations'" :class="getSortIcon('totalRecommendations')" class="ms-2"></i>
          </span>
        </button>
        <button class="btn btn-light me-2">
          <span class="sortable-column" @click="sortBy('totalParticipantsApplied')">
            Postulaciones
            <i v-if="sortColumn === 'totalParticipantsApplied'" :class="getSortIcon('totalParticipantsApplied')" class="ms-2"></i>
          </span>
        </button>
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
        <button class="btn btn-light ms-2" @click="toggleFilterPanel" aria-label="Mostrar filtros">
          <i class="fas fa-filter fs-4"></i>
        </button>
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

      <div :class="['event-list', `grid-${gridColumns}`]">
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
            <div class="event-details text-center">
              <h5 class="event-title"><strong>{{ event.eventName }}</strong></h5>
              <p class="event-company"><strong>Compañía:</strong> {{ event.companyName }}</p>
              
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
          <div class="event-footer d-flex flex-column">
            <div class="row mb-2">
              <p class="text-end mb-0"> {{ event.totalRecommendations }} Recomendaciones</p>
            </div>
            <div class="row">
              <div class="col-md-6 mb-2">
                <button class="btn btn-primary w-100 btn-standard-height" @click="toggleApplication(event)">
                  {{ event.hasApplied ? 'Cancelar Postulación' : 'Postularse como Voluntario' }}
                </button>
              </div>
              <div class="col-md-6 mb-2">
                <button class="btn btn-secondary w-100 btn-standard-height" @click="toggleRecommendation(event)">
                  {{ event.hasRecommended ? 'Cancelar Recomendación' : 'Recomendar' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel Lateral de Filtros -->
    <transition name="slide">
      <FilterBar
        v-if="showFilters"
        :paises="paises"
        :departamentos="departamentos"
        :ciudades="ciudades"
        :localidades="localidades"
        :barrios="barrios"
        v-model:selectedCountry="paisesFiltrados"
        v-model:selectedDepartment="departamentosFiltrados"
        v-model:selectedCity="ciudadesFiltradas"
        v-model:selectedLocality="localidadesFiltradas"
        v-model:selectedNeighborhood="barriosFiltrados"
        @loadDepartments="loadDepartments"
        @loadCities="loadCities"
        @loadLocalities="loadLocalities"
        @loadNeighborhoods="loadNeighborhoods"
        @applyFilters="applyFilters"
        @clearFilters="clearFilters"
        @close="toggleFilterPanel"
      />
    </transition>

    <!-- Modales -->
    <!-- Modal de Confirmación para Cancelar Postulación -->
    <transition name="fade">
      <div v-if="showConfirmationModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Cancelación</h5>
            <button type="button" class="close-button" @click="handleModalCancel">&times;</button>
          </div>
          <div class="modal-body">
            {{ confirmationMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleModalCancel">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="handleModalConfirm">
              Sí, cancelar postulación
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Notificación -->
    <transition name="fade">
      <div v-if="showNotificationModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h5 class="modal-title">{{ notificationTitle }}</h5>
            <button type="button" class="close-button" @click="closeNotificationModal">&times;</button>
          </div>
          <div class="modal-body">
            {{ notificationMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeNotificationModal">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Confirmación para Cancelar Recomendación -->
    <transition name="fade">
      <div v-if="showRecommendationConfirmationModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Cancelación de Recomendación</h5>
            <button type="button" class="close-button" @click="handleRecommendationModalCancel">&times;</button>
          </div>
          <div class="modal-body">
            {{ recommendationConfirmationMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleRecommendationModalCancel">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="handleRecommendationModalConfirm">
              Sí, cancelar recomendación
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Mensaje -->
    <ModalMensaje
      v-if="mostrarModal"
      :config="modalConfig"
      @close="mostrarModal = false"
    />
  </UserLayout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout.vue';
import FilterBar from '@/components/FilterBar.vue';
import { eventApiClient } from '@/services/api';
import ModalMensaje from '@/components/modals/ModalMensaje.vue';

export default {
  name: 'indexUser',
  components: {
    UserLayout,
    FilterBar,
    ModalMensaje,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      isSidebarCollapsed: false,
      navbarCollapsed: false,
      dropdownOpen: false,
      searchQuery: '',
      selectedCompanyName: '',
      paisesFiltrados: '',
      departamentosFiltrados: '',
      ciudadesFiltradas: '',
      localidadesFiltradas: '',
      barriosFiltrados: '',
      showFilters: false,
      paises: [],
      departamentos: [],
      ciudades: [],
      localidades: [],
      barrios: [],
      events: [],
      isLoading: false,
      errorMessage: '',
      sortColumn: 'eventDate',
      sortDirection: 'desc',
      confirmationMessage: '',
      modalResolve: null,
      showConfirmationModal: false,
      showNotificationModal: false,
      notificationMessage: '',
      notificationTitle: '',
      notificationType: '',
      recommendationConfirmationMessage: '',
      showRecommendationConfirmationModal: false,
      recommendationModalResolve: null,
      selectedEvent: null,
      modalConfig: {
        titulo: '',
        mensaje: '',
        botonTexto: '',
        tipo: '',
      },
      mostrarModal: false,
      gridColumns: 2, // Valor inicial de la grilla (1, 2 o 3)
    };
  },
  computed: {
    sortedEvents() {
      if (!this.sortColumn) return this.events;

      return this.events.slice().sort((a, b) => {
        let modifier = this.sortDirection === 'asc' ? 1 : -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    getFullImageUrl(imagePath) {
      const baseUrl = "http://localhost:8090";
      return imagePath ? `${baseUrl}${imagePath}` : "https://via.placeholder.com/300x200";
    },
    toggleFilterPanel() {
      this.showFilters = !this.showFilters;
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      this.fetchEvents();
    },
    getSortIcon(column) {
      if (this.sortColumn !== column) return '';
      return this.sortDirection === 'asc' ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    },
    async fetchEvents() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const params = {};

        if (this.selectedCompanyName) params.companyName = this.selectedCompanyName;
        if (this.paisesFiltrados) params.countryId = this.paisesFiltrados;
        if (this.departamentosFiltrados) params.departmentId = this.departamentosFiltrados;
        if (this.ciudadesFiltradas) params.cityId = this.ciudadesFiltradas;
        if (this.localidadesFiltradas) params.localityId = this.localidadesFiltradas;
        if (this.barriosFiltrados) params.neighborhoodId = this.barriosFiltrados;
        if (this.sortColumn) params.sortBy = this.sortColumn;
        if (this.sortDirection) params.sortDirection = this.sortDirection;
        if (this.searchQuery) params.searchQuery = this.searchQuery;

        const response = await eventApiClient.get('', { params });
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
      this.paisesFiltrados = '';
      this.departamentosFiltrados = '';
      this.ciudadesFiltradas = '';
      this.localidadesFiltradas = '';
      this.barriosFiltrados = '';
      this.departamentos = [];
      this.ciudades = [];
      this.localidades = [];
      this.barrios = [];
      await this.fetchEvents();
    },
    async toggleApplication(event) {
      try {
        if (event.hasApplied) {
          // Mostrar confirmación antes de cancelar
          const confirmed = await this.confirmCancellation(event);
          if (!confirmed) {
            return; // Si el usuario cancela la acción, no hacemos nada
          }

          // Cancelar postulación
          await eventApiClient.delete(`/${event.eventId}/apply`);
          // Mostrar notificación de éxito
          this.showNotification('Has cancelado tu postulación.', 'Éxito');
        } else {
          // Postularse al evento
          await eventApiClient.post(`/${event.eventId}/apply`);
          // Mostrar notificación de éxito
          this.showNotification('Te has postulado al evento.', 'Éxito');
        }
        // Volver a obtener los eventos actualizados
        await this.fetchEvents();
      } catch (error) {
        console.error('Error al procesar la solicitud de postulación:', error);
        // Mostrar notificación de error
        this.showNotification('Ocurrió un error al procesar tu solicitud.', 'Error');
      }
    },
    confirmCancellation(event) {
      this.confirmationMessage = `¿Estás seguro que deseas cancelar tu postulación al evento "${event.eventName}"?`;
      this.selectedEvent = event;
      return new Promise((resolve) => {
        this.modalResolve = resolve;
        this.showConfirmationModal = true; // Mostrar el modal
      });
    },
    handleModalConfirm() {
      // El usuario confirmó
      this.showConfirmationModal = false;
      if (this.modalResolve) {
        this.modalResolve(true);
        this.modalResolve = null;
      }
    },
    handleModalCancel() {
      // El usuario canceló
      this.showConfirmationModal = false;
      if (this.modalResolve) {
        this.modalResolve(false);
        this.modalResolve = null;
      }
    },
    // Métodos para el modal de notificación
    showNotification(message, title = '') {
      this.notificationMessage = message;
      this.notificationTitle = title || 'Información';
      this.showNotificationModal = true;
    },
    closeNotificationModal() {
      this.showNotificationModal = false;
      this.notificationMessage = '';
      this.notificationTitle = '';
    },
    async toggleRecommendation(event) {
      try {
        if (event.hasRecommended) {
          // Mostrar confirmación antes de cancelar
          const confirmed = await this.confirmRecommendationCancellation(event);
          if (!confirmed) {
            return; // Si el usuario cancela la acción, no hacemos nada
          }

          // Cancelar recomendación
          await eventApiClient.delete(`/${event.eventId}/recommend`);
          // Mostrar notificación de éxito
          this.showNotification('Has cancelado tu recomendación.', 'Éxito');
        } else {
          // Recomendar el evento
          await eventApiClient.post(`/${event.eventId}/recommend`);
          // Mostrar notificación de éxito
          this.showNotification('Has recomendado el evento.', 'Éxito');
        }
        // Volver a obtener los eventos actualizados
        await this.fetchEvents();
      } catch (error) {
        console.error('Error al procesar la recomendación:', error);
        // Mostrar notificación de error
        this.showNotification('Ocurrió un error al procesar tu solicitud.', 'Error');
      }
    },
    confirmRecommendationCancellation(event) {
      this.recommendationConfirmationMessage = `¿Estás seguro que deseas cancelar tu recomendación al evento "${event.eventName}"?`;
      this.selectedEvent = event;
      return new Promise((resolve) => {
        this.recommendationModalResolve = resolve;
        this.showRecommendationConfirmationModal = true; // Mostrar el modal
      });
    },
    handleRecommendationModalConfirm() {
      // El usuario confirmó
      this.showRecommendationConfirmationModal = false;
      if (this.recommendationModalResolve) {
        this.recommendationModalResolve(true);
        this.recommendationModalResolve = null;
      }
    },
    handleRecommendationModalCancel() {
      // El usuario canceló
      this.showRecommendationConfirmationModal = false;
      if (this.recommendationModalResolve) {
        this.recommendationModalResolve(false);
        this.recommendationModalResolve = null;
      }
    },
    // Métodos para cargar datos de los filtros
    async loadCountries() {
      try {
        const response = await fetch('http://localhost:8090/api/addresses/countries');
        if (!response.ok) {
          throw new Error('Error al obtener los países.');
        }
        const data = await response.json();
        this.paises = data;
      } catch (error) {
        console.error('Error al cargar países:', error);
        this.mostrarModalMensaje('No se pudieron cargar los países. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
      }
    },
    async loadDepartments() {
      if (this.paisesFiltrados) {
        try {
          const response = await fetch(`http://localhost:8090/api/addresses/departments?countryId=${this.paisesFiltrados}`);
          if (!response.ok) {
            throw new Error('Error al obtener los departamentos.');
          }
          const data = await response.json();
          this.departamentos = data;
          // Limpiar campos dependientes
          this.departamentosFiltrados = '';
          this.ciudades = [];
          this.ciudadesFiltradas = '';
          this.localidades = [];
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        } catch (error) {
          console.error('Error al cargar departamentos:', error);
          this.mostrarModalMensaje('No se pudieron cargar los departamentos. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
          // Limpiar campos en caso de error
          this.departamentos = [];
          this.departamentosFiltrados = '';
          this.ciudades = [];
          this.ciudadesFiltradas = '';
          this.localidades = [];
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        }
      } else {
        this.departamentos = [];
        this.departamentosFiltrados = '';
        this.ciudades = [];
        this.ciudadesFiltradas = '';
        this.localidades = [];
        this.localidadesFiltradas = '';
        this.barrios = [];
        this.barriosFiltrados = '';
      }
    },
    async loadCities() {
      if (this.departamentosFiltrados) {
        try {
          const response = await fetch(`http://localhost:8090/api/addresses/cities?departmentId=${this.departamentosFiltrados}`);
          if (!response.ok) {
            throw new Error('Error al obtener las ciudades.');
          }
          const data = await response.json();
          this.ciudades = data;
          // Limpiar campos dependientes
          this.ciudadesFiltradas = '';
          this.localidades = [];
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        } catch (error) {
          console.error('Error al cargar ciudades:', error);
          this.mostrarModalMensaje('No se pudieron cargar las ciudades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
          // Limpiar campos en caso de error
          this.ciudades = [];
          this.ciudadesFiltradas = '';
          this.localidades = [];
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        }
      } else {
        this.ciudades = [];
        this.ciudadesFiltradas = '';
        this.localidades = [];
        this.localidadesFiltradas = '';
        this.barrios = [];
        this.barriosFiltrados = '';
      }
    },
    async loadLocalities() {
      if (this.ciudadesFiltradas) {
        try {
          const response = await fetch(`http://localhost:8090/api/addresses/localities?cityId=${this.ciudadesFiltradas}`);
          if (!response.ok) {
            throw new Error('Error al obtener las localidades.');
          }
          const data = await response.json();
          this.localidades = data;
          // Limpiar campos dependientes
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        } catch (error) {
          console.error('Error al cargar localidades:', error);
          this.mostrarModalMensaje('No se pudieron cargar las localidades. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
          // Limpiar campos en caso de error
          this.localidades = [];
          this.localidadesFiltradas = '';
          this.barrios = [];
          this.barriosFiltrados = '';
        }
      } else {
        this.localidades = [];
        this.localidadesFiltradas = '';
        this.barrios = [];
        this.barriosFiltrados = '';
      }
    },
    async loadNeighborhoods() {
      if (this.localidadesFiltradas) {
        try {
          const response = await fetch(`http://localhost:8090/api/addresses/neighborhoods?localityId=${this.localidadesFiltradas}`);
          if (!response.ok) {
            throw new Error('Error al obtener los barrios.');
          }
          const data = await response.json();
          this.barrios = data;
          // Limpiar campos dependientes
          this.barriosFiltrados = '';
        } catch (error) {
          console.error('Error al cargar barrios:', error);
          this.mostrarModalMensaje('No se pudieron cargar los barrios. Por favor, intenta nuevamente.', 'Error', 'Cerrar', 'danger');
          // Limpiar campos en caso de error
          this.barrios = [];
          this.barriosFiltrados = '';
        }
      } else {
        this.barrios = [];
        this.barriosFiltrados = '';
      }
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
    // Método para alternar la grilla
    toggleGrid() {
      if (this.gridColumns < 3) {
        this.gridColumns += 1;
      } else {
        this.gridColumns = 1;
      }
    },
    // Método para obtener el icono según el número de columnas
    getGridIcon(columns) {
      switch (columns) {
        case 1:
          return 'fas fa-th-list'; // Icono de lista
        case 2:
          return 'fas fa-th'; // Icono de 2 columnas
        case 3:
          return 'fas fa-th-large'; // Icono de 3 columnas
        default:
          return 'fas fa-th';
      }
    },
  },
  mounted() {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
      this.$router.push('/login');
    } else {
      this.loadCountries();
      this.fetchEvents();
    }
  },
};
</script>

<style>
/* Estilos para la grilla de eventos */
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  justify-content: center; /* Centrar el contenido */
  transition: all 0.3s ease; /* Transición suave al cambiar la grilla */
}

/* Configuración para grid-1: una sola columna centrada */
.event-list.grid-1 {
  flex-direction: column;
  align-items: center;
}

.event-list.grid-1 .event-card {
  flex: 0 0 600px; /* No permitir crecimiento ni encogimiento */
  max-width: 600px; /* Limita el ancho máximo de la tarjeta */
  width: 100%; /* Asegura que ocupe el 100% del contenedor padre */
  margin: 0 auto; /* Centra la tarjeta horizontalmente */
}

/* Configuración para grid-2: dos columnas */
.event-list.grid-2 .event-card {
  flex: 1 1 calc(50% - 1rem);
  max-width: calc(50% - 1rem);
}

/* Configuración para grid-3: tres columnas */
.event-list.grid-3 .event-card {
  flex: 1 1 calc(33.333% - 1rem);
  max-width: calc(33.333% - 1rem);
}

/* Asegurarse de que la grilla sea responsiva */
@media (max-width: 768px) {
  .event-list.grid-3 .event-card,
  .event-list.grid-2 .event-card,
  .event-list.grid-1 .event-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

/* Estilos para las tarjetas de eventos */
.event-card {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Remover height: 100%; para evitar conflictos */
}

/* Contenido principal de la tarjeta que se expandirá */
.event-card-content {
  flex-grow: 1; /* Permite que esta sección ocupe el espacio disponible */
}

/* Imagen del evento */
.event-image {
  position: relative;
  width: 100%;
}

.event-image img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 0.25rem;
}

/* Información de Participantes dentro de la imagen */
.participants-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* Blanco semi-transparente */
  color: #007bff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1; /* Asegura que esté por encima de la imagen */
}

@media (max-width: 768px) {
  .participants-info {
    top: 5px;
    right: 5px;
    padding: 0.3rem;
    font-size: 0.9rem;
  }
}

/* Detalles del evento */
.event-details {
  text-align: center;
  margin-top: 1rem;
}

.event-details p {
  margin-bottom: 0.5rem;
}

/* Línea divisoria */
hr {
  border-top: 1px solid #dee2e6;
  margin: 1rem 0;
}

/* Botones con altura estándar */
.btn-standard-height {
  height: 50px; /* Altura estándar para los botones */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ajustes para los botones dentro de event-footer */
.event-footer {
  width: 100%;
}

/* Estilos para el Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background-color: #fff;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s;
}

.modal-header,
.modal-footer {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #dee2e6;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Animación "fade" para los modales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Animación "fadeIn" para la modal-container */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .event-card {
    flex: 1 1 100%;
    max-width: 100%;
  }

  /* Ajuste del panel de filtros en móviles */
  .filter-panel {
    width: 80%;
  }
}
</style>
