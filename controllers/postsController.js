
const { sequelize, Post, User } = require('../models');
const { Op } = require("sequelize");


const userPrams = ['name', 'email']


// creating a new post 
async function create(req, res) {
  try {

    const { title, content, tags } = req.body

    const postData = { title: title, content: content, author: req.userData.id, tags: tags }

    const createPost = await Post.create(postData)
    if (createPost) {
      return res.status(201).json({
        success: "Post created successfully!",
        result: createPost
      });
    } else {
      return res.status(400).json({ error: "An error occured!" });
    }


  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



// getting a post by ID
async function show(req, res) {
  try {

    const post = await Post.findOne({ where: { id: req.params.id } })
    return res.status(200).json({ post: post });

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}


// updating a post by ID
async function update(req, res) {
  try {

    const { title, content, tags } = req.body

    const updateData = { title: title, content: content, tags: tags }

    const postUpdate = await Post.update(updateData, { where: { id: req.params.id } })
    if (postUpdate[0] === 1) {
      return res.status(201).json({
        success: "Successfully updated"
      });
    } else {
      return res.status(400).json({ error: "something went wrong" });
    }

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}


// deleting a post by ID
async function destroy(req, res) {
  try {

    const deletePost = await Post.destroy({ where: { id: req.params.id } })
    if (deletePost) {
      return res.status(201).json({ success: "Successfully deleted" });
    } else {
      return res.status(400).json({ error: "something went wrong" });
    }

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



// getting all posts
async function index(req, res) {
  try {
    const { count, rows } = await Post.findAndCountAll({
      where: {
        [Op.or]: [
          { 'tags': { [Op.regexp]: req.query.search ? req.query.search : `` } }
        ]
      },
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          required: true,
          attributes: userPrams
        }
      ]
    })
    return res.status(200).json({
      posts: rows,
      pagination: {
        currentPage: req.currentPage,
        limit: req.offset,
        nextPage: req.offset + 10 > count || req.offset + 10 === count ? null : req.currentPage + 1,
        prevPage: req.currentPage > 1 ? req.currentPage - 1 : null,
        totalPages: Math.ceil(count / req.limit),
        totalCounts: count
      }
    });
  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



module.exports = {
  create: create,
  show: show,
  update: update,
  destroy: destroy,
  index: index
}