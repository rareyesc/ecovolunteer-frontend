<template>
  <CompanyLayout
    :titulo="tituloHeader"
    :descripcion="descripcionHeader"
  >
    <!-- Contenido específico de esta vista -->
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card shadow-sm border-0 rounded">
            <div class="card-body scrollable-card-body">
              <!-- Aquí agregas tu contenido específico -->
              <p class="card-text">
                Este es el contenido específico de la página de inicio de la compañía.
              </p>
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
      tituloHeader: 'Index Compañías',
      descripcionHeader: 'Esta es la página principal de las compañías',
    };
  },
};
</script>