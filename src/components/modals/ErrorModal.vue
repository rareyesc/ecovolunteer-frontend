<template>
    <div class="modal fade" tabindex="-1" ref="modal" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog mt-5">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Errores en el formulario</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorModal',
    props: {
      errorMessages: {
        type: Array,
        required: true,
      },
    },
    methods: {
      showModal() {
        if (!this.modalInstance) {
          this.modalInstance = new window.bootstrap.Modal(this.$refs.modal);
        }
        this.modalInstance.show();
      },
      closeModal() {
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
    },
  };
  </script>