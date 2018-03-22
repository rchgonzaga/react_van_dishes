import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STUDENT_UPDATE_STUDENT_BEGIN,
  STUDENT_UPDATE_STUDENT_SUCCESS,
  STUDENT_UPDATE_STUDENT_FAILURE,
  STUDENT_UPDATE_STUDENT_DISMISS_ERROR,
} from 'src/features/student/redux/constants';

import {
  updateStudent,
  dismissUpdateStudentError,
  reducer,
} from 'src/features/student/redux/updateStudent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('student/redux/updateStudent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateStudent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateStudent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_UPDATE_STUDENT_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_UPDATE_STUDENT_SUCCESS);
      });
  });

  it('dispatches failure action when updateStudent fails', () => {
    const store = mockStore({});

    return store.dispatch(updateStudent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_UPDATE_STUDENT_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_UPDATE_STUDENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateStudentError', () => {
    const expectedAction = {
      type: STUDENT_UPDATE_STUDENT_DISMISS_ERROR,
    };
    expect(dismissUpdateStudentError()).to.deep.equal(expectedAction);
  });

  it('handles action type STUDENT_UPDATE_STUDENT_BEGIN correctly', () => {
    const prevState = { updateStudentPending: false };
    const state = reducer(
      prevState,
      { type: STUDENT_UPDATE_STUDENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateStudentPending).to.be.true;
  });

  it('handles action type STUDENT_UPDATE_STUDENT_SUCCESS correctly', () => {
    const prevState = { updateStudentPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_UPDATE_STUDENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateStudentPending).to.be.false;
  });

  it('handles action type STUDENT_UPDATE_STUDENT_FAILURE correctly', () => {
    const prevState = { updateStudentPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_UPDATE_STUDENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateStudentPending).to.be.false;
    expect(state.updateStudentError).to.exist;
  });

  it('handles action type STUDENT_UPDATE_STUDENT_DISMISS_ERROR correctly', () => {
    const prevState = { updateStudentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STUDENT_UPDATE_STUDENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateStudentError).to.be.null;
  });
});
