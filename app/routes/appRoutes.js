'use strict';

module.exports = function(app) {

  const posts = require('../controller/postsController');

  // posts Routes
  app.route('/post')
    .get(posts.read)
    .post(posts.create)
    .put(posts.update)
    .delete(posts.delete);

  //single posts route
  app.route('/post/:postId')
    .get(posts.read_single);

  // //category routes
  // app.route('/category')
  //   .get(posts.read_a_task);

};
