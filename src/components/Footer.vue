<template>
    <footer class="footer bg-light py-3">
      <div class="container d-flex justify-content-between">
        <ul class="list-inline mb-0">
          <li class="list-inline-item"><a href="#">Políticas de privacidad</a></li>
          <li class="list-inline-item"><a href="#">Términos de uso</a></li>
        </ul>
        <div>
          ©{{ currentYear }} Ecovolunteer, Hecho por Ecovolunteer.
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>