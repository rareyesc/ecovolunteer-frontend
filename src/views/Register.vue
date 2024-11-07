<template>
  <div class="wrapper vh-100">
    <section class="login-content h-100">
      <div class="row m-0 align-items-stretch h-100">
        <!-- Imagen lateral -->
        <div class="col-md-6 d-md-block d-none p-0 vh-100 overflow-hidden">
          <img src="@/assets/images/auth/05-fondo.jpg" class="img-fluid h-100 w-100" alt="images" style="object-fit: cover;">
        </div>
        <!-- Contenido principal -->
        <div class="col-md-6 d-flex align-items-center form-container">
          <div class="row justify-content-center w-100">
            <div class="col-md-11">
              <div class="card border-0 bg-transparent shadow-none d-flex justify-content-center mb-0">
                <div class="card-body px-lg-5">
                  <!-- Logo y encabezados -->
                  <a class="navbar-brand d-flex align-items-center mb-3">
                    <div class="logo-main">
                      <div class="logo-normal">
                        <img src="@/assets/images/icono-ecovolunteer_48x48.png" class="img-fluid" alt="images">
                      </div>
                    </div>
                    <h4 class="logo-title ms-3">EcoVolunteer</h4>
                  </a>
                  <!-- Selector de tipo de registro -->
                  <div class="d-flex justify-content-center mb-4">
                    <button :class="{'btn btn-primary me-2': userType === 'volunteer', 'btn btn-outline-primary me-2': userType !== 'volunteer'}" @click="selectUserType('volunteer')">
                      Voluntario
                    </button>
                    <button :class="{'btn btn-primary': userType === 'company', 'btn btn-outline-primary': userType !== 'company'}" @click="selectUserType('company')">
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
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="firstName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="firstName" v-model="user.firstName" :class="{'is-invalid': errors.firstName}" placeholder="Ingrese su nombre" required>
                            <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="lastName" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="lastName" v-model="user.lastName" :class="{'is-invalid': errors.lastName}" placeholder="Ingrese su apellido" required>
                            <div v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</div>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="cedula" class="form-label">Cédula</label>
                            <input type="number" class="form-control" id="cedula" v-model="user.cedula" :class="{'is-invalid': errors.cedula}" placeholder="Ingrese su cedula" required>
                            <div v-if="errors.cedula" class="invalid-feedback">{{ errors.cedula }}</div>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="email" v-model="user.email" :class="{'is-invalid': errors.email}" placeholder="Ingrese su email" required>
                            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="phoneNumber" class="form-label">Número de Teléfono</label>
                            <input type="number" class="form-control" id="phoneNumber" v-model="user.phoneNumber" placeholder="Ingrese su numero telefonico" required>
                          </div>
                        </div>
                        <div class="col-lg-6 pt-3">
                          <div class="form-group">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" v-model="password" :class="passwordClass" placeholder="Ingrese su password" required>
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                          </div>
                        </div>
                        <div class="col-lg-6 pt-3">
                          <div class="form-group">
                            <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" :class="confirmPasswordClass" placeholder="Repetir password" required>
                            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
                          </div>
                        </div>
                      </template>
                      <!-- Formulario para Compañía -->
                      <template v-else>
                        <div class="col-lg-12">
                          <div class="form-group">
                            <label for="companyName" class="form-label">Nombre de la Compañía</label>
                            <input type="text" class="form-control" id="companyName" v-model="company.companyName" placeholder="Ingrese el nombre de la compañía" required>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="nit" class="form-label">NIT</label>
                            <input type="text" class="form-control" id="nit" v-model="company.nit" placeholder="Ingrese el NIT de la compañía" required>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="address" class="form-label">Dirección</label>
                            <input type="text" class="form-control" id="address" v-model="company.address" placeholder="Ingrese la dirección de la compañía" required>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="emailCompany" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="emailCompany" v-model="company.email" placeholder="Ingrese el email de la compañía" required>
                          </div>
                        </div>
                        <div class="col-lg-12 pt-3">
                          <div class="form-group">
                            <label for="phoneNumberCompany" class="form-label">Número de Teléfono</label>
                            <input type="text" class="form-control" id="phoneNumberCompany" v-model="company.phoneNumber" placeholder="Ingrese el telefono de la compañía" required>
                          </div>
                        </div>
                        <div class="col-lg-6 pt-3">
                          <div class="form-group">
                            <label for="passwordCompany" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="passwordCompany" v-model="password" :class="passwordClass" placeholder="Ingrese el password" required>
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                          </div>
                        </div>
                        <div class="col-lg-6 pt-3">
                          <div class="form-group">
                            <label for="confirmPasswordCompany" class="form-label">Confirmar Contraseña</label>
                            <input type="password" class="form-control" id="confirmPasswordCompany" v-model="confirmPassword" :class="confirmPasswordClass" placeholder="Repetir password" required>
                            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
                          </div>
                        </div>
                      </template>
                      <!-- Términos y Condiciones -->
                      <div class="col-lg-12 d-flex justify-content-center pt-3">
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
                    <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">{{ errorMessage }}</div>
                    <div v-if="successMessage" class="alert alert-success mt-3 text-center">{{ successMessage }}</div>
                    <!-- Enlace a Iniciar Sesión -->
                    <p class="mt-3 text-center">
                      ¿Ya tienes una cuenta? <router-link to="/login" class="text-underline">Iniciar Sesión</router-link>
                    </p>
                    <p class="text-center">
                      Volver a la página <router-link to="/" class="text-underline">Principal</router-link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- Modal de Errores -->
  <div class="modal fade" tabindex="-1" ref="errorModal" aria-labelledby="errorModalLabel" aria-hidden="true">
    <div class="modal-dialog mt-5">
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

  <!-- Modal de Éxito -->
  <div class="modal fade" tabindex="-1" ref="successModal" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog mt-5">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">¡Registro Exitoso!</h5>
          <button type="button" class="btn-close" @click="closeSuccessModal"></button>
        </div>
        <div class="modal-body">
          <p>Tu cuenta ha sido creada exitosamente.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="redirectToLogin">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userApiClient, companyApiClient } from '@/services/api';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    return {
      userType: 'volunteer',
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
      errorModalInstance: null,
      successModalInstance: null,
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
      console.log("Tipo seleccionado:", type);
      this.userType = type;
      this.resetForm();
    },
    resetForm() {
      this.errorMessage = '';
      this.successMessage = '';
      this.termsAccepted = false;
      this.errors = {};
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
          if (typeof value === 'string' &&
            key !== 'password' &&
            key !== 'confirmPassword' &&
            key !== 'cedula' &&
            key !== 'phoneNumber') {
            newObj[key] = value.toLowerCase();
          } else {
            newObj[key] = value;
          }
        }
      }
      return newObj;
    },
    async registerUser() {
      this.errorMessage = '';
      this.successMessage = '';
      this.errors = {};

      if (!this.validateForm()) {
        this.showErrorsModal();
        return;
      }

      try {
        if (this.userType === 'volunteer') {
          const userData = this.convertToLowerCase(this.user);
          await userApiClient.post('/users/register', userData);
        } else if (this.userType === 'company') {
          const companyData = this.convertToLowerCase(this.company);
          await companyApiClient.post('/companies/register', companyData);
        }
        this.showSuccessModal();
        this.resetForm();
      } catch (error) {
        this.handleError(error);
        this.showErrorsModal();
      }
    },
    handleError(error) {
      this.errors = {};
      this.errorMessage = '';

      if (error.response) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          this.errorMessage = errorData;
        } else if (typeof errorData === 'object') {
          this.errors = errorData;
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
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
      return regex.test(password);
    },
    validateForm() {
      this.errors = {};

      if (this.userType === 'volunteer') {
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
        if (!this.company.companyName) {
          this.errors.companyName = 'El nombre de la compañía es obligatorio.';
        }

        if (!this.company.nit) {
          this.errors.nit = 'El NIT es obligatorio.';
        } else if (!/^\d+$/.test(this.company.nit)) {
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
      if (!this.termsAccepted) {
        this.errors.termsAccepted = 'Debes aceptar los términos y condiciones.';
      }
      return Object.keys(this.errors).length === 0;
    },
    showErrorsModal() {
      if (!this.errorModalInstance) {
        this.errorModalInstance = new window.bootstrap.Modal(this.$refs.errorModal);
      }
      this.errorModalInstance.show();
    },
    closeErrorsModal() {
      if (this.errorModalInstance) {
        this.errorModalInstance.hide();
      }
    },
    showSuccessModal() {
      if (!this.successModalInstance) {
        this.successModalInstance = new window.bootstrap.Modal(this.$refs.successModal);
      }
      this.successModalInstance.show();
    },
    closeSuccessModal() {
      if (this.successModalInstance) {
        this.successModalInstance.hide();
      }
    },
    redirectToLogin() {
      this.closeSuccessModal();
      this.$router.push('/login');
    },
    validatePasswordRealTime() {
      if (this.password && !this.validatePassword(this.password)) {
        this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
      } else {
        delete this.errors.password;
      }

      if (this.confirmPassword && this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      } else {
        delete this.errors.confirmPassword;
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

<style scoped>
</style>