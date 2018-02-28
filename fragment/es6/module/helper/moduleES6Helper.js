/**
 * Created by monk on 2018/2/26.
 */

// Type 1
// export var m = 1;
// export function f() {
//   console.log('ES6 Type 1')
// }

// Type 2
var mm = 1;
function f2() {
  console.log('ES6 Type 2')
}
export {mm, f2};

// Type 3
// var n = 1;
// export {n as nn};

// Type 4
// export default function () {
//   console.log('foo');
// }

// Type 5
// export * from 'circle';
// export var e = 2.71828182846;
// export default function(x) {
//   return Math.exp(x);
// }


/**Type 6**/
// constants/db.js
// export const db = {
//   url: 'http://my.couchdbserver.local:5984',
//   admin_username: 'admin',
//   admin_password: 'admin password'
// };

// constants/user.js
// export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// constants/index.js
// export {db} from './db';
// export {users} from './users';

// 用的时候script.js
// import {db, users} from './index';

/**Type 7**/
// const main = document.querySelector('main');
//
// import(`./section-modules/${someVariable}.js`)
//   .then(module => {
//     module.loadPageInto(main);
//   })
//   .catch(err => {
//     main.textContent = err.message;
//   });

// （1）按需加载
// button.addEventListener('click', event => {
//   import('./dialogBox.js')
//     .then(dialogBox => {
//       dialogBox.open();
//     })
//     .catch(error => {
//       /* Error handling */
//     })
// });

// （2）条件加载
// if (condition) {
// import('moduleA').then(...);
// } else {
// import('moduleB').then(...);
// }

// （3）动态的模块路径
// import(f())
//   .then(...);