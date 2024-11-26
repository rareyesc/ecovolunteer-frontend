<template>
  <CompanyLayout
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

              <form @submit.prevent="updateCompany">
                <!-- Campos del Formulario -->
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label for="companyName" class="form-label">Nombre de la Compañía</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="companyName" 
                        v-model="company.company_name" 
                        :disabled="!isEditable" 
                        placeholder="Ingrese el nombre de la compañía" 
                        required
                        @blur="validateCompanyName"
                      >
                      <small class="text-danger" v-if="formErrors.company_name">{{ formErrors.company_name }}</small>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label for="nit" class="form-label">NIT</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="nit" 
                        v-model="company.nit" 
                        disabled 
                        placeholder="NIT de la compañía" 
                      >
                      <!-- No se valida NIT ya que está deshabilitado -->
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label for="phoneNumberCompany" class="form-label">Número de Teléfono</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="phoneNumberCompany" 
                        v-model="company.phone_number" 
                        :disabled="!isEditable" 
                        placeholder="Ingrese el teléfono de la compañía" 
                        required
                        @blur="validatePhoneNumber"
                      >
                      <small class="text-danger" v-if="formErrors.phone_number">{{ formErrors.phone_number }}</small>
                    </div>
                  </div>
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
  </CompanyLayout>
</template>

<script>
import CompanyLayout from '@/layouts/CompanyLayout.vue';
import { profileApiClient, getToken } from '@/services/api.js';

export default {
  name: 'profileCompany',
  components: {
    CompanyLayout,
  },
  data() {
    return {
      tituloHeader: 'Perfil Compañías',
      descripcionHeader: 'Esta es la página principal de las compañías',
      company: {
        company_id: null,
        account_id: null,
        company_name: '',
        nit: '',
        phone_number: '', // Usar phone_number
        created_at: '',
        updated_at: ''
      },
      isEditable: false,
      loading: false, // Estado de carga
      errorMessage: '', // Mensaje de error
      successMessage: '', // Mensaje de éxito
      formErrors: { // Objeto para errores de validación
        company_name: '',
        phone_number: ''
      }
    };
  },
  computed: {
    isFormValid() {
      // Verifica que no haya mensajes de error y que los campos requeridos no estén vacíos
      return (
        this.company.company_name.trim() !== '' &&
        this.company.phone_number.trim() !== '' &&
        this.formErrors.company_name === '' &&
        this.formErrors.phone_number === ''
      );
    }
  },
  methods: {
    toggleEdit() {
      this.isEditable = true;
    },

    validateForm() {
      let isValid = true;

      // Resetear errores
      this.formErrors.company_name = '';
      this.formErrors.phone_number = '';

      // Validar company_name: Solo letras, espacios, & y -
      const companyNameRegex = /^[A-Za-z&\- ]+$/;
      if (!this.company.company_name.trim()) {
        this.formErrors.company_name = 'El nombre de la compañía es obligatorio.';
        isValid = false;
      } else if (!companyNameRegex.test(this.company.company_name)) {
        this.formErrors.company_name = 'El nombre solo puede contener letras, espacios, & y -.';
        isValid = false;
      }

      // Validar phone_number: Solo números
      const phoneNumberRegex = /^[0-9]+$/;
      if (!this.company.phone_number.trim()) {
        this.formErrors.phone_number = 'El número de teléfono es obligatorio.';
        isValid = false;
      } else if (!phoneNumberRegex.test(this.company.phone_number)) {
        this.formErrors.phone_number = 'El número de teléfono solo puede contener números.';
        isValid = false;
      }

      return isValid;
    },

    validateCompanyName() {
      const companyNameRegex = /^[A-Za-z&\- ]+$/;
      if (!this.company.company_name.trim()) {
        this.formErrors.company_name = 'El nombre de la compañía es obligatorio.';
      } else if (!companyNameRegex.test(this.company.company_name)) {
        this.formErrors.company_name = 'El nombre solo puede contener letras, espacios, & y -.';
      } else {
        this.formErrors.company_name = '';
      }
    },

    validatePhoneNumber() {
      const phoneNumberRegex = /^[0-9]+$/;
      if (!this.company.phone_number.trim()) {
        this.formErrors.phone_number = 'El número de teléfono es obligatorio.';
      } else if (!phoneNumberRegex.test(this.company.phone_number)) {
        this.formErrors.phone_number = 'El número de teléfono solo puede contener números.';
      } else {
        this.formErrors.phone_number = '';
      }
    },

    async fetchCompanyProfile() {
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
        console.log(`Making POST request to ${profileApiClient.defaults.baseURL}${endpoint}`);

        const response = await profileApiClient.post(endpoint, {
          is_update: false, // Indica que solo se desea obtener datos
          new_data: null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Response Data:', response.data); // Añadir este log

        if (response.status === 200) {
          this.company = response.data.company_data;
          this.successMessage = 'Perfil obtenido exitosamente.';
        }
      } catch (error) {
        console.error('Error al obtener el perfil de la compañía:', error);
        this.errorMessage = 'No se pudo cargar el perfil de la compañía.';
      } finally {
        this.loading = false;
      }
    },

    async updateCompany() {
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

        // Preparar los datos a actualizar con el nombre correcto del campo
        const updatedData = {
          company_name: this.company.company_name,
          phone_number: this.company.phone_number // Usar phone_number
        };

        const endpoint = '/http_trigger';
        console.log(`Making POST request to ${profileApiClient.defaults.baseURL}${endpoint}`);

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
          this.company = response.data.company_data;
        }
      } catch (error) {
        console.error('Error al actualizar el perfil de la compañía:', error);
        this.errorMessage = 'No se pudo actualizar el perfil de la compañía.';
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchCompanyProfile();
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

/* Opcional: Ajustes adicionales para el formulario */
.form-group label {
  font-weight: bold;
}

.btn-success {
  margin-right: 10px;
}
</style>
