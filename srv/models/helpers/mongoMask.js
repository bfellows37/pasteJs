module.exports = exports = (doc, ret, options) => {

  ret.id = ret._id;
  delete ret._id;

  delete ret.__v;

  return ret;
};
