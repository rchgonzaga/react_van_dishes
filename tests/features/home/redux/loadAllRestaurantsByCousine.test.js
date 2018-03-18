import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  loadAllRestaurantsByCousine,
  dismissLoadAllRestaurantsByCousineError,
  reducer,
} from 'src/features/home/redux/loadAllRestaurantsByCousine';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadAllRestaurantsByCousine', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadAllRestaurantsByCousine succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadAllRestaurantsByCousine())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS);
      });
  });

  it('dispatches failure action when loadAllRestaurantsByCousine fails', () => {
    const store = mockStore({});

    return store.dispatch(loadAllRestaurantsByCousine({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadAllRestaurantsByCousineError', () => {
    const expectedAction = {
      type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR,
    };
    expect(dismissLoadAllRestaurantsByCousineError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN correctly', () => {
    const prevState = { loadAllRestaurantsByCousinePending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllRestaurantsByCousinePending).to.be.true;
  });

  it('handles action type HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS correctly', () => {
    const prevState = { loadAllRestaurantsByCousinePending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllRestaurantsByCousinePending).to.be.false;
  });

  it('handles action type HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE correctly', () => {
    const prevState = { loadAllRestaurantsByCousinePending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllRestaurantsByCousinePending).to.be.false;
    expect(state.loadAllRestaurantsByCousineError).to.exist;
  });

  it('handles action type HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR correctly', () => {
    const prevState = { loadAllRestaurantsByCousineError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllRestaurantsByCousineError).to.be.null;
  });
});
