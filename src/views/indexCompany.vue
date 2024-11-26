<template>
  <CompanyLayout
    :titulo="tituloHeader"
    :descripcion="descripcionHeader"
  >
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card shadow-sm border-0 rounded">
            <div class="card-body scrollable-card-body">
              <!-- Sección: Cómo Funciona -->
              <div class="row mt-5">
                <div class="col-12">
                  <h3 class="text-center mb-4">Cómo Funciona</h3>
                  <div class="row">
                    <div
                      class="col-md-3 col-sm-6 mb-4"
                      v-for="(feature, index) in features"
                      :key="index"
                    >
                      <div
                        class="custom-card-hover card h-100 text-center"
                        @click="openModal(feature)"
                      >
                        <div class="card-body">
                          <div class="feature-icon mb-3">
                            <i :class="feature.icon" style="font-size: 2.5rem; color: #28a745;"></i>
                          </div>
                          <h5 class="card-title">{{ feature.title }}</h5>
                          <p class="card-text">{{ feature.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal -->
              <div
                class="modal fade"
                tabindex="-1"
                ref="modal"
                :id="modalId"
                aria-labelledby="modalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <div class="d-flex align-items-center">
                        <i
                          :class="currentFeature?.icon"
                          class="me-2"
                          style="font-size: 1.5rem; color: #28a745;"
                        ></i>
                        <h5 class="modal-title" id="modalLabel">{{ currentFeature?.title }}</h5>
                      </div>
                    </div>
                    <div class="modal-body">
                      <template v-if="currentFeature?.video">
                        <video controls autoplay style="width: 100%; height: auto;">
                          <source :src="currentFeature.video" type="video/mp4" />
                          Tu navegador no soporta reproducción de video.
                        </video>
                      </template>
                      <template v-else>
                        <p>No se pudo cargar el video. Por favor, inténtalo nuevamente.</p>
                      </template>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="closeModal"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CompanyLayout>
</template>

<script>
import CompanyLayout from '@/layouts/CompanyLayout.vue';

export default {
  name: 'IndexCompany',
  components: {
    CompanyLayout,
  },
  data() {
    return {
      tituloHeader: 'Bienvenida compañia, ',
      descripcionHeader: 'Modulo principal',
      modalId: 'modal-feature',
      currentFeature: null, // Almacena el feature seleccionado para mostrar en el modal
      features: [
        {
          icon: 'fas fa-map-marker-alt',
          title: 'Agregar Dirección',
          description: 'Añade la dirección de tu empresa para gestionar mejor tus eventos.',
          link: '/agregar-direccion',
          video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
          icon: 'fas fa-calendar-plus',
          title: 'Agregar Evento',
          description: 'Crea y gestiona tus eventos de voluntariado de manera sencilla.',
          link: '/agregar-evento',
          video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
          icon: 'fas fa-users-cog',
          title: 'Gestionar Usuarios',
          description: 'Administra y revisa las aplicaciones de voluntarios para tus proyectos.',
          link: '/gestionar-usuarios',
          video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
          icon: 'fas fa-chart-line',
          title: 'Ver Reportes',
          description: 'Accede a informes detallados sobre el impacto de tus proyectos.',
          link: '/ver-reportes',
          video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
      ],
    };
  },
  methods: {
    openModal(feature) {
      this.currentFeature = feature;
      const modal = new window.bootstrap.Modal(this.$refs.modal, {
        backdrop: 'static',
        keyboard: false,
      });
      modal.show();
    },
    closeModal() {
      const modal = window.bootstrap.Modal.getInstance(this.$refs.modal);
      modal.hide();
      this.currentFeature = null;
    },
  },
};
</script>


<style scoped>
.custom-card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
}

.modal-header i {
  margin-right: 10px;
}

.modal-footer {
  text-align: center;
}
</style>
