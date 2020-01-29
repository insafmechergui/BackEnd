const Post = require("../models/post");

const Event = require("../models/event");
const User = require("../models/user");

const {cloudinary}   = require('../helpers/index.js')


module.exports.createPost = async (req, res) => {
  try {
    if(req.file){
      let file;
      if(req.file.mimetype.match(/mp4|mkv|avi/i)){
    file = await cloudinary.v2.uploader.upload(req.file.path,  { resource_type: "video" })

      }else if(req.file.mimetype.match(/jpg|jpeg|png|gif/i)){
    file = await cloudinary.v2.uploader.upload(req.file.path)
      }
      req.body.file = file.url
    }
    var post = new Post({
      content: req.body.content,
      user: req.user._id,
      community: req.community._id,
      file: req.body.file
    });

  const result =  await post.save();
    res.json({ success: true, result });

  } catch (err) {
    res.json({ success: false, err });
  }
};
// using for new users that didn't choose their interrest
module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostsByUserId = async (req, res, next) => {
  try {
    const posts = await Post.find({
      user: req.params.id,
      community: req.community._id
    }).populate("user");
    res.json({
      success: true,
      result: posts
    });
  } catch (err) {
    res.json({ success: false, msg: "failed to fetch posts", err });
  }
};
//
module.exports.getPostByEvent = async (req, res, next) => {
  try {
    let event = req.params._event;
    const posts = await Post.find({ _event: event })
      .populate("Event")
      .exec((err, posts) => console.log("posts"));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByHobby = async (req, res, next) => {
  try {
    let hobby = req.params._hobby;
    const posts = await Post.find({ _hobby: hobby })
      .populate("Hobby")
      .exec((err, posts) => console.log("posts"));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByUserInHobby = async (req, res, next) => {
  try {
    let user = req.params._user;
    let hobby = req.params._hobby;
    const posts = await Post.find({ _user: user, _hobby: hobby })
      .populate("User")
      .populate("Hobby")
      .exec((err, posts) => console.log(posts));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByUserInEvent = async (req, res, next) => {
  try {
    let user = req.params._user;
    let event = req.params._event;
    const posts = await Post.find({ _user: user, _event: event })
      .populate("User")
      .populate("Event")
      .exec((err, posts) => console.log(posts));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
