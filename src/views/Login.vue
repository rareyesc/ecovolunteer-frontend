<template>
  <div class="wrapper vh-100">
    <section class="login-content h-100">
      <div class="row m-0 align-items-stretch h-100">
        <!-- Columna de imagen lateral -->
        <div class="col-md-6 d-md-block d-none p-0 vh-100 overflow-hidden">
          <img
            src="@/assets/images/auth/01-fondo.jpg"
            class="img-fluid h-100 w-100"
            alt="Fondo"
            style="object-fit: cover;"
          />
        </div>
        <!-- Contenido principal de inicio de sesión -->
        <div class="col-md-6 d-flex align-items-center form-container">
          <div class="row justify-content-center w-100">
            <div class="col-md-11">
              <div class="card bg-transparent shadow-none d-flex justify-content-center mb-0 p-4 border-0">
                <div class="card-body">
                  <!-- Logo y título -->
                  <a class="navbar-brand d-flex align-items-center mb-3">
                    <div class="logo-main">
                      <div class="logo-normal">
                        <img src="@/assets/images/icono-ecovolunteer_48x48.png" class="img-fluid" alt="Logo" />
                      </div>
                    </div>
                    <h4 class="logo-title ms-3">EcoVolunteer</h4>
                  </a>
                  <h2 class="mb-2 text-center">Iniciar Sesión</h2>
                  <p class="text-center">Ingresa para mantenerte conectado.</p>
                  <!-- Formulario -->
                  <form @submit.prevent="onSubmit">
                    <div class="row">
                      <div class="col-lg-12 mt-4">
                        <InputField
                          label="Correo Electrónico"
                          type="email"
                          id="email"
                          v-model="email"
                          placeholder="Correo Electrónico"
                        />
                      </div>
                      <div class="col-lg-12 mt-4">
                        <InputField
                          label="Contraseña"
                          type="password"
                          id="password"
                          v-model="password"
                          placeholder="Contraseña"
                        />
                      </div>
                      <div class="col-lg-12 d-flex justify-content-between mt-3">
                        <div class="form-check mb-3">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck1"
                            v-model="rememberMe"
                          />
                          <label class="form-check-label" for="customCheck1">Recordarme</label>
                        </div>
                        <router-link to="#">¿Olvidaste tu contraseña?</router-link>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                    </div>
                  </form>
                  <div class="mt-4">
                    <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
                    <p class="mt-3 text-center">
                      ¿No tienes una cuenta?
                      <router-link to="/register" class="text-underline">Registrarse</router-link>
                    </p>
                    <p class="text-center">
                      Volver a la página
                      <router-link to="/" class="text-underline">Principal</router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { login } from '@/services/auth/authService';
import { parseJwt } from '@/utils/jwtUtils';
import { validateEmail } from '@/utils/validationUtils';
import InputField from '@/components/auth/InputField.vue';

export default {
  name: 'LoginPage',
  components: {
    InputField,
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
    };
  },
  methods: {
    async onSubmit() {
      // Eliminar cualquier token previo antes de iniciar sesión
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');

      // Validar el formato del correo electrónico
      if (!validateEmail(this.email)) {
        this.errorMessage = 'El formato del correo electrónico no es válido.';
        return;
      }

      this.errorMessage = '';

      try {
        // Llamar al servicio de autenticación
        const data = await login(this.email, this.password, this.rememberMe);

        // Guardar el token JWT en localStorage o sessionStorage
        if (this.rememberMe) {
          localStorage.setItem('jwt_token', data.token);
        } else {
          sessionStorage.setItem('jwt_token', data.token);
        }

        // Decodificar el token JWT para obtener el rol
        const tokenData = parseJwt(data.token);
        const userRole = tokenData.role || 'no especificado';

        // Redirigir a la nueva vista basado en el rol
        if (userRole === 'Admin') {
          this.$router.push({ name: 'indexAdmin' });
        } else if (userRole === 'Volunteer') {
          this.$router.push({ name: 'indexUser' });
        } else if (userRole === 'Company') {
          this.$router.push({ name: 'indexCompany' });
        } else {
          // Si el rol no coincide con ninguno conocido
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        // Manejo de errores
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña.';
        } else {
          this.errorMessage = 'Error al iniciar sesión';
        }
        console.error('Error:', error);
      }
    },
  },
};
</script>