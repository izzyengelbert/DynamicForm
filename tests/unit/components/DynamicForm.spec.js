import { shallowMount } from '@vue/test-utils';
import DynamicForm from '@/components/DynamicForm.vue';
import DynamicFormField from '@/components/DynamicFormField.vue';

describe('DynamicForm', () => {
  // Now mount the component and you have the wrapper
  let wrapper;
  let propsData;
  let saveFunction;
  let model;
  beforeEach(() => {
    saveFunction = jest.fn();
    model = {};
    propsData = {
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
      },
      saveData: saveFunction,
      model
    };
  });

  it('renders the DynamicFormField component', () => {
    wrapper = shallowMount(DynamicForm, { propsData });

    expect(wrapper.findAll(DynamicFormField).at(0).attributes('name')).toEqual('name');
    expect(wrapper.findAll(DynamicFormField).at(1).attributes('name')).toEqual('email');
  });

  it('call the save function on submit', () => {
    wrapper = shallowMount(DynamicForm, { propsData });
    const submitButton = wrapper.find('button');

    submitButton.trigger('click');

    expect(saveFunction).toHaveBeenCalledWith(model);
  });
});
