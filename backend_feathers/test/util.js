const authUser = {
  id: 1
};

const adminUser = {
  role: 'admin'
};

const simulateAuthUser = () => {
  const user = Object.assign({}, authUser, adminUser);
  return {
    user
  };
};

module.exports = {
  simulateAuthUser
};
