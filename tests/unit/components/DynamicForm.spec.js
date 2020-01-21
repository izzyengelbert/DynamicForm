import { shallowMount, mount } from '@vue/test-utils';
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
    model = {
      name: null,
      email: null
    };
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
    wrapper = mount(DynamicForm, { propsData });
    const submitButton = wrapper.find('button');
    const wrapperInput = wrapper.findAll('input');
    console.log(wrapperInput.at(0).html());

    wrapperInput.at(0).setValue('Name');
    wrapperInput.at(1).setValue('name@email.com');

    submitButton.trigger('click');

    expect(saveFunction).toHaveBeenCalledWith(model);
  });

  it('call the save function on submit and errors should be "Name is required" and "Email is required"', async () => {
    wrapper = mount(DynamicForm, { propsData });
    const submitButton = wrapper.find('button');

    submitButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.errors[0]).toEqual('Name is required');
    expect(wrapper.vm.$data.errors[1]).toEqual('Email is required');
  });
});
