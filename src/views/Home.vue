<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <DynamicForm :formFields="formData" :saveData="saveData" :model="model"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamicForm from '@/components/DynamicForm.vue';

export default {
  name: 'home',
  components: {
    DynamicForm
  },
  data() {
    return {
      formData: {},
      model: {}
    };
  },
  methods: {
    async getFormData() {
      const api = 'http://13.126.43.216:3000/schema/3';
      try {
        const response = await this.$http.get(api, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });

        return response.data.schema;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    saveData(savedData) {
      const data = savedData;
      const api = 'http://localhost:3000/formData';
      this.$http.post(api, data);
    },
    createModel() {
      const model = {};

      /* eslint-disable no-restricted-globals */
      /* eslint-disable no-restricted-syntax */
      // eslint-disable guard-for-in
      // eslint-disable no-restricted-syntax
      // eslint-disable guard-for-in
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line
      for ( name in this.formData) {
        model[name] = '';

        if (this.formData[name].type === 'checkbox') {
          model[name] = [];
        }
      }

      return model;
    }
  },
  async mounted() {
    this.formData = await this.getFormData();
    this.model = this.createModel();
  }
};
</script>
