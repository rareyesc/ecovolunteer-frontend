<template>
  <div id="app-container">
    <!-- Sidebar -->
    <nav
      id="sidebar"
      :class="{ collapsed: isSidebarCollapsed }"
      class="bg-white"
    >
      <!-- ...Contenido del sidebar... -->
    </nav>

    <!-- Main Content -->
    <div id="main-content">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="main-navbar">
        <!-- ...Contenido del navbar... -->
      </nav>

      <!-- Contenido Principal -->
      <div id="content-area" class="pt-5">
        <!-- Header -->
        <div class="header-image mb-4">
          <div class="position-relative">
            <!-- Imagen del header -->
            <img
              src="../assets/images/dashboard/top-header-1600x250.png"
              alt="header"
              class="img-fluid img-header rounded-bottom-4 w-100 animated-scale"
            />
            <!-- Texto sobre la imagen -->
            <div
              class="position-absolute top-50 start-50 translate-middle text-white text-center"
            >
              <h1>{{ titulo }}</h1>
              <p>{{ descripcion }}</p>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card shadow-sm border-0 rounded">
                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 class="card-title text-dark fw-bold mb-0">Perfil de la Compañía</h5>
                  <div class="d-flex align-items-center">
                    <!-- Botón de Editar Visible Solo en Modo No Editable -->
                    <button
                      v-if="!isEditable"
                      type="button"
                      class="btn btn-link text-primary me-3"
                      @click="toggleEdit"
                      title="Editar Perfil"
                    >
                      <i class="bi bi-pencil-fill" style="font-size: 1.6rem;"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateCompany">
                    <div class="row">
                      <!-- Nombre de la Compañía -->
                      <div class="col-12 mb-3">
                        <div class="form-group">
                          <label for="companyName" class="form-label">Nombre de la Compañía</label>
                          <input
                            type="text"
                            class="form-control"
                            id="companyName"
                            v-model="company.companyName"
                            :disabled="!isEditable"
                            placeholder="Ingrese el nombre de la compañía"
                            required
                          />
                          <small class="text-danger" v-if="errors.companyName">{{ errors.companyName }}</small>
                        </div>
                      </div>
                      <!-- NIT (Solo Lectura) -->
                      <div class="col-12 mb-3">
                        <div class="form-group">
                          <label for="nit" class="form-label">NIT</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nit"
                            v-model="company.nit"
                            :disabled="true"
                            placeholder="NIT de la compañía"
                            readonly
                          />
                        </div>
                      </div>
                      <!-- Número de Teléfono -->
                      <div class="col-12 mb-3">
                        <div class="form-group">
                          <label for="phoneNumberCompany" class="form-label">Número de Teléfono</label>
                          <input
                            type="text"
                            class="form-control"
                            id="phoneNumberCompany"
                            v-model="company.phoneNumber"
                            :disabled="!isEditable"
                            placeholder="Ingrese el teléfono de la compañía"
                            required
                          />
                          <small class="text-danger" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</small>
                        </div>
                      </div>
                    </div>
                    <!-- Botones de Acción Solo en Modo Editable -->
                    <div v-if="isEditable" class="d-flex justify-content-end mt-4">
                      <button type="submit" class="btn btn-success me-2">
                        Guardar
                      </button>
                      <button type="button" class="btn btn-secondary" @click="cancelEdit">
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <footer class="bg-light mt-5">
            <div class="d-flex justify-content-between align-items-center p-3">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a href="#">Políticas de privacidad</a>
                </li>
                <li class="list-inline-item"><a href="#">Términos de uso</a></li>
              </ul>
              <div>
                ©{{ currentYear }} Ecovolunteer, Hecho por Ecovolunteer.
              </div>
            </div>
          </footer>
        </div>
      </div>

      <!-- Botón para colapsar el sidebar -->
      <button
        class="btn toggle-button"
        @click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        <i
          class="bi"
          :class="isSidebarCollapsed ? 'bi-arrow-right' : 'bi-arrow-left'"
        ></i>
      </button>

      <!-- Modal de Errores -->
      <div
        class="modal fade"
        tabindex="-1"
        ref="errorModal"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
      >
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
      <div
        class="modal fade"
        tabindex="-1"
        ref="successModal"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog mt-5">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">¡Actualización Exitosa!</h5>
              <button type="button" class="btn-close" @click="closeSuccessModal"></button>
            </div>
            <div class="modal-body">
              <p>Cambios guardados correctamente.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="closeSuccessModal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profileApiClient } from '@/services/api';

