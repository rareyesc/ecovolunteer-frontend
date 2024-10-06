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
                              <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Ingresa tu nombre" v-model="user.firstName" :class="{'is-invalid': errors.firstName}" required>
                              <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
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
                              <input type="number" class="form-control" :class="{'is-invalid': errors.cedula}" id="cedula" name="cedula" placeholder="Ingresa tu cédula" v-model="user.cedula">
                              <div v-if="errors.cedula" class="invalid-feedback">{{ errors.cedula }}</div>
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
                              <input type="password" class="form-control" :class="passwordClass" id="password" name="password" placeholder="Ingresa tu contraseña" v-model="password" required>
                              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                            </div>
                          </div>
                          <!-- Confirmar Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                              <input type="password" class="form-control" :class="confirmPasswordClass" id="confirmPassword" name="confirmPassword" placeholder="Confirma tu contraseña" v-model="confirmPassword" required>
                              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
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
                              <input type="password" class="form-control" :class="passwordClass" id="passwordCompany" name="passwordCompany" placeholder="Ingresa la contraseña" v-model="password" required>
                              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                            </div>
                          </div>
                          <!-- Confirmar Contraseña -->
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="confirmPasswordCompany" class="form-label">Confirmar Contraseña</label>
                              <input type="password" class="form-control" :class="confirmPasswordClass" id="confirmPasswordCompany" name="confirmPasswordCompany" placeholder="Confirma la contraseña" v-model="confirmPassword" required>
                              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
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

    <!-- Modal de Errores -->
    <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Errores en el formulario</h5>
            <button type="button" class="btn-close" @click="closeErrorsModal"></button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeErrorsModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin del Modal de Errores -->

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
        errors: {},
        showModal: false,
      };
    },
    watch: {
      password() {
        this.validatePasswordRealTime();
      },
      confirmPassword() {
        this.validatePasswordRealTime();
      },
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
    convertToLowerCase(obj) {
      const newObj = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (
            typeof value === 'string' &&
            key !== 'password' &&
            key !== 'confirmPassword' &&
            key !== 'cedula' &&
            key !== 'phoneNumber'
          ) {
            newObj[key] = value.toLowerCase();
          } else {
            newObj[key] = value;
          }
        }
      }
      return newObj;
    },
    async registerUser() {
      // Reiniciar mensajes
      this.errorMessage = '';
      this.successMessage = '';

      // Validar el formulario
      if (!this.validateForm()) {
        // Mostrar el modal de errores
        this.showErrorsModal();
        return;
      }

      if (this.userType === 'volunteer') {
        // Lógica para registrar voluntario
        try {
          const userData = this.convertToLowerCase(this.user);
          const response = await userApiClient.post('/users/register', userData);
          this.successMessage = response.data;
          // Limpiar el formulario
          this.resetForm();
          // Redirigir o acciones adicionales
        } catch (error) {
          this.handleError(error);
        }
      } else if (this.userType === 'company') {
        // Lógica para registrar compañía
        try {
          const companyData = this.convertToLowerCase(this.company);
          const response = await companyApiClient.post('/companies/register', companyData);
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

      validateName(name) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        return regex.test(name);
      },
      validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      },
      validatePassword(password) {
        // Al menos una letra mayúscula, una minúscula, un número y un carácter especial
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        return regex.test(password);
      },

      validateForm() {
        this.errors = {}; // Reinicia los errores

        if (this.userType === 'volunteer') {
          // Validaciones para voluntario
          if (!this.user.firstName) {
            this.errors.firstName = 'El nombre es obligatorio.';
          } else if (!this.validateName(this.user.firstName)) {
            this.errors.firstName = 'El nombre solo debe contener letras.';
          }

          if (!this.user.lastName) {
            this.errors.lastName = 'El apellido es obligatorio.';
          } else if (!this.validateName(this.user.lastName)) {
            this.errors.lastName = 'El apellido solo debe contener letras.';
          }

          if (!this.user.cedula) {
            this.errors.cedula = 'La cédula es obligatoria.';
          } else if (!/^\d+$/.test(this.user.cedula)) {
            this.errors.cedula = 'La cédula debe contener solo números.';
          }

          if (this.user.phoneNumber && !/^\d{7,10}$/.test(this.user.phoneNumber)) {
            this.errors.phoneNumber = 'El número de teléfono no es válido.';
          }

          if (!this.user.email) {
            this.errors.email = 'El correo electrónico es obligatorio.';
          } else if (!this.validateEmail(this.user.email)) {
            this.errors.email = 'El correo electrónico no es válido.';
          }

          if (!this.user.password) {
            this.errors.password = 'La contraseña es obligatoria.';
          } else if (!this.validatePassword(this.user.password)) {
            this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
          }

          if (this.user.password !== this.user.confirmPassword) {
            this.errors.confirmPassword = 'Las contraseñas no coinciden.';
          }

        } else if (this.userType === 'company') {
          // Validaciones para compañía
          if (!this.company.companyName) {
            this.errors.companyName = 'El nombre de la compañía es obligatorio.';
          }

          if (!this.company.nit) {
            this.errors.nit = 'El NIT es obligatorio.';
          }

          if (!/^\d+$/.test(this.company.nit)) {
            this.errors.nit = 'El NIT debe contener solo números.';
          }

          if (this.company.phoneNumber && !/^\d{7,10}$/.test(this.company.phoneNumber)) {
            this.errors.phoneNumber = 'El número de teléfono no es válido.';
          }

          if (!this.company.email) {
            this.errors.email = 'El correo electrónico es obligatorio.';
          } else if (!this.validateEmail(this.company.email)) {
            this.errors.email = 'El correo electrónico no es válido.';
          }

          if (!this.company.password) {
            this.errors.password = 'La contraseña es obligatoria.';
          } else if (!this.validatePassword(this.company.password)) {
            this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
          }

          if (this.company.password !== this.company.confirmPassword) {
            this.errors.confirmPassword = 'Las contraseñas no coinciden.';
          }
        }

        // Validar términos y condiciones
        if (!this.termsAccepted) {
          this.errors.termsAccepted = 'Debes aceptar los términos y condiciones.';
        }

        // Retornar true si no hay errores
        return Object.keys(this.errors).length === 0;
      },

      showErrorsModal() {
        this.showModal = true;
      },
      closeErrorsModal() {
        this.showModal = false;
      },
      validatePasswordRealTime() {
        if (this.userType === 'volunteer') {
          // Validar contraseña del voluntario
          if (this.user.password && !this.validatePassword(this.user.password)) {
            this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
          } else {
            delete this.errors.password;
          }

          if (this.user.confirmPassword && this.user.password !== this.user.confirmPassword) {
            this.errors.confirmPassword = 'Las contraseñas no coinciden.';
          } else {
            delete this.errors.confirmPassword;
          }
        } else if (this.userType === 'company') {
          // Validar contraseña de la compañía
          if (this.company.password && !this.validatePassword(this.company.password)) {
            this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
          } else {
            delete this.errors.password;
          }

          if (this.company.confirmPassword && this.company.password !== this.company.confirmPassword) {
            this.errors.confirmPassword = 'Las contraseñas no coinciden.';
          } else {
            delete this.errors.confirmPassword;
          }
        }
      },
    },
    computed: {
      password: {
        get() {
          return this.userType === 'volunteer' ? this.user.password : this.company.password;
        },
        set(value) {
          if (this.userType === 'volunteer') {
            this.user.password = value;
          } else {
            this.company.password = value;
          }
        },
      },
      confirmPassword: {
        get() {
          return this.userType === 'volunteer' ? this.user.confirmPassword : this.company.confirmPassword;
        },
        set(value) {
          if (this.userType === 'volunteer') {
            this.user.confirmPassword = value;
          } else {
            this.company.confirmPassword = value;
          }
        },
      },
      passwordClass() {
        if (this.password === '') {
          return '';
        } else if (this.validatePassword(this.password)) {
          return 'is-valid';
        } else {
          return 'is-invalid';
        }
      },
      confirmPasswordClass() {
        if (this.confirmPassword === '') {
          return '';
        } else if (this.password !== '' && this.password === this.confirmPassword) {
          return 'is-valid';
        } else {
          return 'is-invalid';
        }
      },
    },
  };
  </script>
  
  <style>
    /* Estilos para el modal */
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-dialog {
      margin-top: 10%;
    }
    .is-valid {
      border-color: #198754 !important; /* Verde Bootstrap */
    }

    .is-invalid {
      border-color: #dc3545 !important; /* Rojo Bootstrap */
    }
  </style>