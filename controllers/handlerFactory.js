const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOneById = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`Document with id ${req.params.id} doesn't exist`, 404)
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
