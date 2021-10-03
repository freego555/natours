const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tour should contain name and price properties',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: tour,
    // },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: tours[indexToPatch],
    // },
  });
};

exports.deleteTourById = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
