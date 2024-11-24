<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="filter-bar mb-4">
      <h5>Filtrar Lugares</h5>
      <div class="row">
        <!-- País -->
        <div class="col-md-2 mb-3">
          <label for="filtroPais" class="form-label">País</label>
          <select
            id="filtroPais"
            class="form-select"
            v-model.number="filtros.pais"
            @change="$emit('cargarDepartamentos')"
          >
            <option value="">Todos los Países</option>
            <option v-for="pais in paises" :key="pais.countryId" :value="pais.countryId">
              {{ pais.countryName }}
            </option>
          </select>
        </div>
        <!-- Departamento -->
        <div class="col-md-2 mb-3">
          <label for="filtroDepartamento" class="form-label">Departamento</label>
          <select
            id="filtroDepartamento"
            class="form-select"
            v-model.number="filtros.departamento"
            :disabled="!departamentos.length"
            @change="$emit('cargarCiudades')"
          >
            <option value="">Todos los Departamentos</option>
            <option
              v-for="departamento in departamentos"
              :key="departamento.departmentId"
              :value="departamento.departmentId"
            >
              {{ departamento.departmentName }}
            </option>
          </select>
        </div>
        <!-- Ciudad -->
        <div class="col-md-2 mb-3">
          <label for="filtroCiudad" class="form-label">Ciudad</label>
          <select
            id="filtroCiudad"
            class="form-select"
            v-model.number="filtros.ciudad"
            :disabled="!ciudades.length"
            @change="$emit('cargarLocalidades')"
          >
            <option value="">Todas las Ciudades</option>
            <option
              v-for="ciudad in ciudades"
              :key="ciudad.cityId"
              :value="ciudad.cityId"
            >
              {{ ciudad.cityName }}
            </option>
          </select>
        </div>
        <!-- Localidad -->
        <div class="col-md-2 mb-3">
          <label for="filtroLocalidad" class="form-label">Localidad</label>
          <select
            id="filtroLocalidad"
            class="form-select"
            v-model.number="filtros.localidad"
            :disabled="!localidades.length"
            @change="$emit('cargarBarrios')"
          >
            <option value="">Todas las Localidades</option>
            <option
              v-for="localidad in localidades"
              :key="localidad.localityId"
              :value="localidad.localityId"
            >
              {{ localidad.localityName }}
            </option>
          </select>
        </div>
        <!-- Barrio -->
        <div class="col-md-2 mb-3">
          <label for="filtroBarrio" class="form-label">Barrio</label>
          <select
            id="filtroBarrio"
            class="form-select"
            v-model.number="filtros.barrio"
            :disabled="!barrios.length"
          >
            <option value="">Todos los Barrios</option>
            <option
              v-for="barrio in barrios"
              :key="barrio.neighborhoodId"
              :value="barrio.neighborhoodId"
            >
              {{ barrio.neighborhoodName }}
            </option>
          </select>
        </div>
        <!-- Botones -->
        <div class="col-md-1 mb-3 d-flex align-items-end">
          <button class="btn btn-primary w-100" @click="$emit('aplicarFiltros')">
            Filtrar
          </button>
        </div>
        <div class="col-md-1 mb-3 d-flex align-items-end">
          <button class="btn btn-secondary w-100" @click="$emit('limpiarFiltros')">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterBar',
    props: {
      paises: Array,
      departamentos: Array,
      ciudades: Array,
      localidades: Array,
      barrios: Array,
      filtros: Object,
    },
  };
  </script>