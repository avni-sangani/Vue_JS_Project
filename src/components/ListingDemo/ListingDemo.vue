<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Pagination from './Pagination.vue'

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
const itemsPerPage = ref(store?.state?.perPage)
const totalUsers = ref(store?.state?.totalUsers)

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
  <v-container>
    <v-row class="d-flex justify-start">
      <v-card style="width: 70%">
        <v-toolbar color="secondary">
          <v-btn icon="mdi-view-list" variant="text"></v-btn>

          <v-toolbar-title>Users Listing Demo</v-toolbar-title>
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
        <div>
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="paginatedUsers"
            :loading="loading"
            item-value="id"
            class="mb-4"
            disable-sort
            @update:options="store.dispatch('fetchUsers')"
          >
            <template v-slot:item.address="{ item }">
              <p>{{ item?.address?.city }}</p>
            </template>
            <template v-slot:item.company="{ item }">
              <p>{{ item?.company?.name }}</p>
            </template>
            <template v-slot:no-data>
              <div class="text-center py-10">
                <v-icon color="secondary" size="60">mdi-history</v-icon>
                <p class="my-2" style="color: grey">Currently no data available for users</p>
              </div>
            </template>
          </v-data-table-server>

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
                <p>Filter by user id</p>
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
                <p>Filter by name</p>
                <v-text-field
                  v-model.trim="filters.name"
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
                <p>Filter by username</p>
                <v-text-field
                  v-model.trim="filters.username"
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
                <p>Filter by email</p>
                <div class="serarch_box_section">
                  <v-text-field
                    v-model.trim="filters.email"
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
          </v-list>
        </v-menu>
      </div>
    </v-row>
  </v-container>
</template>

<style scoped>
.serarch_box_section {
  width: 300px;
  margin-right: 5px;
}
:deep(.v-data-table-footer) {
  display: none;
}
:deep(.v-data-table__thead) {
  font-weight: bolder !important;
  color: #212529;
  white-space: nowrap;
  background: #f0f2fb;
  height: 50px;
  font-size: 16px;
}
</style>
