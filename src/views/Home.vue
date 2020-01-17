<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <DynamicForm :formFields="formData"/>
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
      formData: {}
    };
  },
  methods: {
    async getFormData() {
      // const api = 'http://13.126.43.216:3000/schema/v3';
      const api = 'http://localhost:3000/formSchema';
      const response = await this.$http.get(api, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    }
  },
  async mounted() {
    this.$data.formData = await this.getFormData();
  }
};
</script>
