<!-- Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent navbar-custom">
    <div class="container-fluid">
      <!-- Logo -->
        <div class="logo-main me-2">
          <div class="logo-normal">
            <img
              class="img-icon"
              :src="logoSrc"
              alt="Ecovolunteer Logo"
            />
          </div>
        </div>
        <h5 class="logo-title mb-0">Ecovolunteer</h5>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto align-items-start">
          <li class="nav-item">
            <router-link class="btn btn-outline-success border-end-0 rounded-end-0 nav-button" to="#">
              <i class="bi bi-house-door me-1"></i>
              Portal público
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-success border-start-0 border-end-0 rounded-0 nav-button" to="#" target="_blank">
              <i class="bi bi-eye me-1"></i>
              Seguimiento
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-success border-start-0 border-end-0 rounded-0 nav-button" to="#" target="_blank">
              <i class="bi bi-map me-1"></i>
              Mapas
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-success border-start-0 rounded-start-0 nav-button" to="#" target="_blank">
              <i class="bi bi-book me-1"></i>
              Educación
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-success ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center text-white nav-button" to="/login">
              <i class="bi bi-box-arrow-in-right me-1"></i>
              Iniciar sesión
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/images/icono-ecovolunteer_48x48.png';

export default {
  name: 'HomeNavbar',
  data() {
    return {
      logoSrc: logo,
    };
  },
};
</script>