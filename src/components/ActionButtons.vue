<template>
    <div class="row">
      <div class="col-md-5 mb-3">
        <button class="btn btn-warning w-100" @click="$emit('mostrarFormulario', 'lugar')">
          <i class="bi bi-geo-alt me-2"></i> Agregar Lugar
        </button>
      </div>
      <div class="col-md-6 mb-3">
        <button class="btn btn-purple w-100" @click="$emit('mostrarFormulario', 'evento')">
          <i class="bi bi-calendar-plus me-2"></i> Crear Evento
        </button>
      </div>
      <button class="btn btn-light col-md-1 mb-3" @click="onMostrarFiltro">
        <i class="fas fa-filter"></i>
      </button>
    </div>

  </template>
  
  <script>
  export default {
    name: 'ActionButtons',
    emits: ['mostrarFormulario', 'mostrarFiltro'], // Declarar los eventos aquí
    methods: {
      onMostrarFormulario(formulario) {
        this.$emit('mostrarFormulario', formulario);
      },
      onMostrarFiltro() {
        this.$emit('mostrarFiltro');
      },
    },
  };
  </script>