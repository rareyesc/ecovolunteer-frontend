<template>
  <div class="mt-2">
    <h3>Últimos Lugares Agregados</h3>
    <div class="row">
      <div
        class="col-md-6 mb-4 w-30 mt-2"
        v-for="address in lugares"
        :key="address.addressId"
      >
        <div class="card h-100 text-center justify-content-center">
          <!-- Botón de Eliminar -->
          <button
            class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
            @click="$emit('eliminarLugar', address.addressId)"
            aria-label="Eliminar Lugar"
          >
            &times;
          </button>
          <img
            :src="getImageUrl(address.imageUrl)"
            class="img-place card-img-top rounded mx-auto d-block mt-4"
            alt="Imagen del Lugar"
          />
          <div class="card-body">
            <hr />
            <h5 class="card-title">
              {{ address.city?.cityName }}, {{ address.country?.countryName }}
            </h5>
            <p class="card-text">
              <strong>Departamento:</strong> {{ address.department?.departmentName }}<br />
              <strong>Localidad:</strong> {{ address.locality?.localityName }}<br />
              <strong>Barrio:</strong> {{ address.neighborhood?.neighborhoodName }}<br />
              <strong>Dirección:</strong> {{ address.addressLine }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LugaresList',
  props: {
    lugares: Array,
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://localhost:8090${imagePath}`;
    },
  },
};
</script>