const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
//const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;

  // Set current user as an review author
  req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReviewById = factory.getOneById(Review);
exports.createReview = factory.createOne(Review);
exports.updateReviewById = factory.updateOneById(Review);
exports.deleteReviewById = factory.deleteOneById(Review);
