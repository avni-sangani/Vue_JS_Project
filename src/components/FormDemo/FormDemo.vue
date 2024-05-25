<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import moment from 'moment'

/*Validation schema*/
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    PERSON_NAME(value) {
      if (!value) {
        return 'Please enter your name'
      } else if (value.replace(/\s/g, '').length < 2) {
        return 'Please enter valid name'
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        return 'Name should only contain letters'
      } else if (value.length > 50) {
        return 'Name cannot exceed 50 characters.'
      } else {
        return true
      }
    },
    PERSON_DOB(value) {
      if (userData.value.IS_PERSON_MINOR == 'true') {
        if (!value || value.length === 0) {
          return 'Please enter your birth date'
        } else if (/\s/.test(value)) {
          return 'Date of Birth number must not contain spaces.'
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          return 'PPlease enter a valid birth date. (MM/DD/YYYY)'
        }
      }
      return true
    }
  }
})

const userData = ref({
  PERSON_NAME: useField('PERSON_NAME'),
  PERSON_DOB: useField('PERSON_DOB'),
  IS_PERSON_MINOR: false
})

const menu1 = ref(false)
const date = ref()
const snackbar = ref(false)
const timeout = ref(2000)

const computedDateFormattedMomentjs = () => {
  userData.value.PERSON_DOB.value = date.value ? moment(date.value).format('MM/DD/YYYY') : ''
  menu1.value = false
  return userData.value.PERSON_DOB.value
}

watch(date, (val) => {
  if (val) {
    computedDateFormattedMomentjs()
  }
})

const submit = handleSubmit(async () => {
  snackbar.value = true
})
</script>

<template>
  <v-container class="d-flex justify-center align-center flex-column">
    <h1 class="text-center my-5" style="color: rgb(72, 169, 166)">User Form</h1>
    <v-form fast-fail @submit.prevent="submit" class="form_section">
      <v-row>
        <v-col lg="12" md="12" cols="12">
          <p class="text-start">Enter your name*</p>
          <v-text-field
            v-model="userData.PERSON_NAME.value"
            :error-messages="userData.PERSON_NAME.errorMessage"
            clear-icon="text_input"
            variant="outlined"
            placeholder="e.g. John Doe*"
            id="PERSON_NAME"
            class="PERSON_NAME"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <p class="text-start">Enter your DOB*</p>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            auto
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="userData.PERSON_DOB.value"
                :error-messages="userData.PERSON_DOB.errorMessage"
                persistent-hint
                append-inner-icon="mdi-calendar"
                @click:clear="date = null"
                @click:append="menu1 = true"
                @click="menu1 = !menu1"
                variant="outlined"
                placeholder="e.g. MM/DD/YYYY*"
                v-bind="props"
                id="PERSON_DOB"
                class="PERSON_DOB"
                min="1900/01/01"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :max="currentDate"
              hide-actions
              @update:model-value="computedDateFormattedMomentjs"
            />
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="userData.IS_PERSON_MINOR"
            value="true"
            class="shrink terms_condition"
            color="#EE812D"
            density="compact"
            hide-details="auto"
            type="checkbox"
          >
            <template #label style="display: flex; align-items: flex-start">
              <p class="text-sm font-extrabold">Is the current person minor?</p>
            </template>
          </v-checkbox>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn
            :loading="loading"
            class="text-none mb-4"
            color="secondary"
            size="x-large"
            variant="flat"
            block
            type="submit"
            rounded
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="timeout" color="success" height="60px">
        <p class="text-h6 font-bold">Record submitted successfully!!</p>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<style scoped>
.form_section {
  width: 800px;
  border-radius: 20px;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

:deep(.v-picker__header) {
  display: none !important;
}

:deep(.v-input__details) {
  text-align: start;
}
</style>
