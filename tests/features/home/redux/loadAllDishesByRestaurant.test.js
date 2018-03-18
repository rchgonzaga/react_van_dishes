import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  loadAllDishesByRestaurant,
  dismissLoadAllDishesByRestaurantError,
  reducer,
} from 'src/features/home/redux/loadAllDishesByRestaurant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadAllDishesByRestaurant', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadAllDishesByRestaurant succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadAllDishesByRestaurant())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS);
      });
  });

  it('dispatches failure action when loadAllDishesByRestaurant fails', () => {
    const store = mockStore({});

    return store.dispatch(loadAllDishesByRestaurant({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadAllDishesByRestaurantError', () => {
    const expectedAction = {
      type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR,
    };
    expect(dismissLoadAllDishesByRestaurantError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN correctly', () => {
    const prevState = { loadAllDishesByRestaurantPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllDishesByRestaurantPending).to.be.true;
  });

  it('handles action type HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS correctly', () => {
    const prevState = { loadAllDishesByRestaurantPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllDishesByRestaurantPending).to.be.false;
  });

  it('handles action type HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE correctly', () => {
    const prevState = { loadAllDishesByRestaurantPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllDishesByRestaurantPending).to.be.false;
    expect(state.loadAllDishesByRestaurantError).to.exist;
  });

  it('handles action type HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR correctly', () => {
    const prevState = { loadAllDishesByRestaurantError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadAllDishesByRestaurantError).to.be.null;
  });
});