export default {
  name: 'PerfilCompany',
  data() {
    return {
      isEditable: false,
      company: {
        companyName: '',
        nit: '',
        phoneNumber: '',
      },
      errors: {},
      errorModalInstance: null,
      successModalInstance: null,
      titulo: 'Perfil Compañía',
      descripcion: 'Esta es la página de perfil de la compañía logeada',
      currentYear: new Date().getFullYear(),
      isSidebarCollapsed: false,
    };
  },
  methods: {
    async fetchCompanyData() {
      try {
        console.log('Realizando solicitud POST a /http_trigger con cuerpo:', { is_update: false });
        const response = await profileApiClient.post('/http_trigger', {
          is_update: false,
        });
        console.log('Respuesta de la solicitud:', response);
        if (response.status === 200) {
          const data = response.data.company_data;
          console.log('Datos recibidos del backend:', data);
          this.company = {
            companyName: data.company_name || '',
            nit: data.nit || '',
            phoneNumber: data.phone_number || '',
          };
        } else {
          throw new Error('Error al obtener los datos de la compañía.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la compañía:', error);
        this.errors.general = 'No se pudieron obtener los datos de la compañía.';
        this.showErrorsModal();
      }
    },
    toggleEdit() {
      this.isEditable = true;
    },
    cancelEdit() {
      this.isEditable = false;
      this.fetchCompanyData(); // Re-cargar los datos para descartar cambios
    },
    async updateCompany() {
      try {
        // Validar el formulario antes de enviar
        if (!this.validateForm()) {
          this.showErrorsModal();
          return;
        }

        // Crear el objeto de actualización con nombres de columnas exactos
        const updateData = {
          is_update: true,
          new_data: {
            company_name: this.company.companyName,
            phone_number: this.company.phoneNumber,
          },
        };

        console.log('Enviando datos de actualización:', updateData);

        // Realizar la solicitud POST al endpoint correcto
        const response = await profileApiClient.post('/http_trigger', updateData);

        console.log('Respuesta de la actualización:', response);

        if (response.status === 200) {
          const data = response.data.company_data;
          console.log('Datos recibidos del backend:', data);
          this.company = {
            companyName: data.company_name || '',
            nit: data.nit || '',
            phoneNumber: data.phone_number || '',
          };
          this.isEditable = false;
          this.showSuccessModal();
        } else {
          throw new Error('Error al actualizar los datos de la compañía.');
        }
      } catch (error) {
        console.error('Error al actualizar la compañía:', error);
        this.errors.general = 'No se pudieron actualizar los datos de la compañía.';
        this.showErrorsModal();
      }
    },
    validateForm() {
      this.errors = {};

      if (!this.company.companyName) {
        this.errors.companyName = 'El nombre de la compañía es obligatorio.';
      }

      if (!this.company.phoneNumber) {
        this.errors.phoneNumber = 'El número de teléfono es obligatorio.';
      } else if (!/^\d{7,10}$/.test(this.company.phoneNumber)) {
        this.errors.phoneNumber = 'El número de teléfono no es válido.';
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
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
    downloadProfile() {
      // Implementa la lógica para descargar el perfil, por ejemplo, generar un PDF
      // Aquí solo se muestra un mensaje de ejemplo
      alert('Funcionalidad de descarga no implementada aún.');
    },
  },
  mounted() {
    this.fetchCompanyData();
  },
};
</script>

<style scoped>
/* Centrar la tarjeta y ajustar su ancho */
#content-area .card {
  margin: 0 auto;
  max-width: 800px;
}

/* Ajustar elementos del formulario */
.form-group label {
  font-weight: 500;
}

.form-control:disabled {
  background-color: #f8f9fa;
  opacity: 1;
}

/* Estilizar los botones de opciones en el header */
.card-header .btn-link {
  color: #0d6efd;
  text-decoration: none;
}

.card-header .btn-link:hover {
  color: #0a58ca;
  text-decoration: none;
}

.card-header .btn-link i {
  transition: transform 0.2s;
}

.card-header .btn-link:hover i {
  transform: scale(1.2);
}

/* Añadir espacio al contenido de la tarjeta */
.card-body {
  padding: 2rem;
}

.card-header h5 {
  font-size: 1.5rem;
}

/* Ajustar la imagen del header */
.header-image img {
  height: 250px;
  object-fit: cover;
}

/* Ajustar la posición del texto del header */
.header-image .position-absolute {
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .header-image .position-absolute {
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}

/* Estilizar el botón de colapsar el sidebar */
.toggle-button {
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 1000;
  background-color: #0d6efd;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
}

.toggle-button i {
  color: white;
  font-size: 1.2rem;
}

/* Mejorar la apariencia de los botones de opciones */
.card-header .btn-link {
  display: flex;
  align-items: center;
}

.card-header .btn-link i {
  margin-right: 0.5rem;
}

/* Aumentar el tamaño del ícono de editar */
.card-header .bi-pencil-fill {
  font-size: 1.6rem;
}

/* Aumentar el tamaño del ícono de guardar */
.btn-success .bi-save-fill {
  font-size: 1.2rem;
}

/* Aumentar el tamaño del ícono de cancelar */
.btn-secondary .bi-x-circle {
  font-size: 1.2rem;
}

/* Mejorar la apariencia de los botones de acción */
.btn-success, .btn-secondary {
  display: flex;
  align-items: center;
}

.btn-success i, .btn-secondary i {
  font-size: 1.2rem;
}
</style>
