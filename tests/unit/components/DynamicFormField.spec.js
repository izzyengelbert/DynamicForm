import { shallowMount } from '@vue/test-utils';
import DynamicFormField from '@/components/DynamicFormField.vue';

describe('DynamicFormField', () => {
  // Now mount the component and you have the wrapper
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DynamicFormField, {
      propsData: {
        name: 'Name',
        type: 'text',
        validate: true,
        rule: '/^[A-Za-z ]*$/',
        warningMessage: 'Please enter a valid name',
        required: true,
        placeholder: 'Enter your name',
        labelName: 'Name',
        data: Object,
        model: Object
      }
    });
  });

  it('renders the label along with field type text', () => {
    const actualLabelName = wrapper.find('label').text();
    const actualInputType = wrapper.find('input').attributes('type');

    expect(actualLabelName).toContain('Name');
    expect(actualInputType).toContain('text');
  });
});
