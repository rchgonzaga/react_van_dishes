import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STUDENT_LOAD_GENRE_LIST_BEGIN,
  STUDENT_LOAD_GENRE_LIST_SUCCESS,
  STUDENT_LOAD_GENRE_LIST_FAILURE,
  STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR,
} from 'src/features/student/redux/constants';

import {
  loadGenreList,
  dismissLoadGenreListError,
  reducer,
} from 'src/features/student/redux/loadGenreList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('student/redux/loadGenreList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadGenreList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadGenreList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_GENRE_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_GENRE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when loadGenreList fails', () => {
    const store = mockStore({});

    return store.dispatch(loadGenreList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_GENRE_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_GENRE_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadGenreListError', () => {
    const expectedAction = {
      type: STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR,
    };
    expect(dismissLoadGenreListError()).to.deep.equal(expectedAction);
  });

  it('handles action type STUDENT_LOAD_GENRE_LIST_BEGIN correctly', () => {
    const prevState = { loadGenreListPending: false };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_GENRE_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadGenreListPending).to.be.true;
  });

  it('handles action type STUDENT_LOAD_GENRE_LIST_SUCCESS correctly', () => {
    const prevState = { loadGenreListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_GENRE_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadGenreListPending).to.be.false;
  });

  it('handles action type STUDENT_LOAD_GENRE_LIST_FAILURE correctly', () => {
    const prevState = { loadGenreListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_GENRE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadGenreListPending).to.be.false;
    expect(state.loadGenreListError).to.exist;
  });

  it('handles action type STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { loadGenreListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadGenreListError).to.be.null;
  });
});
