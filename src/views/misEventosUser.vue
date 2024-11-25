<!-- src/views/MisEventosUser.vue -->
<template>
  <UserLayout titulo="Mis Eventos" descripcion="Gestiona tus eventos aquí">
    <!-- Contenido específico de MisEventosUser -->
    <div>
      <h2>Mis Eventos</h2>
      <!-- Agrega aquí la lógica y el diseño de tus eventos -->
    </div>
  </UserLayout>
</template>

<script>
import UserLayout from '@/layouts/UserLayout.vue';

export default {
  name: 'MisEventosUser',
  components: {
    UserLayout,
  },
  data() {
    return {
      // Aquí puedes definir las propiedades de datos necesarias
    };
  },
  methods: {
    // Aquí puedes definir los métodos necesarios
  },
  mounted() {
    // Realiza aquí las acciones necesarias al montar el componente
  },
};
</script>

<style scoped>
/* Incluye aquí los estilos específicos de MisEventosUser.vue */
</style>
