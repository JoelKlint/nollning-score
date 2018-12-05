module.exports = () => context => {
  if (context.type !== 'before') {
    throw new Error('The \'associateWithUser hook should only be used as a before hook\'');
  }
  if (!context.params.user) {
    throw new Error('Current user is missing.');
  }
  context.data.userId = context.params.user.id;
};
