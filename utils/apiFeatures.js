class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    // Filtering query
    const queryObjCopy = { ...this.queryObj };
    const excludeQuery = ['sort', 'fields', 'page', 'limit'];
    excludeQuery.forEach((el) => delete queryObjCopy[el]);

    // Filtering with mongo operator
    let queryStr = JSON.stringify(queryObjCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (!this.queryObj.sort) {
      // query.sort('-createdAt');
      return this;
    }

    const sortBy = this.queryObj.sort.split(',').join(' ');

    this.query.sort(sortBy);

    return this;
  }

  limitFields() {
    if (!this.queryObj.fields) {
      this.query.select('-__v');
      return this;
    }

    const fields = this.queryObj.fields.split(',').join(' ');

    this.query.select(fields);

    return this;
  }

  paginate() {
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 100;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
