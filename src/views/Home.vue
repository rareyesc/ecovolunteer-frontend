<template>
    <div class="wrapper">
    <span class="uisheet screen-darken"></span>

    <!-- Body Inicial -->
    <div class="header" style="background: url('../assets/images/DeWatermark.png'); background-size: cover; background-repeat: no-repeat; height: 100vh;position: relative;">
        <div class="main-img">
            <div class="container">
                <svg class="icon-150"  width="150" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="-0.423828" y="34.5762" width="50" height="7.14286" rx="3.57143" transform="rotate(-45 -0.423828 34.5762)" fill="white"/>
                    <rect x="14.7295" y="49.7266" width="50" height="7.14286" rx="3.57143" transform="rotate(-45 14.7295 49.7266)" fill="white"/>
                    <rect x="19.7432" y="29.4902" width="28.5714" height="7.14286" rx="3.57143" transform="rotate(45 19.7432 29.4902)" fill="white"/>
                    <rect x="19.7783" y="-0.779297" width="50" height="7.14286" rx="3.57143" transform="rotate(45 19.7783 -0.779297)" fill="white"/>
                </svg>
                <h1 class="my-4 text-black">
                    <span>Ecovolunteer</span>
                </h1>
                <h4 class="mb-5 text-black"> <b>Recicla hoy, transforma el mañana.</b> </h4>
                <div class="d-flex justify-content-center align-items-center">
                    <div>
                        <router-link class="bg-white btn btn-light d-flex" target="_blank" :to="'#'">
                            <svg  width="22"  class="me-1 icon-22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span class="mx-2 text-black ">Portal publico</span>
                        </router-link>
                    </div>
                    <div class="ms-3">
                        <router-link class="bg-white btn btn-light d-flex" target="_blank" :to="'#'">
                            <span class="material-symbols-outlined"  width="24px" height="24px"></span>
                            <span class="mx-2 text-black ">Foro / Seguimiento</span>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
        
