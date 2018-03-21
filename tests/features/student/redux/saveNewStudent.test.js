import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STUDENT_SAVE_NEW_STUDENT_BEGIN,
  STUDENT_SAVE_NEW_STUDENT_SUCCESS,
  STUDENT_SAVE_NEW_STUDENT_FAILURE,
  STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR,
} from 'src/features/student/redux/constants';

import {
  saveNewStudent,
  dismissSaveNewStudentError,
  reducer,
} from 'src/features/student/redux/saveNewStudent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('student/redux/saveNewStudent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveNewStudent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveNewStudent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_SAVE_NEW_STUDENT_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_SAVE_NEW_STUDENT_SUCCESS);
      });
  });

  it('dispatches failure action when saveNewStudent fails', () => {
    const store = mockStore({});

    return store.dispatch(saveNewStudent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STUDENT_SAVE_NEW_STUDENT_BEGIN);
        expect(actions[1]).to.have.property('type', STUDENT_SAVE_NEW_STUDENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSaveNewStudentError', () => {
    const expectedAction = {
      type: STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR,
    };
    expect(dismissSaveNewStudentError()).to.deep.equal(expectedAction);
  });

  it('handles action type STUDENT_SAVE_NEW_STUDENT_BEGIN correctly', () => {
    const prevState = { saveNewStudentPending: false };
    const state = reducer(
      prevState,
      { type: STUDENT_SAVE_NEW_STUDENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveNewStudentPending).to.be.true;
  });

  it('handles action type STUDENT_SAVE_NEW_STUDENT_SUCCESS correctly', () => {
    const prevState = { saveNewStudentPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_SAVE_NEW_STUDENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveNewStudentPending).to.be.false;
  });

  it('handles action type STUDENT_SAVE_NEW_STUDENT_FAILURE correctly', () => {
    const prevState = { saveNewStudentPending: true };
    const state = reducer(
      prevState,
      { type: STUDENT_SAVE_NEW_STUDENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveNewStudentPending).to.be.false;
    expect(state.saveNewStudentError).to.exist;
  });

  it('handles action type STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR correctly', () => {
    const prevState = { saveNewStudentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.saveNewStudentError).to.be.null;
  });
});
