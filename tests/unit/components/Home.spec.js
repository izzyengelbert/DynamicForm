import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import DynamicForm from '@/components/DynamicForm.vue';

jest.mock('axios');

describe('Home', () => {
  let wrapper;
  let data;
  let mockGet;
  let mockData;
  let userData;

  beforeEach(() => {
    data = {
      schema: {
        name: {
          type: 'text',
          validate: true,
          rule: '/^[A-Za-z ]*$/',
          warningMessage: 'Please enter a valid name',
          required: true,
          placeholder: 'Enter your name',
          labelName: 'Name',
        },
        jobExperience: {
          type: 'checkbox',
          validate: false,
          rule: '',
          warningMessage: '',
          required: false,
          placeholder: '',
          labelName: 'jobExperience',
          data: {
            defaultValue: [
              'Frontend Developer',
              'Backend Developer',
              'Web Developer',
              'UI/UX Engineer',
              'Database Administrator',
              'Software Quality Engineer',
              'Data Analyst',
              'DevOps Engineer'
            ]
          }
        }
      }
    };

    userData = {
      name: 'Izzy Engelbert Simanjuntak',
      email: 'izzyengelbert@gmail.com',
      phoneNumber: '0',
      mailingList: 'Yes',
      gender: 'Female',
      dateOfBirth: '2020-01-01',
      address: 'Jl. Rajawali 7 No. 8',
      jobExperience: [
        'Frontend Developer',
        'UI/UX Engineer'
      ]
    };

    mockGet = jest.fn();
    mockGet.mockResolvedValue({ data });

    mockData = jest.fn();
    mockData.mockResolvedValue(userData);

    wrapper = shallowMount(Home, {
      mocks: {
        $http: {
          get: mockGet,
          post: mockData
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the DynamicForm component', () => {
    const actualResult = wrapper.contains(DynamicForm);
    expect(actualResult).toBeTruthy();
  });

  it('should get schema by schema id from the server', async () => {
    await wrapper.vm.getFormData();
    expect(wrapper.vm.$http.get).toHaveBeenCalled();
  });

  it('should throw error if failed to fetch data', async () => {
    const errorResponse = {
      response: {
        status: 400,
        message: 'failed to fetch data!'
      }
    };
    mockGet.mockRejectedValueOnce(errorResponse);

    await expect(wrapper.vm.getFormData()).rejects.toEqual(errorResponse);
  });

  it('should post data to the server', async () => {
    await wrapper.vm.saveData(userData);
    expect(wrapper.vm.$http.post).toHaveBeenCalled();
  });

  it('should throw error if failed to post data', async () => {
    const errorResponse = {
      response: {
        status: 401,
        message: 'failed to send data!'
      }
    };
    mockData.mockRejectedValueOnce(errorResponse);

    await expect(wrapper.vm.saveData(userData)).rejects.toEqual(errorResponse);
  });
});
