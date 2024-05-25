<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const totalPages = computed(() => Math.ceil(store.state.totalUsers / store.state.perPage))

watch(
  () => store.state.currentPage,
  (newPage) => {
    store.dispatch('fetchUsers')
  }
)
</script>

<template>
  <v-pagination v-model="store.state.currentPage" :length="totalPages" rounded="0"></v-pagination>
</template>
