// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
} from './';

export default {
  path: 'student',
  name: 'Student',
  childRoutes: [
    { path: 'init', name: 'Studant Home', component: DefaultPage, isIndex: true },
  ],
};
