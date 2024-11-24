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
                          <InputField
                            label="Nombre"
                            type="text"
                            id="firstName"
                            v-model="user.firstName"
                            placeholder="Ingrese su nombre"
                            :errorMessage="errors.firstName"
                          />
                        </div>
                        <div class="col-lg-6">
                          <InputField
                            label="Apellido"
                            type="text"
                            id="lastName"
                            v-model="user.lastName"
                            placeholder="Ingrese su apellido"
                            :errorMessage="errors.lastName"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Cédula"
                            type="number"
                            id="cedula"
                            v-model="user.cedula"
                            placeholder="Ingrese su cédula"
                            :errorMessage="errors.cedula"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Correo Electrónico"
                            type="email"
                            id="email"
                            v-model="user.email"
                            placeholder="Ingrese su email"
                            :errorMessage="errors.email"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Número de Teléfono"
                            type="number"
                            id="phoneNumber"
                            v-model="user.phoneNumber"
                            placeholder="Ingrese su número telefónico"
                            :errorMessage="errors.phoneNumber"
                          />
                        </div>
                        <div class="col-lg-6 pt-3">
                          <InputField
                            label="Contraseña"
                            type="password"
                            id="password"
                            v-model="user.password"
                            placeholder="Ingrese su contraseña"
                            :errorMessage="errors.password"
                            :customClass="passwordClass"
                          />
                        </div>
                        <div class="col-lg-6 pt-3">
                          <InputField
                            label="Confirmar Contraseña"
                            type="password"
                            id="confirmPassword"
                            v-model="user.confirmPassword"
                            placeholder="Repetir contraseña"
                            :errorMessage="errors.confirmPassword"
                            :customClass="confirmPasswordClass"
                          />
                        </div>
                      </template>
                      <!-- Formulario para Compañía -->
                      <template v-else>
                        <div class="col-lg-12">
                          <InputField
                            label="Nombre de la Compañía"
                            type="text"
                            id="companyName"
                            v-model="company.companyName"
                            placeholder="Ingrese el nombre de la compañía"
                            :errorMessage="errors.companyName"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="NIT"
                            type="text"
                            id="nit"
                            v-model="company.nit"
                            placeholder="Ingrese el NIT de la compañía"
                            :errorMessage="errors.nit"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Dirección"
                            type="text"
                            id="address"
                            v-model="company.address"
                            placeholder="Ingrese la dirección de la compañía"
                            :errorMessage="errors.address"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Correo Electrónico"
                            type="email"
                            id="emailCompany"
                            v-model="company.email"
                            placeholder="Ingrese el email de la compañía"
                            :errorMessage="errors.email"
                          />
                        </div>
                        <div class="col-lg-12 pt-3">
                          <InputField
                            label="Número de Teléfono"
                            type="text"
                            id="phoneNumberCompany"
                            v-model="company.phoneNumber"
                            placeholder="Ingrese el teléfono de la compañía"
                            :errorMessage="errors.phoneNumber"
                          />
                        </div>
                        <div class="col-lg-6 pt-3">
                          <InputField
                            label="Contraseña"
                            type="password"
                            id="passwordCompany"
                            v-model="company.password"
                            placeholder="Ingrese la contraseña"
                            :errorMessage="errors.password"
                            :customClass="passwordClass"
                          />
                        </div>
                        <div class="col-lg-6 pt-3">
                          <InputField
                            label="Confirmar Contraseña"
                            type="password"
                            id="confirmPasswordCompany"
                            v-model="company.confirmPassword"
                            placeholder="Repetir contraseña"
                            :errorMessage="errors.confirmPassword"
                            :customClass="confirmPasswordClass"
                          />
                        </div>
                      </template>
                      <!-- Términos y Condiciones -->
                      <div class="col-lg-12 d-flex justify-content-center pt-3">
                        <div class="form-check mb-3">
                          <input type="checkbox" class="form-check-input" id="termsCheck" v-model="termsAccepted" required>
                          <label class="form-check-label" for="termsCheck">Acepto los términos y condiciones</label>
                          <div v-if="errors.termsAccepted" class="text-danger">{{ errors.termsAccepted }}</div>
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
  <!-- Modales -->
  <SuccessModal ref="successModal" />
  <ErrorModal ref="errorModal" :errorMessages="errorMessages" />
</template>

