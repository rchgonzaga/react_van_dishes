import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN,
  HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS,
  HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE,
  HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  loadRestaurantsByType,
  dismissLoadRestaurantsByTypeError,
  reducer,
} from 'src/features/home/redux/loadRestaurantsByType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadRestaurantsByType', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadRestaurantsByType succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadRestaurantsByType())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS);
      });
  });

  it('dispatches failure action when loadRestaurantsByType fails', () => {
    const store = mockStore({});

    return store.dispatch(loadRestaurantsByType({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadRestaurantsByTypeError', () => {
    const expectedAction = {
      type: HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR,
    };
    expect(dismissLoadRestaurantsByTypeError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN correctly', () => {
    const prevState = { loadRestaurantsByGpsPositionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRestaurantsByGpsPositionPending).to.be.true;
  });

  it('handles action type HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS correctly', () => {
    const prevState = { loadRestaurantsByGpsPositionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRestaurantsByGpsPositionPending).to.be.false;
  });

  it('handles action type HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE correctly', () => {
    const prevState = { loadRestaurantsByGpsPositionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRestaurantsByGpsPositionPending).to.be.false;
    expect(state.loadRestaurantsByGpsPositionError).to.exist;
  });

  it('handles action type HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR correctly', () => {
    const prevState = { loadRestaurantsByGpsPositionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRestaurantsByGpsPositionError).to.be.null;
  });
});
