<template>
    <div class="wrapper">
      <!-- Header Wrapper con Imagen de Fondo -->
      <div class="header-wrapper">
        <!-- Navbar -->
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
                  <router-link class="btn btn-outline-success border-end-0 rounded-end-0" to="#">
                    <i class="bi bi-house-door me-1"></i>
                    Portal público
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="btn btn-outline-success border-start-0 border-end-0 rounded-0" to="#" target="_blank">
                    <i class="bi bi-eye me-1"></i>
                    Seguimiento
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="btn btn-outline-success border-start-0 border-end-0 rounded-0" to="#" target="_blank">
                    <i class="bi bi-map me-1"></i>
                    Mapas
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="btn btn-outline-success border-start-0 rounded-start-0" to="#" target="_blank">
                    <i class="bi bi-book me-1"></i>
                    Educación
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="btn btn-success ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center text-white" to="/login">
                    <i class="bi bi-box-arrow-in-right me-1"></i>
                    Iniciar sesión
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
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
      </div>
  
      <!-- Contenido Principal -->
      <div class="container my-5">
        <div class="row">
          <!-- Sidebar -->
          <aside class="col-md-3">
            <div class="card iq-document-card sticky-xl-top">
                <div class="card-header bg-primary text-white">
                <h6 class="mb-0">En esta página</h6>
                </div>
                <div class="card-body">
                <nav class="small" id="elements-section">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <button
                        class="btn btn-link p-0 d-inline-flex align-items-center"
                        data-bs-toggle="collapse"
                        data-bs-target="#conocenosCollapse"
                        aria-expanded="false"
                        aria-controls="conocenosCollapse"
                        >
                        <i class="bi bi-caret-right-fill me-1"></i>
                        Conócenos
                        </button>
                        <ul class="list-unstyled ps-3 collapse" id="conocenosCollapse">
                        <li><a class="nav-link ps-3" href="#sobre-nosotros">Sobre nosotros</a></li>
                        <li><a class="nav-link ps-3" href="#mision">Misión</a></li>
                        <li><a class="nav-link ps-3" href="#vision">Visión</a></li>
                        </ul>
                    </li>
                    <li class="list-group-item">
                        <button
                        class="btn btn-link p-0 d-inline-flex align-items-center"
                        data-bs-toggle="collapse"
                        data-bs-target="#portalUsuariosCollapse"
                        aria-expanded="false"
                        aria-controls="portalUsuariosCollapse"
                        >
                        <i class="bi bi-caret-right-fill me-1"></i>
                        Portal usuarios
                        </button>
                        <ul class="list-unstyled ps-3 collapse" id="portalUsuariosCollapse">
                        <li><a class="nav-link ps-3" href="#iniciar-sesion">Iniciar sesión</a></li>
                        <li><a class="nav-link ps-3" href="#registrarse">Registrarse</a></li>
                        <li><a class="nav-link ps-3" href="#contactanos">Contáctanos</a></li>
                        </ul>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>
            </aside>  
          <!-- Sección de Contenido -->
          <div class="col-md-9">
            <div class="bd-cheatsheet container-fluid bg-transparent">
                <section id="components">
                <article id="accordion">
                    <div class="card iq-document-card iq-doc-head border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-center text-color-project">
                        <h4>Conócenos</h4>
                        </div>
                        <hr />
                        <div class="tab-content">
                        <div class="tab-pane bd-heading-1 fade show active" id="content-accordion-prv" role="tabpanel">
                            <div class="bd-example">
                            <div class="accordion" id="accordionExample">
                                <!-- Sobre nosotros -->
                                <div class="accordion-item">
                                <h5 class="accordion-header" id="headingOne">
                                    <button
                                    class="accordion-button bg-color-project text-white text-color-project"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                    >
                                    Sobre nosotros
                                    </button>
                                </h5>
                                <div
                                    id="collapseOne"
                                    class="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                    EcoVolunteer es una plataforma dedicada a conectar empresas y personas con iniciativas de reciclaje en Bogotá. A través de nuestro servicio, facilitamos el registro de voluntarios, la gestión de campañas de reciclaje y la geolocalización de puntos de recolección de materiales reciclables. Nuestro objetivo es crear un impacto positivo en el medio ambiente, promoviendo el reciclaje como una responsabilidad compartida entre la ciudadanía y las organizaciones.
                                    </div>
                                </div>
                                </div>
                                <!-- Misión -->
                                <div class="accordion-item">
                                <h5 class="accordion-header" id="headingTwo">
                                    <button
                                    class="accordion-button collapsed bg-color-project text-white text-color-project"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                    >
                                    Misión
                                    </button>
                                </h5>
                                <div
                                    id="collapseTwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                    Nuestra misión es fomentar una cultura de reciclaje y conciencia ambiental mediante la participación activa de empresas y ciudadanos en actividades de voluntariado. A través de una plataforma innovadora, facilitamos el acceso a puntos de reciclaje y ofrecemos herramientas para que los usuarios contribuyan de manera efectiva a la reducción de residuos y la conservación del entorno natural.
                                    </div>
                                </div>
                                </div>
                                <!-- Visión -->
                                <div class="accordion-item">
                                <h5 class="accordion-header" id="headingThree">
                                    <button
                                    class="accordion-button collapsed bg-color-project text-white text-color-project"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                    >
                                    Visión
                                    </button>
                                </h5>
                                <div
                                    id="collapseThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div class="accordion-body">
                                    Ser el principal referente en Bogotá en la movilización de voluntarios y empresas para el reciclaje, creando una red sólida que promueva el desarrollo de una ciudad más limpia y consciente de la importancia del manejo adecuado de residuos. Aspiramos a expandir nuestro modelo a otras ciudades y convertirnos en una plataforma clave en la transformación hacia una sociedad sostenible.
                                    </div>
                                </div>
                                </div>
                                <!-- Puedes agregar más secciones aquí si es necesario -->
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> <!-- Cierre de card-body -->
                    </div>
                </article>
                </section>
            </div>
            </div>
        </div>
      </div>
  
      <!-- Footer -->
      <footer class="footer bg-light py-3">
        <div class="container d-flex justify-content-between">
          <ul class="list-inline mb-0">
            <li class="list-inline-item"><a href="#">Políticas de privacidad</a></li>
            <li class="list-inline-item"><a href="#">Términos de uso</a></li>
          </ul>
          <div>
            ©{{ currentYear }} Ecovolunteer, Hecho por Ecovolunteer.
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import logo from '@/assets/images/icono-ecovolunteer_48x48.png';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    data() {
      return {
        logoSrc: logo,
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  .header-wrapper {
    background: url('../assets/images/DeWatermark.png') no-repeat center center;
    background-size: cover;
    position: relative;
  }
  </style>
  