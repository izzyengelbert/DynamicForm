import { shallowMount } from '@vue/test-utils';
import DynamicFormField from '@/components/DynamicFormField.vue';

describe('DynamicFormField', () => {
  // Now mount the component and you have the wrapper
  // let wrapper;
  // beforeEach(() => {

  // });

  it('render an input with attributes type "text", name "name", pattern "/^[A-Za-z ]*$/", placeholder "Enter your name", required "true", label name "Name"', () => {
    const propsData = {
      name: 'name',
      type: 'text',
      validate: true,
      rule: '/^[A-Za-z ]*$/',
      warningMessage: 'Please enter a valid name',
      required: true,
      placeholder: 'Enter your name',
      labelName: 'Name'
    };
    const wrapper = shallowMount(DynamicFormField, { propsData });
    console.log(wrapper.find('input').attributes);


    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.find('input').attributes('type');
    const actualInputName = wrapper.find('input').attributes('name');
    const actualInputRule = wrapper.find('input').attributes('pattern');
    const actualInputRequired = wrapper.find('input').attributes('required');

    expect(actualLabelName).toContain(propsData.labelName);
    expect(actualInputType).toContain(propsData.type);
    expect(actualInputName).toContain(propsData.name);
    expect(actualInputRule).toContain(propsData.rule);
    expect(actualInputRequired).toContain(propsData.required);
  });


  it('render ', () => {

  });
});
