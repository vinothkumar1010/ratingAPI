module.exports = async function(model, data, next,fieldName) {
  // Only applies to new documents, so updating with model.save() method won't update id
  // We search for the biggest id into the documents (will search in the model, not whole db
  // We limit the search to one result, in descendant order.
 
  if (data.isNew) {
    let total = await model
      .find()
      .sort({ [fieldName]: -1 })
      .limit(1);
    data[fieldName] = total.length === 0 ? 1 : Number(total[0][fieldName]) + 1;
    next();
  }
};
