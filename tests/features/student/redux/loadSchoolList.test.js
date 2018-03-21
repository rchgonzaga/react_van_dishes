import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STUDENT_LOAD_SCHOOL_LIST_BEGIN,
  STUDENT_LOAD_SCHOOL_LIST_SUCCESS,
  STUDENT_LOAD_SCHOOL_LIST_FAILURE,
  STUDENT_LOAD_SCHOOL_LIST_DISMISS_ERROR,
} from 'src/features/student/redux/constants';

import {
  loadSchoolList,
  dismissLoadSchoolListError,
  reducer,
} from 'src/features/student/redux/loadSchoolList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('student/redux/loadSchoolList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadSchoolList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadSchoolList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_SCHOOL_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_SCHOOL_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when loadSchoolList fails', () => {
    const store = mockStore({});

    return store.dispatch(loadSchoolList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_SCHOOL_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_SCHOOL_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadSchoolListError', () => {
    const expectedAction = {
      type: STUDENT_LOAD_SCHOOL_LIST_DISMISS_ERROR,
    };
    expect(dismissLoadSchoolListError()).to.deep.equal(expectedAction);
  });

  it('handles action type STUDENT_LOAD_SCHOOL_LIST_BEGIN correctly', () => {
    const prevState = { loadSchoolListPending: false };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_SCHOOL_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadSchoolListPending).to.be.true;
  });

  it('handles action type STUDENT_LOAD_SCHOOL_LIST_SUCCESS correctly', () => {
    const prevState = { loadSchoolListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_SCHOOL_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadSchoolListPending).to.be.false;
  });

  it('handles action type STUDENT_LOAD_SCHOOL_LIST_FAILURE correctly', () => {
    const prevState = { loadSchoolListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_SCHOOL_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadSchoolListPending).to.be.false;
    expect(state.loadSchoolListError).to.exist;
  });

  it('handles action type STUDENT_LOAD_SCHOOL_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { loadSchoolListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_SCHOOL_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadSchoolListError).to.be.null;
  });
});
