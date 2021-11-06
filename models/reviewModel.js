const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please, write your review.'],
      minlength: [5, 'Review text should be more than 5 symbols.'],
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

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', async function () {
  // `this` points to current review
  // `this.constructor` points to current model
  await this.constructor.calcAverageRatings(this.tour);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  if (doc) await doc.constructor.calcAverageRatings(doc.tour);
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
