// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Home,
  TestPage,
  Restaurants,
  Restaurant,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'cousines',
      name: 'Cousines',
      component: Home,
      isIndex: true,
    },
    { path: 'test-page', name: 'Login', component: TestPage },
    { path: 'restaurants/:cousineId', name: 'Restaurants', component: Restaurants },
    { path: 'restaurant/:restaurantId', name: 'Restaurant', component: Restaurant },
  ],
};
