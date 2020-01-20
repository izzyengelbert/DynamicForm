import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import DynamicForm from '@/components/DynamicForm.vue';

jest.mock('axios');

describe('Home', () => {
  // Now mount the component and you have the wrapper
  let wrapper;

  it('renders the DynamicForm component', () => {
    wrapper = shallowMount(Home);
    const actualResult = wrapper.contains(DynamicForm);
    expect(actualResult).toBeTruthy();
  });

  it('should get schema by schema id from the server', async () => {
    const data = {
      schema: {
        name: {
          type: 'text',
          validate: true,
          rule: '/^[A-Za-z ]*$/',
          warningMessage: 'Please enter a valid name',
          required: true,
          placeholder: 'Enter your name',
          labelName: 'Name'
        }
      }
    };

    const mockGet = jest.fn();
    mockGet.mockResolvedValue({ data });

    wrapper = shallowMount(Home, {
      mocks: {
        $http: {
          get: mockGet
        }
      }
    });

    await wrapper.vm.getFormData();
    expect(wrapper.vm.$http.get).toHaveBeenCalled();
  });
});
