/**
 * Combines data, and parses the ints that are parsable
 */
const getCreateData = (data, query) => {
  let combined = {
    ...data,
    ...query,
  }
  Object.keys(combined).forEach(key => {
    const parsed = parseInt(combined[key])
    if(!isNaN(parsed)) {
      combined[key] = parsed
    }
  })
  return combined
}

/**
 * Simulates an upsert operation
 */
module.exports = () => async context => {
  if (typeof context.id === 'number') {
    // Check if instance exists
    try {
      await context.service.get(context.id);
      // If it does, do nothing
    } catch (error) {
      // Else, assign result of .create() to context.result
      context.result = await context.service.create(
        getCreateData(context.data, context.params.query)
      );
    }
  } else if (context.id === null) {
    // Count the instances
    const matching = await context.service.find({
      query: context.params.query
    });
    // If more than 0, do nothing
    if (matching.length === 0) {
      // Else, assign result of .create() to context.result

      context.result = [
        await context.service.create(
          getCreateData(context.data, context.params.query)
        )
      ]
    }
  }
};
