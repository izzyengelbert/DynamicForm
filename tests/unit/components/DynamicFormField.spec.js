import { shallowMount } from '@vue/test-utils';
import DynamicFormField from '@/components/DynamicFormField.vue';

describe('DynamicFormField', () => {
  // Now mount the component and you have the wrapper

  it('render an input with attributes type "text", name "name", pattern "/^[A-Za-z ]*$/", placeholder "Enter your name", required "true", label name "Name"', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: true,
      rule: '^[A-Za-z ]*$',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.find('input').attributes('type');
    const actualInputName = wrapper.find('input').attributes('name');
    const actualInputRule = wrapper.find('input').attributes('pattern');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInputType).toEqual(propsData.type);
    expect(actualInputName).toEqual(propsData.name);
    expect(actualInputRule).toEqual(propsData.rule);
  });

  it('render an error message "Name is required" when field is required', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: true,
      rule: '^[A-Za-z ]*$',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {
        name: ''
      }
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });
    const wrapperSpan = wrapper.find('span');

    wrapper.vm.validation();

    expect(wrapperSpan.text()).toEqual('Name is required');
  });

  it('render an error message "Please input a valid name" when validation is not correct', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: true,
      rule: '^[A-Za-z ]*$',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {
        name: ''
      }
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });
    const wrapperInput = wrapper.find('input');
    const wrapperSpan = wrapper.find('span');

    wrapperInput.setValue('test1');
    wrapper.vm.validation();

    expect(wrapperSpan.text()).toEqual(propsData.warningMessage);
  });

  it('render an input with attributes type "text", name "name", placeholder "Enter your name", required "false", label name "Name"', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: false,
      rule: '',
      warningMessage: '',
      required: false,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.find('input').attributes('type');
    const actualInputName = wrapper.find('input').attributes('name');

    expect(actualLabelName).toEqual(propsData.labelName);
    expect(actualInputType).toEqual(propsData.type);
    expect(actualInputName).toEqual(propsData.name);
  });

  it('render an input with attributes type "textarea", name "address", required "true", label name "Address"', () => {
    const propsData = {
      name: 'address',
      type: 'textarea',
      validate: false,
      rule: '',
      warningMessage: '',
      required: true,
      placeholder: '',
      labelName: 'Address',
      data: {},
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.findAll('textarea');
    const actualInputName = wrapper.find('textarea').attributes('name');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInputType).toHaveLength(1);
    expect(actualInputName).toEqual(propsData.name);
  });

  it('render an input with attributes type "datepicker", name "date", required "true", label name "Date"', () => {
    const propsData = {
      name: 'date',
      type: 'date',
      validate: false,
      rule: '',
      warningMessage: '',
      required: true,
      placeholder: '',
      labelName: 'Date',
      data: {
        minDate: '1990-01-31',
        maxDate: '2021-01-31'
      },
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.find('input').attributes('type');
    const actualInputName = wrapper.find('input').attributes('name');
    const actualInputMinDate = wrapper.find('input').attributes('min');
    const actualInputMaxDate = wrapper.find('input').attributes('max');

    expect(actualLabelName).toEqual(propsData.labelName);
    expect(actualInputType).toEqual(propsData.type);
    expect(actualInputName).toEqual(propsData.name);
    expect(actualInputMinDate).toEqual(propsData.data.minDate);
    expect(actualInputMaxDate).toEqual(propsData.data.maxDate);
  });

  it('render an input with attributes type "checkbox", name "job", required "true", label name "Job", with options "Frontend Developer" and "Backend Developer"', () => {
    const propsData = {
      name: 'job',
      type: 'checkbox',
      validate: false,
      rule: '',
      warningMessage: '',
      required: false,
      placeholder: '',
      labelName: 'Job',
      data: {
        defaultValue: [
          'Frontend Developer',
          'Backend Developer'
        ]
      },
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInput = wrapper.findAll('input');
    const actualInputName = wrapper.find('input').attributes('name');
    const actualInputType = wrapper.find('input').attributes('type');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInput).toHaveLength(propsData.data.defaultValue.length);
    expect(actualInput.at(0).attributes('value')).toEqual(propsData.data.defaultValue[0]);
    expect(actualInput.at(1).attributes('value')).toEqual(propsData.data.defaultValue[1]);
    expect(actualInputName).toEqual(propsData.name);
    expect(actualInputType).toEqual(propsData.type);
  });

  it('render an input with attributes type "radio", name "yes", required "true", label name "Yes", with options "Yes" and "No"', () => {
    const propsData = {
      name: 'yes',
      type: 'radio',
      validate: false,
      rule: '',
      warningMessage: '',
      required: false,
      placeholder: '',
      labelName: 'Yes',
      data: {
        defaultValue: [
          'Yes',
          'No'
        ]
      },
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInput = wrapper.findAll('input');
    const actualInputName = wrapper.find('input').attributes('name');
    const actualInputType = wrapper.find('input').attributes('type');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInput).toHaveLength(propsData.data.defaultValue.length);
    expect(actualInput.at(0).attributes('value')).toEqual(propsData.data.defaultValue[0]);
    expect(actualInput.at(1).attributes('value')).toEqual(propsData.data.defaultValue[1]);
    expect(actualInputName).toEqual(propsData.name);
    expect(actualInputType).toEqual(propsData.type);
  });

  it('render an input with attributes type "select", name "gender", required "true", label name "Gender", with options "Male", "Female", and "Rather not say"', () => {
    const propsData = {
      name: 'gender',
      type: 'select',
      validate: false,
      rule: '',
      warningMessage: '',
      required: true,
      placeholder: '',
      labelName: 'Gender',
      data: {
        defaultValue: [
          'Male',
          'Female',
          'Rather not say'
        ]
      },
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });

    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.findAll('select');
    const actualInputName = wrapper.find('select').attributes('name');
    const actualOptions = wrapper.findAll('option');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInputType).toHaveLength(1);
    expect(actualInputName).toEqual(propsData.name);
    expect(actualOptions.at(0).text()).toEqual('Please select one');
    expect(actualOptions.at(1).text()).toEqual(propsData.data.defaultValue[0]);
    expect(actualOptions.at(2).text()).toEqual(propsData.data.defaultValue[1]);
    expect(actualOptions.at(3).text()).toEqual(propsData.data.defaultValue[2]);
  });

  it('should not display validation error "Please enter a valid name" when validate is false', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: false,
      rule: '^[A-Za-z ]*$',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });
    const wrapperInput = wrapper.find('input');

    wrapperInput.setValue('Name1');
    wrapperInput.trigger('change');
    const errorMessage = wrapper.find('span').text();

    expect(errorMessage).not.toEqual(propsData.warningMessage);
  });

  it('should not display validation error "Please enter a valid name" when validate is true and validation is correct', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: true,
      rule: '^[A-Za-z ]*$',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name',
      data: {},
      model: {}
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });
    const wrapperInput = wrapper.find('input');

    wrapperInput.setValue('Name');
    wrapperInput.trigger('change');
    const errorMessage = wrapper.find('span').text();

    expect(errorMessage).not.toEqual(propsData.warningMessage);
  });
});
