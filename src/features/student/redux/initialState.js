const initialState = {
  selectedStudent: null,
  studentList: [],
  genreList: [],
  schoolsList: [],
  modalNewUserVisible: false,
  loadStudentListPending: false,
  loadStudentListError: null,
  loadGenreListPending: false,
  loadGenreListError: null,
  loadSchoolListPending: false,
  loadSchoolListError: null,
  saveNewStudentPending: false,
  saveNewStudentError: null,
  userSaved: false,
  updateStudentPending: false,
  updateStudentError: null
};

export default initialState;
