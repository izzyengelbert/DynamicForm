<template>
 <label :for="name">
  {{ labelName }}
  <input :type="type" :placeholder="placeholder" :name="name" />
</label>
</template>
<script>
export default {
  name: 'DynamicFormField',
  props: {
    name: String,
    type: String,
    validate: Boolean,
    rule: String,
    warningMessage: String,
    required: Boolean,
    placeholder: String,
    labelName: String
  }
};
</script>

<style>

</style>
