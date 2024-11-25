<!-- src/components/FilterBar.vue -->
<template>
  <div class="filter-panel bg-light shadow-lg p-4">
    <button 
      class="btn-close float-end" 
      aria-label="Cerrar filtros" 
      @click="$emit('close')"
    ></button>
    <h5>Filtrar Eventos</h5>
    <!-- Dropdowns de Filtros -->
    <div class="mb-3">
      <select class="form-select" v-model="country" @change="loadDepartments" aria-label="Seleccionar país">
        <option value="">País</option>
        <option v-for="pais in paises" :key="pais.countryId" :value="pais.countryId">
          {{ pais.countryName }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <select class="form-select" v-model="department" @change="loadCities" :disabled="!departamentos.length" aria-label="Seleccionar departamento">
        <option value="">Departamento</option>
        <option v-for="departamento in departamentos" :key="departamento.departmentId" :value="departamento.departmentId">
          {{ departamento.departmentName }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <select class="form-select" v-model="city" @change="loadLocalities" :disabled="!ciudades.length" aria-label="Seleccionar ciudad">
        <option value="">Ciudad</option>
        <option v-for="ciudad in ciudades" :key="ciudad.cityId" :value="ciudad.cityId">
          {{ ciudad.cityName }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <select class="form-select" v-model="locality" @change="loadNeighborhoods" :disabled="!localidades.length" aria-label="Seleccionar localidad">
        <option value="">Localidad</option>
        <option v-for="localidad in localidades" :key="localidad.localityId" :value="localidad.localityId">
          {{ localidad.localityName }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <select class="form-select" v-model="neighborhood" :disabled="!barrios.length" aria-label="Seleccionar barrio">
        <option value="">Barrio</option>
        <option v-for="barrio in barrios" :key="barrio.neighborhoodId" :value="barrio.neighborhoodId">
          {{ barrio.neighborhoodName }}
        </option>
      </select>
    </div>
    <!-- Botones -->
    <div class="d-flex justify-content-between">
      <button class="btn btn-primary" @click="applyFilters">Aplicar</button>
      <button class="btn btn-secondary" @click="clearFilters">Limpiar</button>
      <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    paises: {
      type: Array,
      default: () => [],
    },
    departamentos: {
      type: Array,
      default: () => [],
    },
    ciudades: {
      type: Array,
      default: () => [],
    },
    localidades: {
      type: Array,
      default: () => [],
    },
    barrios: {
      type: Array,
      default: () => [],
    },
    selectedCountry: [String, Number],
    selectedDepartment: [String, Number],
    selectedCity: [String, Number],
    selectedLocality: [String, Number],
    selectedNeighborhood: [String, Number],
  },
  emits: [
    'update:selectedCountry',
    'update:selectedDepartment',
    'update:selectedCity',
    'update:selectedLocality',
    'update:selectedNeighborhood',
    'loadDepartments',
    'loadCities',
    'loadLocalities',
    'loadNeighborhoods',
    'applyFilters',
    'clearFilters',
    'close',
  ],
  computed: {
    country: {
      get() {
        return this.selectedCountry;
      },
      set(value) {
        this.$emit('update:selectedCountry', value);
      },
    },
    department: {
      get() {
        return this.selectedDepartment;
      },
      set(value) {
        this.$emit('update:selectedDepartment', value);
      },
    },
    city: {
      get() {
        return this.selectedCity;
      },
      set(value) {
        this.$emit('update:selectedCity', value);
      },
    },
    locality: {
      get() {
        return this.selectedLocality;
      },
      set(value) {
        this.$emit('update:selectedLocality', value);
      },
    },
    neighborhood: {
      get() {
        return this.selectedNeighborhood;
      },
      set(value) {
        this.$emit('update:selectedNeighborhood', value);
      },
    },
  },
  methods: {
    loadDepartments() {
      this.$emit('loadDepartments');
    },
    loadCities() {
      this.$emit('loadCities');
    },
    loadLocalities() {
      this.$emit('loadLocalities');
    },
    loadNeighborhoods() {
      this.$emit('loadNeighborhoods');
    },
    applyFilters() {
      this.$emit('applyFilters');
    },
    clearFilters() {
      this.$emit('clearFilters');
    },
  },
};
</script>

<style scoped>
/* Estilos para el panel de filtros */
.filter-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 350px;
  z-index: 1050;
  overflow-y: auto;
  background-color: #f8f9fa;
}
</style>
