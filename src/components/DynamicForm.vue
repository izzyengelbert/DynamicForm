<template>
  <div>
    <div v-for="(field, index) in formFields" :key="index">
      <DynamicFormField
        :name="index"
        :type="field.type"
        :validate="field.validate"
        :rule="field.rule"
        :warningMessage="field.warningMessage"
        :required="field.required"
        :placeholder="field.placeholder"
        :labelName="field.labelName"
        :data="field.data"
        :model="model"
      />
    </div>
      <button @click="save">Submit</button>
  </div>
</template>

<script>
import DynamicFormField from '@/components/DynamicFormField.vue';

export default {
  name: 'DynamicForm',
  components: {
    DynamicFormField
  },
  props: {
    formFields: Object,
    saveData: Function,
    model: Object
  },
  methods: {
    save() {
      console.log(this.model);
    },
  }
};
</script>

<style>
</style>
