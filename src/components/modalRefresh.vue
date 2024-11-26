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
        <div class="modal-header k">
          <h5 class="modal-title" id="modalLabel">Refrescar sesión</h5>
        </div>
        <div class="modal-body">
          <p>Tu sesión está a punto de expirar. ¿Deseas extender la sesión?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="onRefresh">
            Extender sesión
          </button>
          <a href="/logout" class="btn btn-secondary">Cerrar sesión</a>
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
      refreshThreshold: 60, // Tiempo en segundos antes de la expiración para mostrar el modal
      refreshInterval: null, // Referencia al intervalo
      modalShown: false, // Para evitar múltiples llamadas al mostrar el modal
    };
  },
  methods: {
    async onRefresh() {
      try {
        await refreshToken();
        this.cerrarModal();
        // Después de refrescar el token, reiniciar el intervalo
        this.resetRefreshInterval();
      } catch (error) {
        console.error('Error al extender la sesión:', error);
        window.location.href = '/logout';
      }
    },
    isTokenExpiringSoon(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp - currentTime < this.refreshThreshold;
      } catch {
        return true;
      }
    },
    calcularTiempoRestante(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp - currentTime;
      } catch {
        return 0;
      }
    },
    async checkTokenExpiration() {
      const token = getToken();
      if (token) {
        const tiempoRestante = this.calcularTiempoRestante(token);
        if (tiempoRestante < this.refreshThreshold && tiempoRestante > 0) {
          this.mostrarModal();
        } else if (tiempoRestante <= 0) {
          // Token ya expiró
          window.location.href = '/logout';
        }
      }
    },
    mostrarModal() {
      if (!this.modalInstance) {
        this.modalInstance = new window.bootstrap.Modal(this.$refs.modal, {
          backdrop: 'static',
          keyboard: false,
        });
      }
      if (!this.modalShown) {
        this.modalInstance.show();
        this.modalShown = true;
      }
    },
    cerrarModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
        this.modalShown = false;
      }
    },
    startRefreshInterval() {
      // Iniciar la verificación cada 30 segundos
      this.refreshInterval = setInterval(this.checkTokenExpiration, 30000); // 30,000 ms = 30 segundos
    },
    resetRefreshInterval() {
      // Reiniciar el intervalo después de refrescar el token
      clearInterval(this.refreshInterval);
      this.startRefreshInterval();
    },
    stopRefreshInterval() {
      // Detener el intervalo cuando el componente se destruye
      clearInterval(this.refreshInterval);
    },
  },
  mounted() {
    // Verificar inmediatamente al montar el componente
    this.checkTokenExpiration();
    // Iniciar la verificación periódica
    this.startRefreshInterval();
  },
  beforeUnmount() {
    // Limpiar el intervalo al destruir el componente
    this.stopRefreshInterval();
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si lo deseas */
</style>
