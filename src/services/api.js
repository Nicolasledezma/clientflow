const API_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const clientsApi = {
  getAll: () => request("/clients"),

  getById: (id) => request(`/clients/${id}`),

  create: (client) =>
    request("/clients", {
      method: "POST",
      body: JSON.stringify(client),
    }),

  update: (id, client) =>
    request(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(client),
    }),

  delete: (id) =>
    request(`/clients/${id}`, {
      method: "DELETE",
    }),
};

export const authApi = {
  register: (user) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};