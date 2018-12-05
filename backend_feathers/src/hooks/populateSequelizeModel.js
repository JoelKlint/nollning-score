/**
 * Populates all associations on a sequelize model
 */
module.exports = () => context => {
  if (context.params.query && context.params.query.populated) {
    delete context.params.query.populated;
    context.params.sequelize = {
      include: [{ all: true }],
      raw: false
    };
  }
};
