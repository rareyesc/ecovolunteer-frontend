<template>
    <div class="modal fade" tabindex="-1" ref="modal" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog mt-5">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">¡Registro Exitoso!</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="redirectToLogin">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuccessModal',
    props: {
      message: {
        type: String,
        default: 'Tu cuenta ha sido creada exitosamente.',
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
      redirectToLogin() {
        this.closeModal();
        this.$router.push('/login');
      },
    },
  };
  </script>