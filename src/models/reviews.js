const db = require('../db/postgres');

module.exports = {

//get reviews query
  get: (params) => {
    return db.query('SELECT * FROM public.reviews ORDER BY id ASC LIMIT 30');
  },

//post reviews query

//return a promise

};


// getAll: function (callback) {
//   // fetch all messages
//   // text, username, roomname, id
//   var queryStr = 'select messages.id, messages.text, messages.roomname, users.username \
//                   from messages left outer join users on (messages.userid = users.id) \
//                   order by messages.id desc';
//   db.query(queryStr, function(err, results) {
//     callback(err, results);
//   });
// },


//example query: keep pool running, don't pool.end() after every client query
// pool.query('SELECT * FROM public.reviews ORDER BY id ASC LIMIT 30', (err, res) => {
//   // console.log(err, res);
//   pool.end();
// });