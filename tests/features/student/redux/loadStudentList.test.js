import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STUDENT_LOAD_STUDENT_LIST_BEGIN,
  STUDENT_LOAD_STUDENT_LIST_SUCCESS,
  STUDENT_LOAD_STUDENT_LIST_FAILURE,
  STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR,
} from 'src/features/student/redux/constants';

import {
  loadStudentList,
  dismissLoadStudentListError,
  reducer,
} from 'src/features/student/redux/loadStudentList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('student/redux/loadStudentList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadStudentList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadStudentList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_STUDENT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_STUDENT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when loadStudentList fails', () => {
    const store = mockStore({});

    return store.dispatch(loadStudentList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_LOAD_STUDENT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_LOAD_STUDENT_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadStudentListError', () => {
    const expectedAction = {
      type: STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR,
    };
    expect(dismissLoadStudentListError()).to.deep.equal(expectedAction);
  });

  it('handles action type STUDENT_LOAD_STUDENT_LIST_BEGIN correctly', () => {
    const prevState = { loadStudentListPending: false };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_STUDENT_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadStudentListPending).to.be.true;
  });

  it('handles action type STUDENT_LOAD_STUDENT_LIST_SUCCESS correctly', () => {
    const prevState = { loadStudentListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_STUDENT_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadStudentListPending).to.be.false;
  });

  it('handles action type STUDENT_LOAD_STUDENT_LIST_FAILURE correctly', () => {
    const prevState = { loadStudentListPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_STUDENT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadStudentListPending).to.be.false;
    expect(state.loadStudentListError).to.exist;
  });

  it('handles action type STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { loadStudentListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadStudentListError).to.be.null;
  });
});
