const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // CHECK FILTER TOUR
    const filter = req.filterTour || {};

    // BUILD THE QUERY
    const features = new ApiFeatures(Model.find(filter), req.query);

    // EXECUTE QUERY
    // prettier-ignore
    const docs = await features
                          .filter()
                          .sort()
                          .limitFields()
                          .paginate()
                          .query

    // SEND RESPOND
    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.getOne = (Model, populateOps) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (populateOps) query.populate(populateOps);

    const doc = await query;

    if (!doc) {
      throw new AppError('Can not find document with that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) throw new AppError('Input the valid document', 400);

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      throw new AppError('Can not find document with that ID', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw new AppError('Can not find document with that ID', 404);
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
