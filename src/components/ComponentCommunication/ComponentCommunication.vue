<!-- src/App.vue -->
<template>
  <v-container class="d-flex justify-center flex-column">
    <h1 style="color: rgb(72, 169, 166)" class="text-center">Component Communication</h1>
    <CalculatorParent />
  </v-container>
</template>

<script>
import CalculatorParent from './ParentComponent/CalculatorParent.vue'

export default {
  components: {
    CalculatorParent
  }
}
</script>
