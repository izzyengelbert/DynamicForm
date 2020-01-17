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
      // const api = 'http://localhost:3000/formSchema';
      try {
        const response = await this.$http.get(api, {
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/json'
          // }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    saveData(savedData) {
      const data = savedData;
      const api = 'http://13.126.43.216:3000/schema/3';
      // const api = 'http://localhost:3000/formData';
      this.$http.post(api, data);
    },
    createModel() {
      const model = {};
      console.log(this.formData);

      /* eslint-disable no-restricted-globals */
      /* eslint-disable no-restricted-syntax */
      // eslint-disable guard-for-in
      // eslint-disable no-restricted-syntax
      // eslint-disable guard-for-in
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line
      for ( name in this.formData) {
        console.log(this.formData[name].type, 'tes');
        model[name] = '';

        if (name.type === 'checkbox') {
          model[name] = [];
        }
      }
      console.log(model);

      return model;
    }
  },
  async mounted() {
    this.$data.formData = await this.getFormData();
    this.model = this.createModel();
    console.log(this.model);
  }
};
</script>
