const { User, Comment } = require("../models");

const commentController = {
  async getComments(req, res) {
    try {
      const comments = await comment.find();
      return res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async getComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.commentId);

      if (!comment) {
        return res.status(404).json({ message: "No comment found" });
      }

      return res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);

      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { comments: comment._id } },
        { runValidators: true }
      );

      return res.status(201).json({ comment });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async Comment(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!comment) {
        return res.status(404).json({ message: "No comment found" });
      }

      return res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.commentId);

      if (!comment) {
        return res.status(404).json({ message: "No comment found" });
      }

      return res
        .status(200)
        .json({ message: "Comments & associated reactions deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async modifyReactionList(req, res, modifier) {
    try {
      const reaction = await Comment.findByIdAndUpdate(
        req.params.commentId,
        modifier,
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No comment found" });
      }

      return res.status(200).json(reaction);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    return commentController.modifyReactionList(req, res, {
      $addToSet: { reactions: req.body },
    });
  },

  async deleteReaction(req, res) {
    return commentController.modifyReactionList(req, res, {
      $pull: { reactions: { _id: req.params.reactionId } },
    });
  },
};

module.exports = commentController;