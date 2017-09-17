import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../src/js/actions/session';
import * as types from '../../src/js/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('session actions', () => {
  const {localStorage: mockedLocalStorage} = window;

  function setupLocalStorage({email, name, token}) {
    mockedLocalStorage.email = email;
    mockedLocalStorage.name = name;
    mockedLocalStorage.token = token;
  }

  function clearLocalStorage() {
    setupLocalStorage({});
  }

  afterEach(() => {
    nock.cleanAll();
    clearLocalStorage();
  });

  it(`creates ${types.SESSION_LOAD} when fetching from localStorage`, () => {
    setupLocalStorage({email: 'admin@test.io', name: 'admin', token: '1234'});

    const expectedActions = [
      {
        type: types.SESSION_LOAD,
        payload: {
          email: 'admin@test.io',
          name: 'admin',
          token: '1234'
        }
      }
    ];

    const store = mockStore({session: {}});
    store.dispatch(actions.initialize());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`does not create ${types.SESSION_LOAD} when no session stored`, () => {
    const expectedActions = [];
    const store = mockStore({session: {}});
    store.dispatch(actions.initialize());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
