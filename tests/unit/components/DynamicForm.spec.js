import { shallowMount } from '@vue/test-utils';
import DynamicForm from '@/components/DynamicForm.vue';
import DynamicFormField from '@/components/DynamicFormField.vue';

describe('DynamicForm', () => {
  // Now mount the component and you have the wrapper

  it('renders the DynamicFormField component', () => {
    const propsData = {
      formFields: {
        name: {
          type: 'text',
          validate: true,
          rule: '/^[A-Za-z ]*$/',
          warningMessage: 'Please enter a valid name',
          required: true,
          placeholder: 'Enter your name',
          labelName: 'Name'
        },
        email: {
          type: 'email',
          validate: true,
          rule: '/^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$/',
          warningMessage: 'Please enter a valid email address',
          required: true,
          placeholder: 'Enter your email',
          labelName: 'Email'
        }
      }
    };
    const wrapper = shallowMount(DynamicForm, {
      propsData
    });

    expect(wrapper.findAll(DynamicFormField).at(0).attributes('name')).toEqual('name');
    expect(wrapper.findAll(DynamicFormField).at(1).attributes('name')).toEqual('email');
  });
});
