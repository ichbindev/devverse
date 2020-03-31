const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
// MODEL(S)
const Post = require("../../models/Post");
// const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // errors object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // * ALWAYS NEED A TRY-CATCH IN ASYNC_METHOD
    try {
      // create a user from the model
      // so we can get the name and user and avatar
      const user = await User.findById(req.user.id).select("-password");
      // new post object and txt will come from body
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // get the posts w/ await and find().sort()
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get posy by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        // get the posts w/ await and find().sort()
        const post = await Post.findById(req.params.id);
        // check if there is a post with the uid
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        };

        res.json(post);

    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Get post by ID & remove it from db
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // get the posts w/ await and find().sort()
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();

        res.json({ msg: 'Post removed' });

    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked by this user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked by this user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }

        // Get Remove Index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        // Remove it from likes
        post.likes.splice(removeIndex, 1);
        // Save 
        await post.save();

        res.json(post.likes)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});



// @route   POST api/posts/comment/:id
// @desc    Create a comment
// @access  Private
router.post(
    "/comment/:id",
    [
      auth,
      [
        check("text", "Text is required")
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      // errors object
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // * ALWAYS NEED A TRY-CATCH IN ASYNC_METHOD
      try {
        //   get user but exclude the password
        const user = await User.findById(req.user.id).select("-password");
        // get the post model
        const post = await Post.findById(req.params.id);
        // new comment object and text will come from the request body
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
        post.comments.unshift(newComment)
  
        await post.save();
        res.json(post.comments)
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        // Get the post
        const post = await Post.findById(req.params.id);
        // Get the comment from the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        // Make sure comment exists; otherwise return a status 0f 404
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' });
        }

        // remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        // remove the indexed element from the comments array
        post.comments.splice(removeIndex, 1);
        // save the comments object without deleted entry
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
