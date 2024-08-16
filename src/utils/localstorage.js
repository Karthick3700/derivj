export const setAuthToken = (token) => {
  return localStorage.setItem("token", token);
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};

export const setTheme = (theme) => {
  return localStorage.setItem("theme",theme);
};

export const getTheme = () => {
  return localStorage.getItem("theme");
};
