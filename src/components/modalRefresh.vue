<template>
  <div
    class="modal fade"
    tabindex="-1"
    :id="modalId"
    ref="modal"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-warning text-dark">
          <h5 class="modal-title" id="modalLabel">Refrescar sesión</h5>
        </div>
        <div class="modal-body">
          <p>Tu sesión está a punto de expirar. ¿Deseas extender la sesión?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="onRefresh">
            Extender sesión
          </button>
          <a href="/logout" class="btn btn-danger">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { refreshToken, getToken } from '@/services/api';

export default {
  name: 'ModalRefresh',
  data() {
    return {
      modalInstance: null,
      modalId: 'modal-refresh',
    };
  },
  methods: {
    async onRefresh() {
      try {
        await refreshToken();
        this.cerrarModal();
      } catch (error) {
        console.error('Error al extender la sesión:', error);
        window.location.href = '/logout';
      }
    },
    isTokenExpired(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Math.floor(Date.now() / 1000);
      } catch {
        return true;
      }
    },
    async checkTokenExpiration() {
      const token = getToken();
      if (token && this.isTokenExpired(token)) {
        this.mostrarModal();
      }
    },
    mostrarModal() {
      if (!this.modalInstance) {
        this.modalInstance = new window.bootstrap.Modal(this.$refs.modal, {
          backdrop: 'static',
          keyboard: false,
        });
      }
      this.modalInstance.show();
    },
    cerrarModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
  },
  mounted() {
    // Revisa la expiración del token cada minuto
    this.checkTokenExpiration();
    setInterval(this.checkTokenExpiration, 60000);
  },
};
</script>
