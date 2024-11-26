<!-- src/layouts/UserLayout.vue -->
<template>
    <div id="app-container">
      <!-- Sidebar -->
      <nav
        id="sidebar"
        :class="{ collapsed: isSidebarCollapsed }"
        class="bg-white"
      >
        <div
          class="d-flex align-items-center justify-content-between p-3 border-bottom border-end-0"
        >
          <router-link class="navbar-brand d-flex align-items-center" to="/indexUser">
            <img
              class="img-icon"
              :src="logoSrc"
              alt="Ecovolunteer Logo"
            />
            <h4 class="ms-2 mb-0" v-if="!isSidebarCollapsed">Ecovolunteer</h4>
          </router-link>
          <!-- Botón para colapsar el sidebar en dispositivos móviles -->
          <button
            class="btn btn-light d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse d-lg-block" id="sidebarMenu">
          <ul class="nav nav-pills flex-column p-2">
            <li class="nav-item">
              <a class="nav-link disabled" tabindex="-1">
                <span class="item-name">Home</span>
              </a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/indexUser"
                exact
              >
                <i class="bi bi-speedometer2 me-3"></i>
                <span class="item-name">Inicio</span>
              </router-link>
            </li>
            <li>
              <hr />
            </li>
            <!-- Menú para Eventos -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/misEventosUser"
                exact
              >
                <i class="bi bi-calendar-event me-3"></i>
                <span class="item-name">Mis Eventos</span>
              </router-link>
            </li>
            <!-- Puedes agregar más enlaces si es necesario -->
          </ul>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div id="main-content">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light h-62 fixed-top" id="main-navbar">
          <div class="container-fluid">
            <!-- Botón para colapsar el navbar en dispositivos móviles -->
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Contenido del navbar -->
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul
                class="navbar-nav ms-auto align-items-center mb-2 mb-lg-0"
              >
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/avatars/01.png"
                      alt="User-Profile"
                      class="rounded-circle img-avatar"
                    />
                    <div class="ms-2 d-none d-md-block">
                      <h6 class="mb-0">{{ userName }}</h6>
                    </div>
                  </a>
                  <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li><a class="dropdown-item" href="/profileUser">Perfil</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Configuración Privada</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="logout">Cerrar Sesión</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <!-- Contenido Principal -->
        <div id="content-area">
          <!-- Header -->
          <div class="header-image">
            <div class="position-relative">
              <!-- Imagen del header -->
              <img
                :src="headerImageSrc"
                alt="header"
                class="img-fluid img-header rounded-bottom-4 w-100 animated-scale"
              />
              <!-- Texto sobre la imagen -->
              <div
                class="position-absolute top-50 translate-middle text-white ms-6"
              >
                <h1>{{ titulo }}</h1>
                <p>{{ descripcion }}</p>
              </div>
            </div>
          </div>
  
          <!-- Aquí añadimos la estructura de la tarjeta -->
          <div class="content-wrapper">
            <div class="container-fluid mt-3">
              <div class="card shadow-sm border-0 rounded flex-fill d-flex">
                <div class="card-body scrollable-card-body">
                  <!-- Contenido variable -->
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Footer -->
          <footer class="bg-light mt-3">
            <div
              class="d-flex justify-content-between align-items-center p-3"
            >
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
          style="color: white; font-size: 1.2rem;"
        ></i>
      </button>
    </div>
  </template>
  
  <script>
  import { parseJwt } from '@/utils/auth';
  import logo from '@/assets/images/icono-ecovolunteer_48x48.png';
  import headerImage from '@/assets/images/dashboard/top-header-1600x250.png';
  
  export default {
    name: 'UserLayout',
    props: {
      titulo: {
        type: String,
        default: 'Bienvenido',
      },
      descripcion: {
        type: String,
        default: '¡Únete a los eventos y sé parte del cambio!',
      },
    },
    data() {
      return {
        logoSrc: logo,
        headerImageSrc: headerImage,
        currentYear: new Date().getFullYear(),
        isSidebarCollapsed: false,
        userName: '',
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
      },
      logout() {
        // Lógica para cerrar sesión
        sessionStorage.removeItem('jwt_token');
        sessionStorage.removeItem('user_role');
        this.$router.push('/login');
      },
      fetchUserName() {
        const token = sessionStorage.getItem('jwt_token');
        let role = sessionStorage.getItem('user_role');
  
        if (!token) {
          console.error('No se encontró el token JWT en el sessionStorage');
          this.$router.push('/login'); // Redirige al inicio de sesión
          return;
        }
  
        // Si no tenemos el rol en sessionStorage, intentamos obtenerlo del token
        if (!role) {
          const decodedToken = parseJwt(token);
          if (decodedToken && decodedToken.role) {
            role = decodedToken.role;
            sessionStorage.setItem('user_role', role);
          } else {
            console.error('No se pudo obtener el rol del token JWT');
            this.$router.push('/login'); // Redirige al inicio de sesión
            return;
          }
        }
  
        let endpoint = '';
        if (role === 'Volunteer') {
          endpoint = 'http://localhost:8088/api/users/me';
        } else if (role === 'Company') {
          endpoint = 'http://localhost:8081/api/companies/me';
        } else {
          console.error('Rol desconocido:', role);
          this.$router.push('/login');
          return;
        }
  
        fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('No se pudo obtener la información del usuario');
            }
          })
          .then((data) => {
            if (role === 'Volunteer') {
              this.userName = `${data.firstName} ${data.lastName}`;
            } else if (role === 'Company') {
              this.userName = data.companyName;
            }
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del usuario:', error);
            sessionStorage.removeItem('jwt_token');
            sessionStorage.removeItem('user_role');
            this.$router.push('/login');
          });
      },
    },
    mounted() {
      this.fetchUserName();
    },
  };
  </script>
  