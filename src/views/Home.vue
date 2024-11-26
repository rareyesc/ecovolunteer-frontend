<!-- Home.vue -->
<template>
  <div class="wrapper">
    <!-- Header Wrapper con Imagen de Fondo -->
    <div class="header-wrapper">
      <!-- Navbar -->
      <Navbar />

      <!-- Header -->
      <HeaderSection />
    </div>

    <!-- Contenido Principal -->
    <div class="container mt-0 mb-5">
      <div class="row row-adjust">
        <!-- Sidebar -->
        <Sidebar
          :active-section="activeSection"
          :active-sub-item="activeSubItem"
          @update-active-section="updateActiveSection"
          @update-active-sub-item="updateActiveSubItem"
        />

        <!-- Sección de Contenido -->
        <ContentSection
          :active-sub-item="activeSubItem"
          @update-active-sub-item="updateActiveSubItem"
        />
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import ContentSection from '@/components/Content.vue';
import HeaderSection from '@/components/Header.vue';

export default {
  name: 'indexHome',
  components: {
    Navbar,
    FooterComponent,
    Sidebar,
    ContentSection,
    HeaderSection,
  },
  data() {
    return {
      activeSection: 'conocenos', // Sección activa por defecto
      activeSubItem: 'sobreNosotros', // Subítem activo por defecto
    };
  },
  methods: {
    updateActiveSection(section) {
      this.activeSection = section;
    },
    updateActiveSubItem(subItem) {
      this.activeSubItem = subItem;
    },
  },
};
</script>