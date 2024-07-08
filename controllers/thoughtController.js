const { Thoughts} = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find({})
        .select('-__v');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought= await Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $addToSet: { thought: thought._id } },
        { new: true }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no post with that ID' });
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
