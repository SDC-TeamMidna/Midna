const db = require('../db/postgres');

module.exports = {

//get reviewsmeta query


//post reviewsmeta query

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


/*

SELECT
product.id,
reviews.rating,
COUNT(reviews.rating)
FROM product
INNER JOIN reviews
ON product.id = reviews.product_id
WHERE product.id = 2
GROUP BY 1,2
ORDER BY 1,2

*/