'use strict';

const sql = require('../config/db.js');

//post object constructor
const Posts = function(post){
  this.category_id = post.category_id;
  this.title = post.title;
  this.body = post.body;
  this.author = post.author;
  this.created_at = new Date();
};

//posts create method
//pass in a new post and return the result
Posts.create = (newPost, result) => {
  sql.query("INSERT INTO posts set ?", newPost, (err, res) => {
    if(err) {
      result(err, null);
    } else{
      result(null, res.insertId);
    }
  });
};

//posts read single method
//pass in the post id to access and return the result
Posts.read_single = (postId, result) => {
  sql.query("SELECT c.name as category_name, p.id, p.category_id, p.title, p.body, p.author, p.created_at FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ? LIMIT 1", postId, (err, res) => {
    if(err) {
      result(err, null);
    } else{
      result(null, res);
    }
  });
};

//post read method
//return the result
Posts.read = (result) => {
  sql.query("SELECT c.name as category_name, p.id, p.category_id, p.title, p.body, p.author, p.created_at FROM posts p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC", (err, res) => {
    if(err) {
      result(null, err);
    } else{
      result(null, res);
    }
  });
};

//posts update method
//pass in an id, the post update data and return result
Posts.update = (id, post, result) =>{
  sql.query("UPDATE posts SET title = ?, body = ?, author = ?, category_id = ? WHERE id = ?", [post.title, post.body, post.author, post.category_id, id], (err, res) => {
    if(err) {
      result(null, err);
    } else{
      result(null, res);
    }
  });
};

//posts delete method
//pass in an id and return the result
Posts.delete = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", [id], (err, res) => {
    if(err) {
      result(null, err);
    } else{
      result(null, res);
    }
  });
};

module.exports = Posts;
