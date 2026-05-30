const ClothingItem = require("../models/clothingItem");

const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");
const { ForbiddenError } = require("../errors/ForbiddenError");

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }

      return next(err);
    });
};

const getItems = (req, res, next) => {
  const getItems = (req, res, next) => {
    ClothingItem.find({})
      .sort({ createdAt: -1 })
      .then((items) => res.send({ data: items }))
      .catch(next);
  };

  const deleteItem = (req, res, next) => {
    ClothingItem.findById(req.params.itemId)
      .then((item) => {
        if (!item) {
          return next(new NotFoundError("Item not found"));
        }

        if (item.owner.toString() !== req.user._id) {
          return next(
            new ForbiddenError("You do not have permission to delete this item")
          );
        }

        return item.deleteOne().then(() => {
          res.send({ message: "Deleted" });
        });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return next(new BadRequestError("Invalid item ID"));
        }

        return next(err);
      });
  };

  const likeItem = (req, res, next) => {
    const { itemId } = req.params;
    const userId = req.user._id;

    ClothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true }
    )
      .orFail(() => new NotFoundError("Item not found"))
      .then((updatedItem) => res.send({ data: updatedItem }))
      .catch((err) => {
        if (err.name === "CastError") {
          return next(new BadRequestError("Invalid item ID"));
        }

        return next(err);
      });
  };

  const dislikeItem = (req, res, next) => {
    const { itemId } = req.params;
    const userId = req.user._id;

    ClothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true }
    )
      .orFail(() => new NotFoundError("Item not found"))
      .then((updatedItem) => res.send({ data: updatedItem }))
      .catch((err) => {
        if (err.name === "CastError") {
          return next(new BadRequestError("Invalid item ID"));
        }

        return next(err);
      });
  };
  ClothingItem.find({})
    .sort({ createdAt: -1 })
    .then((items) => res.send({ data: items }))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }

      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
