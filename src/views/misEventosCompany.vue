<template>
  <CompanyLayout
    :titulo="titulo"
    :descripcion="descripcion"
  >
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card shadow-sm border-0 rounded">
            <div class="card-body scrollable-card-body">
              <p class="card-text">
                ESTE ES EL BODY DEL CARD
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
  name: 'MisEventosCompany',
  components: {
    CompanyLayout,
  },
  data() {
    return {
      titulo: 'Mis Eventos',
      descripcion: 'Aquí puedes ver todos tus eventos',
    };
  },
};
</script>