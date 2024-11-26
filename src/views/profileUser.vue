<template>
    <UserLayout
      :titulo="tituloHeader"
      :descripcion="descripcionHeader"
    >
      <div class="container-fluid mt-3">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow-sm border-0 rounded">
              <div class="card-body scrollable-card-body position-relative">
                
                <!-- Indicador de Carga -->
                <div v-if="loading" class="loading-overlay">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
  
                <!-- Mensajes de Error y Éxito -->
                <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="alert alert-success">
                  {{ successMessage }}
                </div>
  
                <form @submit.prevent="updateUser">
                  <!-- Campos del Formulario en una sola columna -->
                  <div class="form-group mb-3">
                    <label for="firstName" class="form-label">Nombre</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName" 
                      v-model="user.first_name" 
                      :disabled="!isEditable" 
                      placeholder="Ingrese su nombre" 
                      required
                      @blur="validateFirstName"
                    >
                    <small class="text-danger" v-if="formErrors.first_name">{{ formErrors.first_name }}</small>
                  </div>
  
                  <div class="form-group mb-3">
                    <label for="lastName" class="form-label">Apellido</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="lastName" 
                      v-model="user.last_name" 
                      :disabled="!isEditable" 
                      placeholder="Ingrese su apellido" 
                      required
                      @blur="validateLastName"
                    >
                    <small class="text-danger" v-if="formErrors.last_name">{{ formErrors.last_name }}</small>
                  </div>
  
                  <div class="form-group mb-3">
                    <label for="cedula" class="form-label">Cédula</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="cedula" 
                      v-model="user.cedula" 
                      :disabled="true" 
                      placeholder="Cédula de usuario" 
                      required
                    >
                    <!-- No se valida Cédula ya que está deshabilitada -->
                  </div>
  
                  <div class="form-group mb-3">
                    <label for="phoneNumber" class="form-label">Número de Teléfono</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="phoneNumber" 
                      v-model="user.phone_number" 
                      :disabled="!isEditable" 
                      placeholder="Ingrese su teléfono" 
                      required
                      @blur="validatePhoneNumber"
                    >
                    <small class="text-danger" v-if="formErrors.phone_number">{{ formErrors.phone_number }}</small>
                  </div>
  
                  <!-- Botón de Envío -->
                  <div class="row mt-4">
                    <div class="col text-end">
                      <button 
                        v-if="!isEditable" 
                        class="btn btn-success me-2" 
                        type="button" 
                        @click="toggleEdit"
                      >
                        Modificar
                      </button>
                      <button 
                        v-else 
                        type="submit" 
                        class="btn btn-primary"
                        :disabled="!isFormValid"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  </template>
  
  <script>
  import UserLayout from '@/layouts/UserLayout.vue';
  import { profileApiClient, getToken } from '@/services/api.js';
  
  export default {
    name: 'ProfileUser',
    components: {
      UserLayout,
    },
    data() {
      return {
        tituloHeader: 'Perfil de Usuario',
        descripcionHeader: 'Esta es la página principal de tu perfil',
        user: {
          user_id: null,
          account_id: null,
          first_name: '',
          last_name: '',
          cedula: '',
          phone_number: '',
          created_at: '',
          updated_at: ''
        },
        isEditable: false,
        loading: false, // Estado de carga
        errorMessage: '', // Mensaje de error
        successMessage: '', // Mensaje de éxito
        formErrors: { // Objeto para errores de validación
          first_name: '',
          last_name: '',
          phone_number: ''
        }
      };
    },
    computed: {
      isFormValid() {
        // Verifica que no haya mensajes de error y que los campos requeridos no estén vacíos
        return (
          this.user.first_name.trim() !== '' &&
          this.user.last_name.trim() !== '' &&
          this.user.phone_number.trim() !== '' &&
          this.formErrors.first_name === '' &&
          this.formErrors.last_name === '' &&
          this.formErrors.phone_number === ''
        );
      }
    },
    methods: {
      toggleEdit() {
        this.isEditable = true;
      },
  
      /**
       * Función para validar el formulario.
       * Verifica que los campos obligatorios estén completos y cumplan con las expresiones regulares.
       */
      validateForm() {
        let isValid = true;
  
        // Resetear errores
        this.formErrors.first_name = '';
        this.formErrors.last_name = '';
        this.formErrors.phone_number = '';
  
        // Validar first_name: Solo letras y espacios
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!this.user.first_name.trim()) {
          this.formErrors.first_name = 'El nombre es obligatorio.';
          isValid = false;
        } else if (!nameRegex.test(this.user.first_name)) {
          this.formErrors.first_name = 'El nombre solo puede contener letras y espacios.';
          isValid = false;
        }
  
        // Validar last_name: Solo letras y espacios
        if (!this.user.last_name.trim()) {
          this.formErrors.last_name = 'El apellido es obligatorio.';
          isValid = false;
        } else if (!nameRegex.test(this.user.last_name)) {
          this.formErrors.last_name = 'El apellido solo puede contener letras y espacios.';
          isValid = false;
        }
  
        // Validar phone_number: Solo números
        const phoneNumberRegex = /^[0-9]+$/;
        if (!this.user.phone_number.trim()) {
          this.formErrors.phone_number = 'El número de teléfono es obligatorio.';
          isValid = false;
        } else if (!phoneNumberRegex.test(this.user.phone_number)) {
          this.formErrors.phone_number = 'El número de teléfono solo puede contener números.';
          isValid = false;
        }
  
        return isValid;
      },
  
      /**
       * Maneja el evento @blur del campo "Nombre".
       * Valida el nombre sin modificar el contenido.
       */
      handleFirstNameBlur() {
        this.validateFirstName();
        // No capitalización, solo validación
      },
  
      /**
       * Maneja el evento @blur del campo "Apellido".
       * Valida el apellido sin modificar el contenido.
       */
      handleLastNameBlur() {
        this.validateLastName();
        // No capitalización, solo validación
      },
  
      validateFirstName() {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!this.user.first_name.trim()) {
          this.formErrors.first_name = 'El nombre es obligatorio.';
        } else if (!nameRegex.test(this.user.first_name)) {
          this.formErrors.first_name = 'El nombre solo puede contener letras y espacios.';
        } else {
          this.formErrors.first_name = '';
        }
      },
  
      validateLastName() {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!this.user.last_name.trim()) {
          this.formErrors.last_name = 'El apellido es obligatorio.';
        } else if (!nameRegex.test(this.user.last_name)) {
          this.formErrors.last_name = 'El apellido solo puede contener letras y espacios.';
        } else {
          this.formErrors.last_name = '';
        }
      },
  
      validatePhoneNumber() {
        const phoneNumberRegex = /^[0-9]+$/;
        if (!this.user.phone_number.trim()) {
          this.formErrors.phone_number = 'El número de teléfono es obligatorio.';
        } else if (!phoneNumberRegex.test(this.user.phone_number)) {
          this.formErrors.phone_number = 'El número de teléfono solo puede contener números.';
        } else {
          this.formErrors.phone_number = '';
        }
      },
  
      /**
       * Obtiene el perfil del usuario desde el backend.
       */
      async fetchUserProfile() {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        try {
          const token = getToken();
          if (!token) {
            this.$router.push({ name: 'Login' });
            return;
          }
  
          const endpoint = '/http_trigger';
          console.log(`Haciendo solicitud POST a ${profileApiClient.defaults.baseURL}${endpoint}`);
  
          const response = await profileApiClient.post(endpoint, {
            is_update: false, // Indica que solo se desea obtener datos
            new_data: null
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          console.log('Datos de la respuesta:', response.data);
  
          if (response.status === 200) {
            this.user = response.data.user_data;
            this.successMessage = 'Perfil obtenido exitosamente.';
          }
        } catch (error) {
          console.error('Error al obtener el perfil del usuario:', error);
          this.errorMessage = 'No se pudo cargar el perfil del usuario.';
        } finally {
          this.loading = false;
        }
      },
  
      /**
       * Actualiza el perfil del usuario en el backend.
       */
      async updateUser() {
        if (!this.isEditable) return;
  
        // Validar el formulario antes de enviar
        if (!this.validateForm()) {
          this.errorMessage = 'Por favor, corrige los errores en el formulario.';
          return;
        }
  
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
  
        try {
          const token = getToken();
          if (!token) {
            this.$router.push({ name: 'Login' });
            return;
          }
  
          // Preparar los datos a actualizar
          const updatedData = {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone_number: this.user.phone_number
          };
  
          const endpoint = '/http_trigger';
          console.log(`Haciendo solicitud POST a ${profileApiClient.defaults.baseURL}${endpoint}`);
  
          const response = await profileApiClient.post(endpoint, {
            is_update: true,
            new_data: updatedData
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          if (response.status === 200) {
            this.successMessage = 'Perfil actualizado exitosamente.';
            this.isEditable = false;
            // Actualizar los datos locales con la respuesta
            this.user = response.data.user_data;
          }
        } catch (error) {
          console.error('Error al actualizar el perfil del usuario:', error);
          this.errorMessage = 'No se pudo actualizar el perfil del usuario.';
        } finally {
          this.loading = false;
        }
      }
    },
    mounted() {
      this.fetchUserProfile();
    }
  };
  </script>
  
  <style scoped>
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  
  /* Ajustes adicionales para el formulario */
  .form-group label {
    font-weight: bold;
  }
  
  .btn-success {
    margin-right: 10px;
  }
  </style>
  