<!-- src/App.vue -->
<template>
  <div id="app">
    <h1 style="color: rgb(72, 169, 166)" class="text-center">Component Communication</h1>
    <CalculatorParent />
  </div>
</template>

<script>
import CalculatorParent from './ParentComponent/CalculatorParent.vue'

export default {
  components: {
    CalculatorParent
  }
}
</script>
