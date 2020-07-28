const HOST = "http://localhost:8000";

async function apiCallNoBody(method, path, token, setToken) {
  const url = HOST + path;
  const res = await fetch(url, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    }
  });

  if (res.status === 401) {
    setToken(null);
    localStorage.removeItem("token");
    throw "unauthenticated";
  }

  if (res.status !== 200) {
    throw "internal server error";
  }

  return res.json();
}

async function apiCall(method, path, body, token, setToken) {
  const url = HOST + path;
  const res = await fetch(url, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    },
    body: JSON.stringify(body)
  });

  if (res.status === 401) {
    setToken(null);
    localStorage.removeItem("token");
    throw "unauthenticated";
  }

  if (res.status !== 200) {
    throw "internal server error";
  }

  return res.json();
}

export async function apiGet(path, token, setToken) {
  return apiCallNoBody("GET", path, token, setToken);
}

export async function apiPost(path, body, token, setToken) {
  return apiCall("POST", path, body, token, setToken);
}

export async function apiPut(path, body, token, setToken) {
  return apiCall("PUT", path, body, token, setToken);
}

export async function apiDelete(path, token, setToken) {
  return apiCallNoBody("DELETE", path, token, setToken);
}

export async function login(username, password) {
  const url = HOST + "/login";
  const auth = btoa(`${username}:${password}`);
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  if (res.status === 200) {
    const token = res.headers.get("x-auth-token");
    return token;
  }
  return null;
}
