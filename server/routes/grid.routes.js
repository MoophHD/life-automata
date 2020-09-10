const router = require("express").Router();
const Grid = require("../models/grid.model");
const User = require('../models/user.model');
const shortid = require("shortid");
const { countDocuments } = require("../models/grid.model");

router.get("/:id", async (req, res) => {
  try {
    const grid = await Grid.findOne({ id: req.params.id });
    res.json(grid);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const id = shortid.generate();
    const owner = req.user._id;
    
    const { grid, step } = req.body;
    const nextGrid = new Grid({ id, owner, grid, step });
    nextGrid.owner = owner;
    await nextGrid.save();

    res.status(201).json({ grid: nextGrid });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { id, grid, step } = req.body;
    const nextGrid = await Grid.findOne({ id });
    await nextGrid.updateOne({grid, step})

    res.status(201).json({ grid: nextGrid });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

router.post("/ids", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({username});
    const userId = user._id;

    const grids = await Grid.find({ owner: userId });
    if (grids.length < 1) {
      res.json({ids: []});
      return;
    }

    const ids = grids.map((grid) => grid.id);
    res.status(201).json({ ids });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});


module.exports = router;
