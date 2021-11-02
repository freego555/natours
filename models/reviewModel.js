const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please, write your review.'],
      minlength: [10, 'Review text should be more than 10 symbols.'],
      maxlength: [1024, 'Review text should be less than 1000 symbols.'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please, set a rating.'],
      min: [1, 'Rating should be more than 1'],
      max: [5, 'Rating should be less than 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// QUERY MIDDLEWARE
reviewSchema.pre(/^find/, function (next) {
  this
    // .populate({
    //     path: 'tour',
    //     select: 'name',
    //   })
    .populate({
      path: 'user',
      select: 'name photo',
    });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

// review / rating / createdAt / ref to tour / ref to user
module.exports = Review;
