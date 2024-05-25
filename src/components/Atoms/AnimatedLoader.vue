<template>
  <div class="animated_loader">
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#085796"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  setup(props) {
    const overlay = true
    return {
      overlay
    }
  }
}
</script>

<style scoped>
.animated_loader {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
