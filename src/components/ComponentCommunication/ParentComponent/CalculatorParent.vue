<template>
  <v-container>
    <div class="calculator">
      <div class="sub_container">
        <CalculatorDisplay :message="message" />
        <div class="buttons">
          <CalculatorButton :value="1" @button-clicked="appendValue" />
          <CalculatorButton :value="2" @button-clicked="appendValue" />
          <CalculatorButton :value="3" @button-clicked="appendValue" />
          <CalculatorOperation operation="+" @operation-clicked="appendValue" class="operator" />

          <CalculatorButton :value="4" @button-clicked="appendValue" />
          <CalculatorButton :value="5" @button-clicked="appendValue" />
          <CalculatorButton :value="6" @button-clicked="appendValue" />
          <CalculatorOperation operation="-" @operation-clicked="appendValue" class="operator" />

          <CalculatorButton :value="7" @button-clicked="appendValue" />
          <CalculatorButton :value="8" @button-clicked="appendValue" />
          <CalculatorButton :value="9" @button-clicked="appendValue" />
          <CalculatorOperation operation="*" @operation-clicked="appendValue" class="operator" />

          <CalculatorOperation operation="/" @operation-clicked="appendValue" class="operator" />
          <CalculatorButton :value="0" @button-clicked="appendValue" />
          <button class="total" @click="calculate">=</button>
          <button @click="clear" class="clear">AC</button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import CalculatorDisplay from '@/components/ComponentCommunication/ChildComponent/CalculatorDisplay.vue'
import CalculatorButton from '@/components/ComponentCommunication/ChildComponent/CalculatorButton.vue'
import CalculatorOperation from '@/components/ComponentCommunication/ChildComponent/CalculatorOperation.vue'

export default {
  components: {
    CalculatorDisplay,
    CalculatorButton,
    CalculatorOperation
  },
  setup() {
    const input = ref('0')

    const appendValue = (value) => {
      if (input.value === '0' && value !== '0') {
        input.value = value
      } else {
        input.value = input.value.replace(/^0+(?=\d)/, '') + value
      }
    }

    const sanitizeInput = (input) => {
      // Replace any number with leading zeros with the correct format
      return input.replace(/(^|\D)0+(?=\d)/g, '$1')
    }

    const calculate = () => {
      try {
        const sanitizedInput = sanitizeInput(input.value)
        input.value = eval(sanitizedInput).toString()
      } catch (e) {
        input.value = 'Error'
      }
    }

    const clear = () => {
      input.value = '0'
    }

    const message = computed(() => input.value)

    return {
      appendValue,
      calculate,
      clear,
      message
    }
  }
}
</script>

<style scoped>
@import url('@/assets/Css/calculatorparent.css');
</style>
