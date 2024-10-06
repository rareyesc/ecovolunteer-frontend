<template>
    <div class="wrapper">
      <section class="login-content">
        <div class="row m-0 align-items-center bg-white vh-100">
          <!-- Imagen lateral -->
          <div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <img src="@/assets/images/auth/05-fondo.jpg" class="img-fluid gradient-main animated-scaleX" alt="images">
          </div>
          <!-- Contenido principal -->
          <div class="col-md-6">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                  <div class="card-body">
                    <!-- Logo y encabezados -->
                    <a class="navbar-brand d-flex align-items-center mb-3">
                      <!--Logo start-->
                      <div class="logo-main">
                        <div class="logo-normal">
                            <img src="@/assets/images/icons/icono-ecovolunteer.png" class="img-fluid gradient-main animated-scaleX" alt="images">
                        </div>
                        <div class="logo-mini">
                          <!-- Logo mini -->
                        </div>
                      </div>
                      <!--Logo end-->
                      <h4 class="logo-title ms-3">EcoVolunteer</h4>
                    </a>
                    <!-- Selector de tipo de registro -->
                    <div class="d-flex justify-content-center mb-4">
                      <button
                        :class="{'btn btn-primary me-2': userType === 'volunteer', 'btn btn-outline-primary me-2': userType !== 'volunteer'}"
                        @click="selectUserType('volunteer')"
                      >
                        Voluntario
                      </button>
                      <button
                        :class="{'btn btn-primary': userType === 'company', 'btn btn-outline-primary': userType !== 'company'}"
                        @click="selectUserType('company')"
                      >
                        Compañía
                      </button>
                    </div>
                    <!-- Formularios -->
                    <h2 class="mb-2 text-center">Registro de {{ userType === 'volunteer' ? 'Voluntario' : 'Compañía' }}</h2>
                    <p class="text-center">Crea tu cuenta en EcoVolunteer.</p>
                    <form @submit.prevent="registerUser">
                      <div class="row">
                        <!-- Formulario para Voluntario -->
                        <template v-if="userType === 'volunteer'">
                          <!-- Campos del voluntario -->
                          <!-- Nombre -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="firstName" class="form-label">Nombre</label>
                              <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Ingresa tu nombre" v-model="user.firstName" required>
                            </div>
                          </div>
                          <!-- Apellido -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="lastName" class="form-label">Apellido</label>
                              <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Ingresa tu apellido" v-model="user.lastName" required>
                            </div>
                          </div>
                          <!-- Cédula -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="cedula" class="form-label">Cédula</label>
                              <input type="text" class="form-control" id="cedula" name="cedula" placeholder="Ingresa tu cédula" v-model="user.cedula">
                            </div>
                          </div>
                          <!-- Email -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="email" class="form-label">Correo Electrónico</label>
                              <input type="email" class="form-control" id="email" name="email" placeholder="Ingresa tu correo" v-model="user.email" required>
                            </div>
                          </div>
                          <!-- Teléfono -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="phoneNumber" class="form-label">Número de Teléfono</label>
                              <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Ingresa tu teléfono" v-model="user.phoneNumber">
                            </div>
                          </div>
                          <!-- Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="password" class="form-label">Contraseña</label>
                              <input type="password" class="form-control" id="password" name="password" placeholder="Ingresa tu contraseña" v-model="user.password" required>
                            </div>
                          </div>
                          <!-- Confirmar Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                              <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirma tu contraseña" v-model="user.confirmPassword" required>
                            </div>
                          </div>
                        </template>
                        <!-- Formulario para Compañía -->
                        <template v-else>
                          <!-- Nombre de la Compañía -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="companyName" class="form-label">Nombre de la Compañía</label>
                              <input type="text" class="form-control" id="companyName" name="companyName" placeholder="Ingresa el nombre de la compañía" v-model="company.companyName" required>
                            </div>
                          </div>
                          <!-- NIT -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="nit" class="form-label">NIT</label>
                              <input type="text" class="form-control" id="nit" name="nit" placeholder="Ingresa el NIT" v-model="company.nit" required>
                            </div>
                          </div>
                          <!-- Dirección -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="address" class="form-label">Dirección</label>
                              <input type="text" class="form-control" id="address" name="address" placeholder="Ingresa la dirección" v-model="company.address">
                            </div>
                          </div>
                          <!-- Email -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="emailCompany" class="form-label">Correo Electrónico</label>
                              <input type="email" class="form-control" id="emailCompany" name="emailCompany" placeholder="Ingresa el correo" v-model="company.email" required>
                            </div>
                          </div>
                          <!-- Teléfono -->
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="phoneNumberCompany" class="form-label">Número de Teléfono</label>
                              <input type="text" class="form-control" id="phoneNumberCompany" name="phoneNumberCompany" placeholder="Ingresa el teléfono" v-model="company.phoneNumber">
                            </div>
                          </div>
                          <!-- Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="passwordCompany" class="form-label">Contraseña</label>
                              <input type="password" class="form-control" id="passwordCompany" name="passwordCompany" placeholder="Ingresa la contraseña" v-model="company.password" required>
                            </div>
                          </div>
                          <!-- Confirmar Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="confirmPasswordCompany" class="form-label">Confirmar Contraseña</label>
                              <input type="password" class="form-control" id="confirmPasswordCompany" name="confirmPasswordCompany" placeholder="Confirma la contraseña" v-model="company.confirmPassword" required>
                            </div>
                          </div>
                        </template>
                        <!-- Términos y Condiciones -->
                        <div class="col-lg-12 d-flex justify-content-center">
                          <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="termsCheck" v-model="termsAccepted" required>
                            <label class="form-check-label" for="termsCheck">Acepto los términos y condiciones</label>
                          </div>
                        </div>
                      </div>
                      <!-- Botón de envío -->
                      <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Registrarse</button>
                      </div>
                      <!-- Mensajes de error y éxito -->
                      <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">
                        {{ errorMessage }}
                      </div>
                      <div v-if="successMessage" class="alert alert-success mt-3 text-center">
                        {{ successMessage }}
                      </div>
                      <!-- Enlace a Iniciar Sesión -->
                      <p class="mt-3 text-center">
                        ¿Ya tienes una cuenta? <router-link to="/login" class="text-underline">Iniciar Sesión</router-link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="sign-bg sign-bg-right">
              <!-- Puedes agregar elementos decorativos aquí -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { userApiClient, companyApiClient } from '@/services/api';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
      return {
        userType: 'volunteer', // 'volunteer' o 'company'
        user: {
          firstName: '',
          lastName: '',
          cedula: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        },
        company: {
          companyName: '',
          nit: '',
          address: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        },
        termsAccepted: false,
        errorMessage: '',
        successMessage: '',
      };
    },
    methods: {
    selectUserType(type) {
      this.userType = type;
      this.resetForm();
    },
    resetForm() {
      this.errorMessage = '';
      this.successMessage = '';
      this.termsAccepted = false;
      if (this.userType === 'volunteer') {
        this.user = {
          firstName: '',
          lastName: '',
          cedula: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        };
      } else {
        this.company = {
          companyName: '',
          nit: '',
          address: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        };
      }
    },
    async registerUser() {
      // Reiniciar mensajes
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.termsAccepted) {
        this.errorMessage = 'Debes aceptar los términos y condiciones.';
        return;
      }

      if (this.userType === 'volunteer') {
        // Validar contraseñas
        if (this.user.password !== this.user.confirmPassword) {
          this.errorMessage = 'Las contraseñas no coinciden.';
          return;
        }
        // Lógica para registrar voluntario
        try {
          const response = await userApiClient.post('/users/register', this.user);
          this.successMessage = response.data;
          // Limpiar el formulario
          this.resetForm();
          // Redirigir o acciones adicionales
        } catch (error) {
          this.handleError(error);
        }
      } else if (this.userType === 'company') {
        // Validar contraseñas
        if (this.company.password !== this.company.confirmPassword) {
          this.errorMessage = 'Las contraseñas no coinciden.';
          return;
        }
        // Lógica para registrar compañía
        try {
          const response = await companyApiClient.post('/companies/register', this.company);
          this.successMessage = response.data;
          // Limpiar el formulario
          this.resetForm();
          // Redirigir o acciones adicionales
        } catch (error) {
          this.handleError(error);
        }
      }
    },
    handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          this.errorMessage = errorData;
        } else if (typeof errorData === 'object') {
          // Manejar errores de validación
          this.errorMessage = Object.values(errorData).join(' ');
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      } else {
        this.errorMessage = 'Error al conectar con el servidor.';
        }
      },
    },
  };
  </script>
  
  <style>

  </style>
  