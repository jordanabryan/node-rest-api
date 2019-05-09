'use strict';

//require the post model
const Posts = require('../models/post');

//export the posts read method
exports.read = (req, res) => {
  //call the posts read method
  Posts.read((err, posts) => {
    //if there is an error display the error else display the response
    if(err){
      res.status(400).send({
        "status": 400,
        "error": true,
        "errormessage": err,
        "response": null
      });
    } else {
      res.status(200).send({
        "status": 200,
        "error": false,
        "errormessage": null,
        "response": posts
      });
    }
  });
};

//export the posts create method
exports.create = (req, res) => {

  //create a new post and pass in the body
  var new_post = new Posts(req.body);

  console.log(new_post);

  //handles null error - check for items in the post
  if(!new_post.title){
    //if there is an error display the error else display the response
    res.status(400).send({
      "status": 400,
      "error": true,
      "errormessage": 'Please provide a new post',
      "response": null
    });
  }else {
    //call the posts create method
    Posts.create(new_post, (err, post) => {
      //if there is an error display the error else display the response
      if(err){
        res.status(400).send({
          "status": 400,
          "error": true,
          "errormessage": err,
          "response": null
        });
      } else {
        res.status(200).send({
          "status": 200,
          "error": false,
          "errormessage": null,
          "response": post
        });
      }
    });
  }
};

//export the posts read_single method
exports.read_single = (req, res) => {
  //call the posts read single method passing in the id param from the url
  Posts.read_single(req.params.postId, (err, post) => {
    //if there is an error display the error else display the response
    if(err || post.length === 0){
      res.status(400).send({
        "status": 400,
        "error": true,
        "errormessage": post.length === 0 ? 'post does not exist' : err,
        "response": null
      });
    } else {
      res.status(200).send({
        "status": 200,
        "error": false,
        "errormessage": null,
        "response": post
      });
    }

  });
};

//export the posts update method
exports.update = (req, res) => {
  //call the posts update method passing in the id and the new content
  Posts.update(req.body.id, new Posts(req.body), (err, post) => {
    //if there is an error display the error else display the response
    if(err){
      res.status(400).send({
        "status": 400,
        "error": true,
        "errormessage": err,
        "response": null
      });
    } else {
      res.status(200).send({
        "status": 200,
        "error": false,
        "errormessage": null,
        "response": post
      });
    }
  });
};

//export the posts delete method
exports.delete = (req, res) => {
  //call the posts delete method passing in the id
  Posts.delete(req.body.id, (err, post) => {
    //if there is an error display the error else display the response
    if(err){
      res.status(400).send({
        "status": 400,
        "error": true,
        "errormessage": err,
        "response": null
      });
    } else {
      res.status(200).send({
        "status": 200,
        "error": false,
        "errormessage": null,
        "response": 'Post successfully deleted'
      });
    }
  });
};
