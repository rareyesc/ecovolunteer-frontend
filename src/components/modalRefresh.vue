<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h2>Refrescar sesión</h2>
      <p>Tu sesión está a punto de expirar. ¿Deseas extender la sesión?</p>
      <div class="modal-actions">
        <button @click="onRefresh">Extender sesión</button>
        <a href="/logout" class="logout-button">Cerrar sesión</a>
      </div>
    </div>
  </div>
</template>

<script>
import { refreshToken, getToken } from '@/services/api';

export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    async onRefresh() {
      try {
        await refreshToken(); // Llama a la función centralizada de refresh
        this.isVisible = false; // Cierra el modal tras refrescar el token
      } catch (error) {
        console.error('Error al extender la sesión:', error);
        window.location.href = '/logout'; // Redirige al logout si ocurre un error
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
    checkTokenExpiration() {
      const token = getToken();
      if (token && this.isTokenExpired(token)) {
        this.isVisible = true; // Muestra el modal si el token está próximo a expirar
      }
    },
  },
  mounted() {
    // Revisa la expiración del token cada minuto
    this.checkTokenExpiration(); // Primera validación
    setInterval(this.checkTokenExpiration, 60000); // Validación recurrente
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.modal-actions {
  display: flex;
  justify-content: space-around;
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
button:first-child {
  background-color: #4caf50;
  color: white;
}
.logout-button {
  background-color: #f44336;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
}
</style>
