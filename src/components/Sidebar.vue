<!-- Sidebar.vue -->
<template>
  <aside class="col-md-3 sidebar-adjust">
    <div class="card iq-document-card sticky-xl-top border-0">
      <div class="card-header text-color-project border-0 bg-white">
        <h6 class="mb-0">En esta página</h6>
      </div>
      <div class="card-body">
        <nav class="small" id="elements-section">
          <ul class="list-group list-group-flush">
            <!-- Sección Conócenos -->
            <li class="list-group-item">
              <div
                class="d-flex align-items-center section-header"
                :class="{ 'bg-color-project text-color-project': isActiveSection('conocenos') }"
                @click="toggleSection('conocenos')"
                role="button"
              >
                <i
                  class="bi bi-caret-right-fill me-1"
                  :class="{ 'rotated': !isSectionCollapsed('conocenos') }"
                ></i>
                <span>Conócenos</span>
              </div>
              <ul
                class="list-unstyled ps-3 collapse"
                :class="{ show: !isSectionCollapsed('conocenos') }"
                id="conocenosCollapse"
              >
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('sobreNosotros', 'conocenos')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('sobreNosotros') }"
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('mision', 'conocenos')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('mision') }"
                  >
                    Misión
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('vision', 'conocenos')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('vision') }"
                  >
                    Visión
                  </a>
                </li>
              </ul>
            </li>
            <!-- Sección Portal Usuarios -->
            <li class="list-group-item">
              <div
                class="d-flex align-items-center section-header"
                :class="{ 'bg-color-project text-color-project': isActiveSection('portalUsuarios') }"
                @click="toggleSection('portalUsuarios')"
                role="button"
              >
                <i
                  class="bi bi-caret-right-fill me-1"
                  :class="{ 'rotated': !isSectionCollapsed('portalUsuarios') }"
                ></i>
                <span>Portal usuarios</span>
              </div>
              <ul
                class="list-unstyled ps-3 collapse"
                :class="{ show: !isSectionCollapsed('portalUsuarios') }"
                id="portalUsuariosCollapse"
              >
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('iniciarSesion', 'portalUsuarios')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('iniciarSesion') }"
                  >
                    Iniciar sesión
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('registrarse', 'portalUsuarios')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('registrarse') }"
                  >
                    Registrarse
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link ps-3 my-2"
                    href="#"
                    @click.prevent="selectSubItem('contactanos', 'portalUsuarios')"
                    :class="{ 'bg-color-project text-color-project': isActiveSubItem('contactanos') }"
                  >
                    Contáctanos
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  props: {
    activeSection: {
      type: String,
      default: 'conocenos',
    },
    activeSubItem: {
      type: String,
      default: 'sobreNosotros',
    },
  },
  methods: {
    isActiveSection(sectionName) {
      return this.activeSection === sectionName;
    },
    isSectionCollapsed(sectionName) {
      return this.activeSection !== sectionName;
    },
    toggleSection(sectionName) {
      if (this.activeSection === sectionName) {
        // Si la sección ya está activa, la colapsamos
        this.$emit('update-active-section', null);
      } else {
        // De lo contrario, la expandimos y actualizamos el subítem activo
        this.$emit('update-active-section', sectionName);
        if (sectionName === 'conocenos') {
          this.$emit('update-active-sub-item', 'sobreNosotros');
        } else if (sectionName === 'portalUsuarios') {
          this.$emit('update-active-sub-item', 'iniciarSesion');
        }
      }
    },
    isActiveSubItem(subItemName) {
      return this.activeSubItem === subItemName;
    },
    selectSubItem(subItemName, sectionName) {
      this.$emit('update-active-sub-item', subItemName);
      this.$emit('update-active-section', sectionName);
    },
  },
};
</script>