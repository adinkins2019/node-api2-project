// implement your posts router here
const express = require('express');
const router = express.Router();
const { find, findById, insert, update, remove, findPostComments } = require('./posts-model');

router.get('/', async (req, res) => {
  try {
    const posts = await find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await findById(req.params.id);
    if(post) {
    res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "The posts information could not be retrieved"  });
  }
});

router.post('/', async (req, res) => {
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({ message: "Please provide title and contents for the post"  });
  } else {
    try {
      const newPost = await insert(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: "There was an error while saving the post to the database"  });
    }
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await findById(id);
  if(post) {
    if(!req.body.title || !req.body.contents) {
      res.status(400).json({ message:  "Please provide title and contents for the post"});
    } else {
      try {
        const updatedPost = await update(id, req.body);
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ message: "The post information could not be modified"  });
      }
    }
  } else {
    res.status(404).json({ message: "The post with the specified ID does not exist" });
  }

})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findById(id);
    if(post) {
      const deletedPost = await remove(id);
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed"  });
  }
})

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findById(id);
    if(post) {
      const comments = await findPostComments(id)
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "The comments information could not be retrieved"  });
  }

})

module.exports = router;
