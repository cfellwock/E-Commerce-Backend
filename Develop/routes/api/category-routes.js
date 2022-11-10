const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
      const categoryData = await Category.findAll({
          include: [{ model: Product, as: 'products' }],
      });
      res.status(200).json(categoryData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// gets specific category based on id
router.get('/:id', async(req, res) => {
  try {
      const categoryDataById = await Category.findByPk(req.params.id, {
          include: [{ model: Product, as: 'products' }],
      });

      if (!categoryDataById) {
          res.status(404).json({ message: 'No category found with that id.' })
          return;
      }

      res.status(200).json(categoryDataById);
  } catch (err) {
      res.status(500).json(err);
  }
});

// creates new category
router.post('/', async(req, res) => {
  try {
      const newCategoryData = await Category.create(req.body);

      res.status(201).json(newCategoryData);
  } catch (err) {
      res.status(400).json(err);
  }
});

// update specific category based on id
router.put('/:id', async(req, res) => {
  try {
      const updatedCategory = await Category.update({
          category_name: req.body.category_name,
      }, {
          where: {
              id: req.params.id
          },
      });
      if (!updatedCategory) {
          res.status(404).json({ message: "No category found with that id!" });
          return;
      }
      res.status(200).json(updatedCategory);
  } catch (err) {
      res.status(500).json(err);
  }
});

// delete specific category based on id
router.delete('/:id', async(req, res) => {
  try {
      const deleteCategory = await Category.destroy({
          where: {
              id: req.params.id,
          },
      });
      if (!deleteCategory) {
          res.status(404).json({ message: "No category found with that id!" });
          return;
      }

      res.status(200).json(deleteCategory);
  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;