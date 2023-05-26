
const { sequelize, Post, User, Comment } = require('../models');
const { Op } = require("sequelize");


const userPrams = ['name', 'email']


// creating a new comment
async function create(req, res) {
  try {

    const { content } = req.body

    const commentData = { content: content, post_id: req.params.id, author: req.userData.id }

    const createComment = await Comment.create(commentData)
    if (createComment) {
      return res.status(201).json({
        success: "Comment posted successfully!",
        response: createComment
      });
    } else {
      return res.status(400).json({ error: "An error occured!" });
    }


  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}







// getting all posts
async function index(req, res) {
  try {
    const { count, rows } = await Comment.findAndCountAll({
      where: { post_id: req.params.id },
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
      comments: rows,
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
  index: index
}