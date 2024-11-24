<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div>
      <h5>Crear Evento</h5>
      <form @submit.prevent="submitFormularioEvento">
        <!-- Nombre del Evento -->
        <div class="mb-3">
          <label for="event_name" class="form-label">Nombre del Evento</label>
          <input
            type="text"
            id="event_name"
            class="form-control"
            v-model="formularioEvento.event_name"
            placeholder="Ingrese el nombre del evento"
          />
          <small class="text-danger">{{ erroresFormularioEvento.event_name }}</small>
        </div>
  
        <!-- Descripción -->
        <div class="mb-3">
          <label for="description" class="form-label">Descripción</label>
          <textarea
            id="description"
            class="form-control"
            v-model="formularioEvento.description"
            placeholder="Ingrese la descripción del evento"
          ></textarea>
          <small class="text-danger">{{ erroresFormularioEvento.description }}</small>
        </div>
  
        <!-- Seleccionar Lugar -->
        <div class="mb-3">
          <label for="location_id" class="form-label">Lugar</label>
          <select
            id="location_id"
            class="form-select"
            v-model.number="formularioEvento.location_id"
          >
            <option value="">Seleccione un Lugar</option>
            <option
              v-for="lugar in lugares"
              :key="lugar.addressId"
              :value="lugar.addressId"
            >
              {{ lugar.city?.cityName }}, {{ lugar.country?.countryName }}, {{ lugar.addressLine }}
            </option>
          </select>
          <small class="text-danger">{{ erroresFormularioEvento.location_id }}</small>
        </div>
  
        <!-- Seleccionar Fecha -->
        <div class="mb-3">
          <label for="event_date" class="form-label">Fecha</label>
          <datepicker
            v-model="formularioEvento.event_date"
            :input-class="'form-control'"
            :format="'yyyy-MM-dd'"
            :monday-first="true"
            :auto-close="true"
            placeholder="Seleccione la fecha del evento"
            :day-class="customDateClass"
          ></datepicker>
          <small class="text-danger">{{ erroresFormularioEvento.event_date }}</small>
        </div>
  
        <!-- Seleccionar Hora -->
        <div class="mb-3">
          <label for="event_time" class="form-label">Hora</label>
          <input
            type="time"
            id="event_time"
            class="form-control"
            v-model="formularioEvento.event_time"
          />
          <small class="text-danger">{{ erroresFormularioEvento.event_time }}</small>
        </div>
  
        <!-- Voluntarios Requeridos (Opcional) -->
        <div class="mb-3">
          <label for="required_volunteers" class="form-label">Voluntarios Requeridos</label>
          <input
            type="number"
            id="required_volunteers"
            class="form-control"
            v-model.number="formularioEvento.required_volunteers"
            placeholder="Ingrese el número de voluntarios requeridos"
            min="1"
          />
        </div>
  
        <!-- Botón de Envío -->
        <button type="submit" class="btn btn-success">Crear Evento</button>
      </form>
    </div>
  </template>
  
  <script>
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  export default {
    name: 'CrearEventoForm',
    components: {
      Datepicker,
    },
    props: {
      lugares: {
        type: Array,
        required: true,
      },
      erroresFormularioEvento: {
        type: Object,
        required: true,
      },
      formularioEvento: {
        type: Object,
        required: true,
      },
      festivosColombia2024: {
        type: Array,
        required: true,
      },
    },
    methods: {
      customDateClass(date) {
        return this.festivosColombia2024.some(
          festivo => festivo.toDateString() === date.toDateString()
        )
          ? 'festivo'
          : '';
      },
      submitFormularioEvento() {
        this.$emit('submitFormularioEvento');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  .festivo .datepicker-cell-button {
    background-color: #ffcccc;
  }
  </style>