<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Pagination from './Pagination.vue'
import AnimatedLoader from '@/components/Atoms/AnimatedLoader.vue'

const store = useStore()
const searchQuery = ref('')
const filters = ref({
  id: '',
  title: '',
  completed: '',
  userId: ''
})

const onSearch = () => {
  store.commit('setSearchQuery', searchQuery.value)
  store.dispatch('fetchUsers')
}

const onFilterChange = () => {
  store.commit('setFilters', filters.value)
  store.dispatch('fetchUsers')
}
const loading = computed(() => store.state.loading)

onMounted(() => {
  store.dispatch('fetchUsers')
})

watch(searchQuery, () => {
  onSearch()
})

watch(filters, () => {
  onFilterChange()
})

const paginatedUsers = computed(() => {
  const startIndex = (store.state.currentPage - 1) * store.state.perPage
  const endIndex = startIndex + store.state.perPage
  return store.state.users.slice(startIndex, endIndex)
})
</script>

<template>
  <v-row class="d-flex justify-center">
    <v-card width="600">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-view-list" variant="text"></v-btn>

        <v-toolbar-title>Listing Demo</v-toolbar-title>
        <div class="serarch_box_section">
          <v-text-field
            v-model.trim="searchQuery"
            append-inner-icon="mdi-magnify"
            placeholder="Search users here.."
            single-line
            hide-details
            variant="solo"
            density="compact"
          ></v-text-field>
        </div>
      </v-toolbar>
      <div v-if="loading" class="d-flex justify-center align-center animated_loader">
        <v-progress-circular
          :size="40"
          :width="7"
          color="secondary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <v-list v-if="paginatedUsers?.length" lines="two">
          <v-list-item
            v-for="user in paginatedUsers"
            :key="user.id"
            :title="user.title"
            class="text-start"
          >
            <template v-slot:prepend>
              <v-avatar color="secondary font-bold">
                {{ user.id }}
              </v-avatar>
            </template>

            <template v-slot:append>
              <v-chip class="ma-2"> {{ user.completed }} </v-chip>
            </template>
          </v-list-item>
        </v-list>
        <div v-else>
          <h2 class="text-center my-10">Data Not Found !!!</h2>
        </div>
        <Pagination />
      </div>
    </v-card>
    <div class="mx-5 px-3">
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn color="success" v-bind="props" size="x-large" rounded="lg"> Filter By </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <p>Filter by id</p>
              <div class="serarch_box_section">
                <v-text-field
                  v-model.trim="filters.id"
                  append-inner-icon="mdi-magnify"
                  placeholder="search here.."
                  single-line
                  hide-details
                  variant="outlined"
                  density="compact"
                  @update:modelValue="onFilterChange"
                ></v-text-field>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <p>Filter by user id</p>
              <div class="serarch_box_section">
                <v-text-field
                  v-model.trim="filters.userId"
                  append-inner-icon="mdi-magnify"
                  placeholder="search here.."
                  single-line
                  hide-details
                  variant="outlined"
                  density="compact"
                  @update:modelValue="onFilterChange"
                ></v-text-field>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <p>Filter by title</p>
              <v-text-field
                v-model.trim="filters.title"
                append-inner-icon="mdi-magnify"
                placeholder="search here.."
                single-line
                hide-details
                variant="outlined"
                density="compact"
                @update:modelValue="onFilterChange"
              ></v-text-field>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <p>Filter by completed status</p>
              <v-text-field
                v-model.trim="filters.completed"
                append-inner-icon="mdi-magnify"
                placeholder="search here.."
                single-line
                hide-details
                variant="outlined"
                density="compact"
                @update:modelValue="onFilterChange"
              ></v-text-field>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-row>
</template>

<style scoped>
.serarch_box_section {
  width: 300px;
  margin-right: 5px;
}
.animated_loader {
  padding: 120px !important;
}
</style>
