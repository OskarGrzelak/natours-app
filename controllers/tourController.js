const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  const id = parseInt(req.params.id, 10);
  if (id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({ status: 'fail', message: 'Bad request' });
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = tours.filter((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(req.body, { id: newID });
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: '<Deleted tour here>',
    },
  });
};
