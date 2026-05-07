const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const readErrorMessage = async (response, fallback) => {
  try {
    const payload = await response.json();
    return payload.message || fallback;
  } catch {
    return response.statusText || fallback;
  }
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Request failed."));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const publicApi = {
  getHomepage: () => request("/api/public/homepage")
};

export const adminApi = {
  login: (payload) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  logout: () =>
    request("/api/admin/logout", {
      method: "POST",
      body: JSON.stringify({})
    }),
  session: () => request("/api/admin/session"),
  getHomepage: () => request("/api/admin/homepage"),
  saveSection: (sectionKey, payload) =>
    request(`/api/admin/sections/${sectionKey}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  createCollectionItem: (path, payload) =>
    request(`/api/admin/${path}`, {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateCollectionItem: (path, id, payload) =>
    request(`/api/admin/${path}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }),
  deleteCollectionItem: (path, id) =>
    request(`/api/admin/${path}/${id}`, {
      method: "DELETE"
    }),
  async uploadImage(file, folder = "photography-cms", alt = "") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("alt", alt);

    const response = await fetch(`${API_BASE_URL}/api/admin/media/upload`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, "Image upload failed."));
    }

    return response.json();
  }
};
