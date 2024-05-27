<template>
  <v-container class="d-flex justify-center flex-column">
    <h1 class="text-center my-5" style="color: rgb(72, 169, 166)">User Form</h1>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form">
        <div v-for="block in blocks" :key="block.token" class="form-group">
          <label :for="block.token" class="form-label">{{ block.props.title }}</label>
          <div class="input-wrapper">
            <input
              v-if="block.type === 'text'"
              :id="block.token"
              v-model="formData[block.token]"
              :placeholder="block.props.placeholder"
              :required="isRequired(block)"
              type="text"
              class="form-input"
            />
            <input
              v-if="block.type === 'date'"
              :id="block.token"
              v-model="formData[block.token]"
              :placeholder="block.props.placeholder"
              :required="isRequired(block)"
              type="date"
              class="form-input"
            />
            <input
              v-if="block.type === 'checkbox'"
              :id="block.token"
              v-model="formData[block.token]"
              type="checkbox"
              class="form-checkbox"
            />
            <input
              v-if="block.type === 'email'"
              :id="block.token"
              v-model="formData[block.token]"
              :placeholder="block.props.placeholder"
              :required="isRequired(block)"
              type="email"
              class="form-input"
            />
          </div>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="success"
        height="60px"
        style="margin-left: 21%"
      >
        <p class="text-h6 font-bold">Record submitted successfully!!</p>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// The JSON configuration object
const jsonConfig = {
  blocks: [
    {
      token: 'PERSON_NAME',
      type: 'text',
      props: {
        title: 'Enter your name*',
        required: true,
        placeholder: 'e.g. John Doe'
      }
    },
    {
      token: 'IS_PERSON_MINOR',
      type: 'checkbox',
      props: {
        title: 'Is the current person minor?',
        default: false
      }
    },
    {
      token: 'PERSON_DOB',
      type: 'date',
      props: {
        title: 'Enter your DOB',
        required: 'IS_PERSON_MINOR',
        placeholder: 'e.g. 01/01/2000'
      }
    }
    // {
    //   token: 'PERSON_EMAIL',
    //   type: 'email',
    //   props: {
    //     title: 'Enter your email',
    //     required: true,
    //     placeholder: 'e.g. example@mail.com'
    //   }
    // },
    // {
    //   token: 'PERSON_PHONE',
    //   type: 'text',
    //   props: {
    //     title: 'Enter your phone number',
    //     required: true,
    //     placeholder: 'e.g. +1234567890'
    //   }
    // }
  ]
}

// Form data and blocks
const formData = ref({})
const blocks = jsonConfig.blocks
const snackbar = ref(false)
const timeout = ref(2000)

// Function to determine if a field is required
const isRequired = (block) => {
  if (block.props.required === 'IS_PERSON_MINOR') {
    return formData.value.IS_PERSON_MINOR
  }
  return block.props.required
}

// Handle form submission
const handleSubmit = () => {
  snackbar.value = true
  console.log('Form data:', formData.value)
  formData.value = {}
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}

.form {
  width: 80%;
  max-width: 600px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group:nth-child(2) {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-checkbox[data-v-7b7158f8] {
  margin: 0 5px 5px 0;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
