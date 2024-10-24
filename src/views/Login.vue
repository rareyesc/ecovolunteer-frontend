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
                  </form>
                  <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="sign-bg"></div>
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
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '' // Variable para manejar el mensaje de error
    };
  },
  methods: {
    // Validar si el formato del correo es válido
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // Función para decodificar el token JWT y extraer el rol
    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },

    async onSubmit() {
      // Eliminar cualquier token previo antes de iniciar sesión
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');

      // Validar el formato del correo electrónico
      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'El formato del correo electrónico no es válido.';
        return;
      }

      this.errorMessage = ''; 

      try {
        const loginApiUrl = `${process.env.VUE_APP_LOGIN_API_URL}`;
        console.log('Calling API:', loginApiUrl); // Verifica que la URL del login esté correcta

        const response = await fetch(loginApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
          }
          throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // Guardar el token JWT en localStorage o sessionStorage
        if (this.rememberMe) {
          localStorage.setItem('jwt_token', data.token);
        } else {
          sessionStorage.setItem('jwt_token', data.token);
        }

        // Decodificar el token JWT para obtener el rol
        const tokenData = this.parseJwt(data.token);
        const userRole = tokenData.role || 'no especificado';

        // Mostrar el rol del usuario en una alerta
        window.alert(`Login exitoso. El rol del usuario es: ${userRole}`);

      } catch (error) {
        // Mostrar mensaje de error
        this.errorMessage = error.message;
        console.error('Error:', error);
      }
    },
  },
};
</script>


<style scoped>
/* Tus estilos aquí */
</style>
