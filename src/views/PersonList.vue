<template>
  <table>
    <tr v-for="(data, index) in personData" :key="index">
      <td v-for="(datum, index) in data" :key="index">
        <span v-if="index === 'jobExperience'">
          <ul>
            <li v-for="(item, index) in datum" :key="index">{{item}}</li>
          </ul>
        </span>
        <span v-else-if="index !== 'id'">{{datum}}</span>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'personList',
  data() {
    return {
      personData: {}
    };
  },
  methods: {
    async getUserData() {
      const api = 'http://localhost:3000/formData';
      try {
        const response = await this.$http.get(api, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);

        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },
  async mounted() {
    this.personData = await this.getUserData();
  }
};
</script>

<style>
</style>
