const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image'))
    return cb(new AppError('Not an image. Please Input an image', 400), false);

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeImagesTour = catchAsync(async (req, res, next) => {
  if (!req.files?.imageCover || !req.files?.images) return next();

  // Image cover
  if (req.files.imageCover) {
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 8 })
      .toFile(`public/img/tours/${req.body.imageCover}`);
  }

  // Images
  req.body.images = [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 8 })
          .toFile(`public/img/tours/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  next();
});

exports.tourDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!(lat && lng))
    throw new AppError(
      'Please input lattitude and longitude as URL parameter in a format lattitude,longitude',
      400
    );

  if (!(unit === 'mi' || unit === 'km'))
    throw new AppError(
      'Please input lattitude and longitude as URL parameter in a format lattitude,longitude',
      400
    );

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  const tours = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [+lng, +lat],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      data: tours,
    },
  });
});

exports.tourWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!(lat && lng))
    throw new AppError(
      'Please input lattitude and longitude as URL parameter',
      400
    );

  if (!(unit === 'mi' || unit === 'km'))
    throw new AppError('Please input unit as URL parameter in mil or km', 400);

  const radius = unit === 'mi' ? distance / 3963 : distance / 6378;

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[+lng, +lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      data: tours,
    },
  });

  // new ;
});

exports.aliasTopCheap = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields =
    'name,duration,difficulty,price,summary,maxGroupSize,ratingAverage';

  next();
};

exports.stats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        tourNum: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        sumRatingQuantity: { $sum: '$ratingsQuantity' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
    {
      $match: { _id: { $ne: 'EASY' } },
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: stats.length,
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const { year } = req.params;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        tourNum: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        tourNum: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: plan.length,
    data: {
      plan,
    },
  });
});

exports.getAllTour = factory.getAll(Tour);
exports.getOneTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.create(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
