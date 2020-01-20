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
    <div v-for="error in errors" :key="error">
      <span>{{ error }}</span>
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
  data() {
    return {
      errors: []
    };
  },
  props: {
    formFields: Object,
    saveData: Function,
    model: Object
  },
  methods: {
    save() {
      this.errors = [];
      const formFieldsKeys = Object.keys(this.formFields);
      formFieldsKeys.forEach((key) => {
        if (this.formFields[key].required && (this.model[key] === null || this.model[key] === [])) {
          this.errors.push(`${this.formFields[key].labelName} is required`);
        }
      });
      if (this.errors.length === 0) {
        this.saveData(this.model);
      }
    }
  }
};
</script>

<style>
</style>
