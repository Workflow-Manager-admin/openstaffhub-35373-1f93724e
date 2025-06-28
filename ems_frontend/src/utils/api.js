//
// Minimal HTTP utility for backend API integration
//

const BACKEND_BASE =
  process.env.REACT_APP_API_URL || "https://vscode-internal-00567-qa.qa01.cloud.kavia.ai:3001";

async function request(path, { method = "GET", body } = {}) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const resp = await fetch(BACKEND_BASE + path, opts);
  if (!resp.ok) throw new Error(`API error: ${resp.status}`);
  return await resp.json();
}

// PUBLIC_INTERFACE
export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