<!-- End Body Inicial -->
<!-- header -->

        <div class="container">
            <nav class="rounded nav navbar navbar-expand-lg navbar-light top-1">
                <div class="container-fluid">
                    <router-link class="mx-2 navbar-brand" :to="'#'">
                        <!--Logo start-->
                        <!--logo End-->
                        
                        <!--Logo start-->
                        <div class="logo-main">
                            <div class="logo-normal">
                                <svg class="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                                    <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                                    <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                                    <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="logo-mini">
                                <svg class="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                                    <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                                    <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                                    <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                        <!--logo End-->
                        
                        <h5 class="logo-title">Ecovolunteer</h5>
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-2" aria-controls="navbar-2" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar-2">
                        <ul class="mb-2 navbar-nav ms-auto mb-lg-0 d-flex align-items-start">
                            <li class="nav-item">
                                <router-link class="nav-link" aria-current="page" :to="'#'" target="_blank">Portal publico</router-link>
                            </li>
                            <li class="nav-item me-3">
                                <router-link class="nav-link" aria-current="page" :to="'#'" target="_blank">Seguimiento</router-link>
                            </li>
                            <li class="nav-item me-3">
                                <router-link class="nav-link" aria-current="page" :to="'#'" target="_blank">Mapas</router-link>
                            </li>
                            <li class="nav-item me-3">
                                <router-link class="nav-link" aria-current="page" :to="'#'" target="_blank">Educación</router-link>
                            </li>
                  
                            <li class="nav-item">
                                <router-link class="btn btn-success" aria-current="page" :to="'/login'">
                                    <svg class="icon-22 me-2" width="22"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z" fill="currentColor"></path>
                                        <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M3.01049 16.8079C2.81849 16.8079 2.62649 16.7349 2.48049 16.5879C2.18749 16.2949 2.18749 15.8209 2.48049 15.5279L3.84549 14.1619C4.13849 13.8699 4.61349 13.8699 4.90649 14.1619C5.19849 14.4549 5.19849 14.9299 4.90649 15.2229L3.54049 16.5879C3.39449 16.7349 3.20249 16.8079 3.01049 16.8079ZM6.77169 18.0003C6.57969 18.0003 6.38769 17.9273 6.24169 17.7803C5.94869 17.4873 5.94869 17.0133 6.24169 16.7203L7.60669 15.3543C7.89969 15.0623 8.37469 15.0623 8.66769 15.3543C8.95969 15.6473 8.95969 16.1223 8.66769 16.4153L7.30169 17.7803C7.15569 17.9273 6.96369 18.0003 6.77169 18.0003ZM7.02539 21.5683C7.17139 21.7153 7.36339 21.7883 7.55539 21.7883C7.74739 21.7883 7.93939 21.7153 8.08539 21.5683L9.45139 20.2033C9.74339 19.9103 9.74339 19.4353 9.45139 19.1423C9.15839 18.8503 8.68339 18.8503 8.39039 19.1423L7.02539 20.5083C6.73239 20.8013 6.73239 21.2753 7.02539 21.5683Z" fill="currentColor"></path>
                                    </svg> 
                                    Iniciar sesión
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
<!-- End header -->

    <div class="container body-class-1">
        <aside class="mb-5 mobile-offcanvas bd-aside card iq-document-card sticky-xl-top text-muted align-self-start" id="left-side-bar">
            <div class="p-0 offcanvas-header">  
                <button class="btn-close float-end"></button>
            </div>
            <h2 class="pb-2 h6 border-bottom">En esta pagina</h2>
            <nav class="small" id="elements-section">
                <ul class="mb-0 list-unstyled">
                    <li class="mt-2">
                        <button class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#components-collapse" aria-controls="components-collapse">
                            <i class="right-icon me-2">
                                <svg class="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </i>
                            Conócenos
                        </button>
                        <ul class="list-unstyled ps-3 collapse" id="components-collapse">
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Sobre nosotros</a></li>
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Misión</a></li>
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Visión</a></li>
                         
                        </ul>
                    </li>
                    <li class="mt-2">
                        <button class="btn d-inline-flex align-items-center collapsed" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#components-collapse-1" aria-controls="components-collapse">
                            <i class="right-icon me-2">
                                <svg class="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </i>
                            Portal usuarios
                        </button>
                        <ul class="list-unstyled ps-3 collapse" id="components-collapse-1">
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Iniciar sesión</a></li>
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Registrarse</a></li>
                            <li><a class="rounded nav-link d-inline-flex align-items-center" href="#accordion">Contactanos</a></li>
                         
                        </ul>
                    </li>
                                      
                </ul>
            </nav>
        </aside>
        <div class="bd-cheatsheet container-fluid bg-trasprent">
            <section id="components">
             
                  <article id="accordion">


                      <div class="card iq-document-card iq-doc-head">
                          <div class="d-flex justify-content-center">
                              <h4>Conócenos</h4>
                          </div>
                          <hr>
                          <div class="tab-content">
                              <div class="tab-pane bd-heading-1 fade show active" id="content-accordion-prv"
                                  role="tabpanel">
                                  <div class="bd-example">
                                      <div class="accordion" id="accordionExample">
                                          <div class="accordion-item">
                                              <h5 class="accordion-header" id="headingOne">
                                                  <button class="accordion-button" type="button"
                                                      data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                      aria-expanded="true" aria-controls="collapseOne">
                                                      Sobre nosotros
                                                  </button>
                                              </h5>
                                              <div id="collapseOne" class="accordion-collapse collapse show"
                                                  aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                  <div class="accordion-body">


                                                      EcoVolunteer es una plataforma dedicada a conectar empresas y
                                                      personas con iniciativas de reciclaje en Bogotá. A través de
                                                      nuestro servicio, facilitamos el registro de voluntarios, la
                                                      gestión de campañas de reciclaje y la geolocalización de puntos
                                                      de recolección de materiales reciclables. Nuestro objetivo es
                                                      crear un impacto positivo en el medio ambiente, promoviendo el
                                                      reciclaje como una responsabilidad compartida entre la
                                                      ciudadanía y las organizaciones.

                                                  </div>
                                              </div>
                                          </div>
                                          <div class="accordion-item">
                                              <h5 class="accordion-header" id="headingTwo">
                                                  <button class="accordion-button collapsed" type="button"
                                                      data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                      aria-expanded="false" aria-controls="collapseTwo">
                                                      Misión
                                                  </button>
                                              </h5>
                                              <div id="collapseTwo" class="accordion-collapse collapse"
                                                  aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                  <div class="accordion-body">

                                                      Nuestra misión es fomentar una cultura de reciclaje y conciencia
                                                      ambiental mediante la participación activa de empresas y
                                                      ciudadanos en actividades de voluntariado. A través de una
                                                      plataforma innovadora, facilitamos el acceso a puntos de
                                                      reciclaje y ofrecemos herramientas para que los usuarios
                                                      contribuyan de manera efectiva a la reducción de residuos y la
                                                      conservación del entorno natural.
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="accordion-item">
                                              <h5 class="accordion-header" id="headingThree">
                                                  <button class="accordion-button collapsed" type="button"
                                                      data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                      aria-expanded="false" aria-controls="collapseThree">
                                                      Visión
                                                  </button>
                                              </h5>
                                              <div id="collapseThree" class="accordion-collapse collapse"
                                                  aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                  <div class="accordion-body">

                                                      Ser el principal referente en Bogotá en la movilización de
                                                      voluntarios y empresas para el reciclaje, creando una red sólida
                                                      que promueva el desarrollo de una ciudad más limpia y consciente
                                                      de la importancia del manejo adecuado de residuos. Aspiramos a
                                                      expandir nuestro modelo a otras ciudades y convertirnos en una
                                                      plataforma clave en la transformación hacia una sociedad
                                                      sostenible.


                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </article>
              </section>
        </div>
    </div>
    <!-- Footer Section Start -->
    <footer class="footer">
    <div class="footer-body">
      <ul class="left-panel list-inline mb-0 p-0">
        <li class="list-inline-item"><a :to="'#'">Políticas de privacidad</a></li>
        <li class="list-inline-item"><a :to="'#'">Términos de uso</a></li>
      </ul>
      <div class="right-panel">
        ©{{ currentYear }} Ecovolunteer, Hecho por
        <span class="">
          <!-- Aquí puedes agregar el nombre de los creadores si lo deseas -->
        </span> por Ecovolunteer.
      </div>
    </div>
  </footer>
    <!-- Footer Section End -->
    </div>
  </template>
  
  <script>
  export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Home',
        data() {
            return {
            currentYear: new Date().getFullYear(),
            };
        },
    };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  
  @media (min-width: 1200px) {
        .bd-cheatsheet, .bd-cheatsheet section, .bd-cheatsheet article {
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr;
            grid-column: span 2;
            grid-template-rows: auto;
        }

    }
    @media (min-width: 1200px) {
        .bd-cheatsheet article .iq-document-card.iq-doc-head {
            margin-top: 0.2rem;
        }
    }
  </style>
  