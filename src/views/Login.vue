<template>

    <div class="wrapper">
      <section class="login-content">
        <div class="row m-0 align-items-center bg-white vh-100">
          <div class="col-md-6">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <div class="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <div class="card-body">
                    <a class="navbar-brand d-flex align-items-center mb-3">  
                      <!--Logo start-->
                      <div class="logo-main">
                        <div class="logo-normal">
                            <img src="@/assets/images/icons/icono-ecovolunteer.png" class="img-fluid gradient-main animated-scaleX" alt="images">
                        </div>
                        <div class="logo-mini">
                            
                        </div>
                      </div>
                      <!--logo End-->
  
                      <h4 class="logo-title ms-3">Ecovolunteer</h4>
                    </a>
                    <h2 class="mb-2 text-center">Iniciar Sesión</h2>
                    <p class="text-center">Ingresa para mantenerte conectado.</p>
                    <form @submit.prevent="onSubmit">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="email" v-model="email" placeholder=" ">
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" v-model="password" placeholder=" ">
                          </div>
                        </div>
                        <div class="col-lg-12 d-flex justify-content-between">
                          <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe">
                            <label class="form-check-label" for="customCheck1">Recordarme</label>
                          </div>
                          <router-link to="#">¿Olvidaste tu contraseña?</router-link>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                      </div>
                      <p class="text-center my-3">¿O inicia sesión con otras cuentas?</p>
                      <div class="d-flex justify-content-center">
                        <ul class="list-group list-group-horizontal list-group-flush">
                          <li class="list-group-item border-0 pb-0">
                            <a href="#"><img src="@/assets/images/brands/fb.svg" alt="fb"></a>
                          </li>
                          <li class="list-group-item border-0 pb-0">
                            <a href="#"><img src="@/assets/images/brands/gm.svg" alt="gm"></a>
                          </li>
                          <li class="list-group-item border-0 pb-0">
                            <a href="#"><img src="@/assets/images/brands/im.svg" alt="im"></a>
                          </li>
                          <li class="list-group-item border-0 pb-0">
                            <a href="#"><img src="@/assets/images/brands/li.svg" alt="li"></a>
                          </li>
                        </ul>
                      </div>
                      <p class="mt-3 text-center">
                        ¿No tienes una cuenta? <router-link to="/register" class="text-underline">Haz clic aquí para registrarte.</router-link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="sign-bg">
            </div>
          </div>
          <div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <img src="@/assets/images/auth/01-fondo.jpg" class="img-fluid gradient-main animated-scaleX" alt="images">
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
      };
    },
    methods: {
      onSubmit() {
        console.log('Email:', this.email);
        console.log('Contraseña:', this.password);
        console.log('Recordarme:', this.rememberMe);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  