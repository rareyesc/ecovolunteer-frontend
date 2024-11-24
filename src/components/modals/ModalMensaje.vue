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
        <div
          class="modal-header"
          :class="{
            'bg-success text-white': tipo === 'success',
            'bg-danger text-white': tipo === 'danger',
            'bg-primary text-white': tipo === 'primary',
          }"
        >
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
          <button
            type="button"
            class="btn btn-secondary"
            @click="cerrarModal"
          >
            {{ botonTexto }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalMensaje',
  props: {
    modalId: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      default: 'Mensaje',
    },
    mensaje: {
      type: String,
      required: true,
    },
    botonTexto: {
      type: String,
      default: 'Cerrar',
    },
    tipo: {
      type: String,
      default: 'primary', // 'success', 'danger', 'primary'
    },
  },
  methods: {
    mostrarModal() {
      console.log('window.bootstrap:', window.bootstrap);
      const modal = new window.bootstrap.Modal(this.$refs.modal);
      modal.show();
      this.modalInstance = modal;
    },
    cerrarModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
      this.$emit('cerrado');
    },
  },
  mounted() {
    this.mostrarModal();
  },
};
</script>
