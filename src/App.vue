<template>
  <div id="app">
    <router-view />
    <modal-refresh v-if="showModalRefresh" />
  </div>
</template>

<script>
import ModalRefresh from '@/components/modalRefresh.vue';

export default {
  name: 'App',
  components: {
    ModalRefresh,
  },
  data() {
    return {
      showModalRefresh: false,
    };
  },
  watch: {
    // Detecta cambios en la ruta
    $route(to) {
      this.checkIfModalShouldBeVisible(to);
    },
  },
  mounted() {
    this.checkIfModalShouldBeVisible(this.$route); // Verifica en el montaje inicial
  },
  methods: {
    checkIfModalShouldBeVisible(route) {
      // Muestra el modal solo si la ruta actual requiere autenticación
      this.showModalRefresh = route.matched.some(record => record.meta.requiresAuth);
    },
  },
};
</script>

<style>
/* Estilos globales, si es necesario */
</style>
