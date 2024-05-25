<template>
  <div class="display">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.display {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  width: 403px;
  text-align: right;
  font-size: 25px;
  border-radius: 10px;
}
</style>
