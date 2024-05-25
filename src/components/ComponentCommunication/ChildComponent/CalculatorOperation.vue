<template>
  <button @click="handleClick">{{ operation }}</button>
</template>

<script>
export default {
  props: {
    operation: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('operation-clicked', props.operation)
    }

    return {
      handleClick
    }
  }
}
</script>
