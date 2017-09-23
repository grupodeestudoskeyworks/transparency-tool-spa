import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../src/js/actions/session';
import * as types from '../../src/js/actions/index';
import {headers} from '../../src/js/api/utils';

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
    fetchMock.restore();
    clearLocalStorage();
  });

  it(`creates ${types.SESSION_LOAD} when fetching from localStorage`, () => {
    setupLocalStorage({
      email: 'admin@test.io',
      name: 'admin',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    });

    const expectedActions = [
      {
        type: types.SESSION_LOAD,
        payload: {
          email: 'admin@test.io',
          name: 'admin',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
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

  it('updates headers after successfull login', () => {
    fetchMock.post('/api/sessions', {
      email: 'test@test.io',
      name: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    });

    const store = mockStore({session: {}});
    return store.dispatch(actions.login(
      'test@test.io',
      'passwd',
      () => {}
    )).then(() => {
      expect(headers()).toHaveProperty('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
    });
  });

  it(`creates ${types.SESSION_LOGIN} after successfull login`, () => {
    fetchMock.post('/api/sessions', {
      email: 'test@test.io',
      name: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    });

    const expectedActions = [
      {
        type: types.SESSION_LOGIN,
        payload: {
          email: 'test@test.io',
          name: 'test',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
        }
      }
    ];

    const store = mockStore({session: {}});
    return store.dispatch(actions.login(
      'test@test.io',
      'passwd',
      () => {}
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`creates ${types.SESSION_LOAD} with error when server rejects`, () => {
    fetchMock.post('/api/sessions', 401);

    const expectedActions = [
      {
        type: types.SESSION_LOGIN,
        error: true,
        payload: {
          statusCode: 401, message: 'Unauthorized'
        }
      }
    ];

    const store = mockStore({session: {}});
    return store.dispatch(actions.login(
      'test@test.io',
      'wrong password',
      () => {}
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('adds session info to localStorage when logging in', () => {
    fetchMock.post('/api/sessions', {
      email: 'test@test.io',
      name: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    });

    const store = mockStore({session: {}});
    return store.dispatch(actions.login(
      'test@test.io',
      'passwd',
      () => {}
    )).then(() => {
      expect(window.localStorage).toHaveProperty('email', 'test@test.io');
      expect(window.localStorage).toHaveProperty('name', 'test');
      expect(window.localStorage).toHaveProperty('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
    });
  });
});
