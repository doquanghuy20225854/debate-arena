// Placeholder auth service

export const login = async (email: string, password: string) => {
  return { name: 'Demo User', email };
};

export const register = async (name: string, email: string, password: string) => {
  return { name, email };
};
