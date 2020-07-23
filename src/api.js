const HOST = "http://localhost:8000";

export async function apiPost(path, body, token, setToken) {
  const url = HOST + path;
  const res = await fetch(url, {
    method: "POST",
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

  return res.json();
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
