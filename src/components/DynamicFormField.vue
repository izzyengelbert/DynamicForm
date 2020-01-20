<template>
  <label :for="name">
    {{ labelName }}
    <select v-if="isSelect" v-model="model[name]" :required="required">
      <option disabled value>Please select one</option>
      <option v-for="(value,index) in data.defaultValue" :value="value" :key="index">
        {{value}}
      </option>
    </select>
    <textarea
      v-else-if="isTextArea"
      rows="4"
      :placeholder="placeholder"
      :name="name"
      v-model="model[name]"
      :required="required"
    />
    <div v-else-if="isCheckbox">
      <div v-for="(value,index) in data.defaultValue" :key="index">
        <input
          :type="type"
          :placeholder="placeholder"
          :name="name"
          :value="value"
          v-model="model[name]"
          :required="required"
        />
        {{value}}
      </div>
    </div>
    <div v-else-if="isRadio">
      <div v-for="(value,index) in data.defaultValue" :key="index">
        <input
          :type="type"
          :placeholder="placeholder"
          :name="name"
          :value="value"
          v-model="model[name]"
          :required="required"
        />
        {{value}}
      </div>
    </div>
    <div v-else>
      <div>
        <input
          v-if="validate"
          :type="type"
          :placeholder="placeholder"
          :name="name"
          v-model="model[name]"
          :pattern="rule"
          :required="required"
        />
        <input
          v-else
          :type="type"
          :placeholder="placeholder"
          :name="name"
          v-model="model[name]"
          :required="required"
        />
      </div>
    </div>
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
    labelName: String,
    data: Object,
    model: Object
  },
  computed: {
    isSelect() {
      return this.type === 'select';
    },
    isTextArea() {
      return this.type === 'textarea';
    },
    isCheckbox() {
      return this.type === 'checkbox';
    },
    isRadio() {
      return this.type === 'radio';
    }
  }
};
</script>

<style>
</style>
