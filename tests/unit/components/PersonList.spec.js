import { shallowMount } from '@vue/test-utils';
import PersonList from '@/views/PersonList.vue';

jest.mock('axios');

describe('PersonList', () => {
  let wrapper;
  let mockGet;
  let userData;

  beforeEach(() => {
    userData = [
      {
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
      }
    ];

    mockGet = jest.fn();
    mockGet.mockResolvedValue({ userData });

    wrapper = shallowMount(PersonList, {
      mocks: {
        $http: {
          get: mockGet
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table', () => {
    const actualResult = wrapper.contains('table');
    expect(actualResult).toBeTruthy();
  });

  it('should get user data from the server', async () => {
    await wrapper.vm.getUserData();
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

    await expect(wrapper.vm.getUserData()).rejects.toEqual(errorResponse);
  });
});
