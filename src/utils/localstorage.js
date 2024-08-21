export const setAuthUser = (user) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getAuthUser = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeAuthUser = () => {
  if (typeof window !== "undefined") {
    removeAuthToken();
    window.localStorage.removeItem("user");
  }
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("token", token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    return token ? token : "";
  }
  return "";
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("token");
  }
};

export const setTheme = (theme) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("theme", theme);
  }
};

export const getTheme = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("theme");
  }
  return null;
};

export const getAuthuserIsNew = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("isNew");
  }
  return null;
};

export const setAuthUserIsNew = (userStatus) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("isNew", userStatus);
  }
};
