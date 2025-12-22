// Placeholder auth service

export const login = async (email, password) => {
  return { name: 'Demo User', email };
};

export const register = async (name, email, password) => {
  return { name, email };
};
