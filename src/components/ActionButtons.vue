<template>
    <div class="row">
      <div class="col-md-6 mb-3">
        <button class="btn btn-warning w-100" @click="$emit('mostrarFormulario', 'lugar')">
          <i class="bi bi-geo-alt me-2"></i> Agregar Lugar
        </button>
      </div>
      <div class="col-md-6 mb-3">
        <button class="btn btn-purple w-100" @click="$emit('mostrarFormulario', 'evento')">
          <i class="bi bi-calendar-plus me-2"></i> Crear Evento
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ActionButtons',
  };
  </script>