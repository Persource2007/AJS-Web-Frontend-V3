/* eslint-disable no-var,prefer-template,no-undef */
// var $ = function (selector) {  
//   console.log(selector);
//   if(selector == '.calendar-ui .sidebar'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .navbar--range'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .prev'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .next'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .today'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .dropdown'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .dropdown-trigger'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .dropdown-icon'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .dropdown-content'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.calendar-ui .checkbox-collapse'){
//     return document.querySelector(selector);
//   }
//   if(selector == '.light-dark-mode'){
//     return false;
//   }
//     return document.querySelector(selector);
//   console.log('-------'+selector+'-------');
//     return false;
// };

var $$ = function (selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
};

function getNavbarRange(tzStart, tzEnd, viewType) {
  var start = tzStart.toDate();
  var end = tzEnd.toDate();
  var middle;
  if (viewType === 'month') {
    middle = new Date(start.getTime() + (end.getTime() - start.getTime()) / 2);

    return moment(middle).format('YYYY-MM');
  }
  if (viewType === 'day') {
    return moment(start).format('YYYY-MM-DD');
  }
  if (viewType === 'week') {
    return moment(start).format('YYYY-MM-DD') + ' ~ ' + moment(end).format('YYYY-MM-DD');
  }
  throw new Error('no view type');
}
