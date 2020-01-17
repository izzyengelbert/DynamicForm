<template>
  <form action method="post">
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
      ></DynamicFormField>
    </div>
  </form>
</template>

<script>
export default {
  name: 'DynamicForm',
  data() {
    return {
      items: {
        test: { message: 'Foo' }, test2: { message: 'Bar' }
      }
    };
  },
  props: {
    formFields: Object
  }
};
</script>

<style>
</style>
