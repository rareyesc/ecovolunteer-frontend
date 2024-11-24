<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div>
      <h5>Agregar Lugar</h5>
      <form @submit.prevent="submitFormularioLugar">
        <!-- País -->
        <div class="mb-3">
          <label for="pais" class="form-label">País</label>
          <select
            id="pais"
            class="form-control"
            v-model="formularioLugar.pais"
            @change="cargarDepartamentos"
          >
            <option value="">Seleccione un País</option>
            <option v-for="pais in paises" :key="pais.countryId" :value="pais.countryId">
              {{ pais.countryName }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormulario.pais }}</small>
        </div>
        <!-- Departamento -->
        <div class="mb-3">
          <label for="departamento" class="form-label">Departamento</label>
          <select
            id="departamento"
            class="form-select"
            v-model="formularioLugar.departamento"
            @change="cargarCiudades"
          >
            <option value="">Seleccione un Departamento</option>
            <option
              v-for="departamento in departamentos"
              :key="departamento.departmentId"
              :value="departamento.departmentId"
            >
              {{ departamento.departmentName }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormulario.departamento }}</small>
        </div>
        <!-- Ciudad -->
        <div class="mb-3">
          <label for="ciudad" class="form-label">Ciudad</label>
          <select
            id="ciudad"
            class="form-select"
            v-model="formularioLugar.ciudad"
            @change="cargarLocalidades"
          >
            <option value="">Seleccione una Ciudad</option>
            <option
              v-for="ciudad in ciudades"
              :key="ciudad.cityId"
              :value="ciudad.cityId"
            >
              {{ ciudad.cityName }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormulario.ciudad }}</small>
        </div>
        <!-- Localidad -->
        <div class="mb-3">
          <label for="localidad" class="form-label">Localidad</label>
          <select
            id="localidad"
            class="form-select"
            v-model="formularioLugar.localidad"
            @change="cargarBarrios"
          >
            <option value="">Seleccione una Localidad</option>
            <option
              v-for="localidad in localidades"
              :key="localidad.localityId"
              :value="localidad.localityId"
            >
              {{ localidad.localityName }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormulario.localidad }}</small>
        </div>
        <!-- Barrio -->
        <div class="mb-3">
          <label for="barrio" class="form-label">Barrio</label>
          <select
            id="barrio"
            class="form-select"
            v-model="formularioLugar.barrio"
          >
            <option value="">Seleccione un Barrio</option>
            <option
              v-for="barrio in barrios"
              :key="barrio.neighborhoodId"
              :value="barrio.neighborhoodId"
            >
              {{ barrio.neighborhoodName }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormulario.barrio }}</small>
        </div>
        <!-- Dirección -->
        <div class="mb-3">
          <label for="direccion" class="form-label">Dirección</label>
          <input
            type="text"
            id="direccion"
            class="form-control"
            v-model="formularioLugar.direccion"
            placeholder="Ingrese la dirección"
          />
          <small class="text-danger">{{ erroresFormulario.direccion }}</small>
        </div>
        <!-- Imagen -->
        <div class="mb-3">
          <label for="imagen" class="form-label">Imagen del Lugar</label>
          <input
            type="file"
            id="imagen"
            class="form-control"
            @change="procesarImagen"
          />
        </div>
        <!-- Botón de Envío -->
        <button type="submit" class="btn btn-success">Guardar Lugar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AgregarLugarForm',
    props: {
      paises: Array,
      departamentos: Array,
      ciudades: Array,
      localidades: Array,
      barrios: Array,
      erroresFormulario: Object,
      formularioLugar: Object,
    },
    methods: {
      cargarDepartamentos() {
        this.$emit('cargarDepartamentos');
      },
      cargarCiudades() {
        this.$emit('cargarCiudades');
      },
      cargarLocalidades() {
        this.$emit('cargarLocalidades');
      },
      cargarBarrios() {
        this.$emit('cargarBarrios');
      },
      procesarImagen(event) {
        this.$emit('procesarImagen', event);
      },
      submitFormularioLugar() {
        this.$emit('submitFormularioLugar');
      },
    },
  };
  </script>