const router = require("express").Router();
const Grid = require("../models/grid.model");
const shortid = require("shortid");

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
    const owner = req.user.userId;
    const { grid, step } = req.body;
    const nextGrid = new Grid({ id, owner, grid, step });
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

module.exports = router;
