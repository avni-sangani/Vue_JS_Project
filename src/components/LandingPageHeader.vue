<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { title: 'Component Communication', to: '/component_communicate', icon: 'mdi-code-braces-box' },
  { title: 'Listing Demo', to: '/listing_demo', icon: 'mdi-view-list' },
  { title: 'Form Demo', to: '/form_demo', icon: 'mdi-form-select' }
])
</script>

<template>
  <v-container class="main_listing_section" fluid>
    <v-card>
      <v-layout>
        <v-navigation-drawer location="left" permanent :width="300">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="Frontend Developer"
              title="Avni Sangani"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav class="main_list">
            <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon color="secondary">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="font-bold">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </v-container>
</template>

<style scoped>
:deep(.v-list-item-title) {
  font-size: 15px;
  font-weight: bold;
}

:deep(.main_list .v-list-item__content) {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