<script>
import InputField from '@/components/auth/InputField.vue';
import SuccessModal from '@/components/modals/SuccessModal.vue';
import ErrorModal from '@/components/modals/ErrorModal.vue';
import { validateName, validateEmail, validatePassword, validateCedula, validatePhoneNumber } from '@/utils/validationUtils';
import { registerUser } from '@/services/auth/userService';
import { registerCompany } from '@/services/auth/companyService';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  components: {
    InputField,
    SuccessModal,
    ErrorModal,
  },
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
      errorMessages: [],
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
      this.errors = {};
      this.errorMessages = [];
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
            key !== 'phoneNumber' &&
            key !== 'nit') {
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
      this.errorMessages = [];

      if (!this.validateForm()) {
        this.$refs.errorModal.showModal();
        return;
      }

      try {
        if (this.userType === 'volunteer') {
          const userData = this.convertToLowerCase(this.user);
          await registerUser(userData);
        } else if (this.userType === 'company') {
          const companyData = this.convertToLowerCase(this.company);
          await registerCompany(companyData);
        }
        this.$refs.successModal.showModal();
        this.resetForm();
      } catch (error) {
        this.handleError(error);
        this.$refs.errorModal.showModal();
      }
    },
    handleError(error) {
      this.errors = {};
      this.errorMessage = '';
      this.errorMessages = [];

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 409) {
          this.errorMessage = errorData;
          this.errorMessages.push(errorData);
        } else if (status === 400 && typeof errorData === 'object') {
          this.errors = errorData;
          this.errorMessages = Object.values(errorData);
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
          this.errorMessages.push(this.errorMessage);
        }
      } else {
        this.errorMessage = 'Error al conectar con el servidor.';
        this.errorMessages.push(this.errorMessage);
      }
    },
    validateForm() {
      this.errors = {};

      if (this.userType === 'volunteer') {
        if (!this.user.firstName) {
          this.errors.firstName = 'El nombre es obligatorio.';
        } else if (!validateName(this.user.firstName)) {
          this.errors.firstName = 'El nombre solo debe contener letras.';
        }

        if (!this.user.lastName) {
          this.errors.lastName = 'El apellido es obligatorio.';
        } else if (!validateName(this.user.lastName)) {
          this.errors.lastName = 'El apellido solo debe contener letras.';
        }

        if (!this.user.cedula) {
          this.errors.cedula = 'La cédula es obligatoria.';
        } else if (!validateCedula(this.user.cedula)) {
          this.errors.cedula = 'La cédula debe contener solo números.';
        }

        if (this.user.phoneNumber && !validatePhoneNumber(this.user.phoneNumber)) {
          this.errors.phoneNumber = 'El número de teléfono no es válido.';
        }

        if (!this.user.email) {
          this.errors.email = 'El correo electrónico es obligatorio.';
        } else if (!validateEmail(this.user.email)) {
          this.errors.email = 'El correo electrónico no es válido.';
        }

        if (!this.user.password) {
          this.errors.password = 'La contraseña es obligatoria.';
        } else if (!validatePassword(this.user.password)) {
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
        } else if (!validateCedula(this.company.nit)) {
          this.errors.nit = 'El NIT debe contener solo números.';
        }

        if (!this.company.address) {
          this.errors.address = 'La dirección es obligatoria.';
        }

        if (this.company.phoneNumber && !validatePhoneNumber(this.company.phoneNumber)) {
          this.errors.phoneNumber = 'El número de teléfono no es válido.';
        }

        if (!this.company.email) {
          this.errors.email = 'El correo electrónico es obligatorio.';
        } else if (!validateEmail(this.company.email)) {
          this.errors.email = 'El correo electrónico no es válido.';
        }

        if (!this.company.password) {
          this.errors.password = 'La contraseña es obligatoria.';
        } else if (!validatePassword(this.company.password)) {
          this.errors.password = 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
        }

        if (this.company.password !== this.company.confirmPassword) {
          this.errors.confirmPassword = 'Las contraseñas no coinciden.';
        }
      }
      if (!this.termsAccepted) {
        this.errors.termsAccepted = 'Debes aceptar los términos y condiciones.';
      }
      // Actualizar el array de mensajes de error
      this.errorMessages = Object.values(this.errors);

      return Object.keys(this.errors).length === 0;
    },
    validatePasswordRealTime() {
      const password =
        this.userType === 'volunteer' ? this.user.password : this.company.password;
      const confirmPassword =
        this.userType === 'volunteer' ? this.user.confirmPassword : this.company.confirmPassword;

      if (password && !validatePassword(password)) {
        this.errors.password =
          'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
      } else {
        delete this.errors.password;
      }

      if (confirmPassword && password !== confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      } else {
        delete this.errors.confirmPassword;
      }

      // Actualizar el array de mensajes de error
      this.errorMessages = Object.values(this.errors);
    },
  },
  watch: {
    'user.password': 'validatePasswordRealTime',
    'user.confirmPassword': 'validatePasswordRealTime',
    'company.password': 'validatePasswordRealTime',
    'company.confirmPassword': 'validatePasswordRealTime',
  },
  computed: {
    passwordClass() {
      const password =
        this.userType === 'volunteer' ? this.user.password : this.company.password;
      if (password === '') {
        return '';
      } else if (validatePassword(password)) {
        return 'is-valid';
      } else {
        return 'is-invalid';
      }
    },
    confirmPasswordClass() {
      const password =
        this.userType === 'volunteer' ? this.user.password : this.company.password;
      const confirmPassword =
        this.userType === 'volunteer' ? this.user.confirmPassword : this.company.confirmPassword;
      if (confirmPassword === '') {
        return '';
      } else if (password !== '' && password === confirmPassword) {
        return 'is-valid';
      } else {
        return 'is-invalid';
      }
    },
  },
};
</script>