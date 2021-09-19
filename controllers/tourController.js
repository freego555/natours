const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: `Invalid ID`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(`New tour with id ${newId} is written.`);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;

  let indexToPatch = -1;
  tours.forEach((el, i) => {
    if (el.id === id) {
      indexToPatch = i;
    }
  });

  if (indexToPatch === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours[indexToPatch] = Object.assign(tours[indexToPatch], req.body);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(`Tour with id ${id} is patched.`);
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours[indexToPatch],
        },
      });
    }
  );
};

exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;

  let indexToDelete = -1;
  tours.forEach((el, i) => {
    if (el.id === id) {
      indexToDelete = i;
    }
  });

  if (indexToDelete === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours.splice(indexToDelete, 1);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(`Tour with id ${id} is deleted.`);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
