<template>
  <button @click="handleClick">{{ value }}</button>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('button-clicked', props.value.toString())
    }

    return {
      handleClick
    }
  }
}
</script>
