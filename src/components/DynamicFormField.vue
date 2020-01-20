<template>
  <label :for="name">
    {{ labelName }}
    <select v-if="isSelect" v-model="model[name]" :name="name" @change="validation">
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
      @change="validation"
    />
    <div v-else-if="isCheckbox">
      <div v-for="(value,index) in data.defaultValue" :key="index">
        <input
          :type="type"
          :placeholder="placeholder"
          :name="name"
          :value="value"
          v-model="model[name]"
          @change="validation"
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
          @change="validation"
        />
        {{value}}
      </div>
    </div>
    <div v-else-if="isDate">
      <input
        :type="type"
        :name="name"
        v-model="model[name]"
        :min="data.minDate"
        :max="data.maxDate"
        @change="validation"
      />
    </div>
    <div v-else>
      <div>
          <input
            :type="type"
            :placeholder="placeholder"
            :name="name"
            v-model="model[name]"
            :pattern="rule"
            @change="validation"
          />
      </div>
    </div>
    <span>
      {{ error }}
    </span>
  </label>
</template>
<script>

export default {
  name: 'DynamicFormField',
  data() {
    return {
      error: null
    };
  },
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
  methods: {
    validation() {
      const regex = new RegExp(this.rule);
      if (this.required && this.model[this.name] === '') {
        this.error = `${this.labelName} is required`;
      }
      if (!this.validate) {
        return;
      }
      console.log(regex.test(this.model[this.name]));
      if (!regex.test(this.model[this.name]) && this.model[this.name] !== '') {
        this.error = this.warningMessage;
      }
      if (regex.test(this.model[this.name]) && this.model[this.name] !== '') {
        this.error = '';
      }
      console.log(this.error);
      console.log(this.model[this.name], 'test');
    }
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
    },
    isDate() {
      return this.type === 'date';
    }
  }
};
</script>

<style>
</style>
