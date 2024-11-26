<template>
    <!-- Header -->
    <div class="header d-flex align-items-center">
      <div class="container text-center">
        <h1 class="my-4 text-black texto-grande">
          <span>Ecovolunteer</span>
        </h1>
        <h4 class="mb-5 text-black"><b>Recicla hoy, transforma el mañana.</b></h4>
        <div class="d-flex justify-content-center align-items-center">
          <router-link class="btn btn-light me-3 d-flex align-items-center" target="_blank" to="#">
            <i class="bi bi-house-door me-1"></i>
            <span class="text-black">Portal público</span>
          </router-link>
          <router-link class="btn btn-light d-flex align-items-center" target="_blank" to="#">
            <i class="bi bi-chat-dots me-1"></i>
            <span class="text-black">Foro / Seguimiento</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderSection',
  };
  </script>
  