<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button @click="onClose">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['message'],
    data() {
      return {
        isVisible: true,
      };
    },
    methods: {
      onClose() {
        this.isVisible = false;
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  </style>
  