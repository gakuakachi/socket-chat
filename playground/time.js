const moment = require('moment');

// Jan 1st 1970 00:00:00
//0

// var date = moment();
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createAt = 1234
const date = moment(createAt);
console.log(date.format('HH:mm a'))
