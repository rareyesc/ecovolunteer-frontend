<template>
  <!-- Sección de Contenido -->
  <div class="col-md-9 sidebar-adjust">
    <div class="bd-cheatsheet container-fluid bg-transparent">
      <section id="components">
        <article id="accordion">
          <div class="card iq-document-card iq-doc-head border-0">
            <div class="card-body">
              <div class="d-flex justify-content-center text-color-project">
                <h4>{{ sectionTitle }}</h4>
              </div>
              <hr />
              <div class="tab-content">
                <div
                  class="tab-pane bd-heading-1 fade show active"
                  id="content-accordion-prv"
                  role="tabpanel"
                >
                  <div class="bd-example">
                    <div class="accordion" id="accordionExample">
                      <!-- Sobre nosotros -->
                      <div class="accordion-item">
                        <h5 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button bg-color-project text-color-project"
                            type="button"
                            :class="{ 'collapsed': activeSubItem !== 'sobreNosotros' }"
                            @click="selectAccordionItem('sobreNosotros')"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Sobre nosotros
                          </button>
                        </h5>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse"
                          :class="{ show: activeSubItem === 'sobreNosotros' }"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <p>
                              EcoVolunteer es una plataforma dedicada a conectar empresas y
                              personas con iniciativas de reciclaje en Bogotá. A través de
                              nuestro servicio, facilitamos el registro de voluntarios, la
                              gestión de campañas de reciclaje y la geolocalización de puntos
                              de recolección de materiales reciclables. Nuestro objetivo es
                              crear un impacto positivo en el medio ambiente, promoviendo el
                              reciclaje como una responsabilidad compartida entre la
                              ciudadanía y las organizaciones.
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- Misión -->
                      <div class="accordion-item">
                        <h5 class="accordion-header" id="headingTwo">
                          <button
                            class="accordion-button bg-color-project text-color-project"
                            type="button"
                            :class="{ 'collapsed': activeSubItem !== 'mision' }"
                            @click="selectAccordionItem('mision')"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Misión
                          </button>
                        </h5>
                        <div
                          id="collapseTwo"
                          class="accordion-collapse collapse"
                          :class="{ show: activeSubItem === 'mision' }"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <p>
                              Nuestra misión es fomentar una cultura de reciclaje y conciencia
                              ambiental mediante la participación activa de empresas y
                              ciudadanos en actividades de voluntariado. A través de una
                              plataforma innovadora, facilitamos el acceso a puntos de
                              reciclaje y ofrecemos herramientas para que los usuarios
                              contribuyan de manera efectiva a la reducción de residuos y la
                              conservación del entorno natural. 
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- Visión -->
                      <div class="accordion-item">
                        <h5 class="accordion-header" id="headingThree">
                          <button
                            class="accordion-button bg-color-project text-color-project"
                            type="button"
                            :class="{ 'collapsed': activeSubItem !== 'vision' }"
                            @click="selectAccordionItem('vision')"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Visión
                          </button>
                        </h5>
                        <div
                          id="collapseThree"
                          class="accordion-collapse collapse"
                          :class="{ show: activeSubItem === 'vision' }"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <p>
                              Ser el principal referente en Bogotá en la movilización de
                               voluntarios y empresas para el reciclaje, creando una red sólida
                               que promueva el desarrollo de una ciudad más limpia y consciente
                               de la importancia del manejo adecuado de residuos. Aspiramos a
                               expandir nuestro modelo a otras ciudades y convertirnos en una
                               plataforma clave en la transformación hacia una sociedad
                               sostenible.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentSection',
  props: {
    activeSubItem: {
      type: String,
      default: 'sobreNosotros',
    },
  },
  methods: {
    selectAccordionItem(subItemName) {
      this.$emit('update-active-sub-item', subItemName);
    },
  },
  computed: {
    sectionTitle() {
      if (['sobreNosotros', 'mision', 'vision'].includes(this.activeSubItem)) {
        return 'Conócenos';
      } else if (
        ['iniciarSesion', 'registrarse', 'contactanos'].includes(this.activeSubItem)
      ) {
        return 'Portal usuarios';
      } else {
        return '';
      }
    },
  },
};
</script>