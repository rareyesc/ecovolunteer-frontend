<template>
    <div
      class="modal fade"
      :id="modalId"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title" id="modalLabel">{{ titulo }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="cerrarModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ mensaje }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelar">
              {{ textoCancelar }}
            </button>
            <button type="button" class="btn btn-danger" @click="confirmar">
              {{ textoConfirmar }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalConfirmacion',
    props: {
      modalId: {
        type: String,
        required: true,
      },
      titulo: {
        type: String,
        default: 'Confirmación',
      },
      mensaje: {
        type: String,
        required: true,
      },
      textoCancelar: {
        type: String,
        default: 'Cancelar',
      },
      textoConfirmar: {
        type: String,
        default: 'Confirmar',
      },
    },
    methods: {
      mostrarModal() {
        const modal = new window.bootstrap.Modal(this.$refs.modal);
        modal.show();
        this.modalInstance = modal;
      },
      cerrarModal() {
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      confirmar() {
        this.cerrarModal();
        this.$emit('confirmado');
      },
      cancelar() {
        this.cerrarModal();
        this.$emit('cancelado');
      },
    },
    mounted() {
      this.mostrarModal();
    },
  };
  </script>
  