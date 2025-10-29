import { isKeyExists, removeStorageItem } from "./storage";
// import { useNavigate } from "@solidjs/router";

export function logout(): boolean {
  // const navigate = useNavigate();
  removeStorageItem("token");
  removeStorageItem("pid");
  removeStorageItem("name");
  removeStorageItem("is_verified");
  removeStorageItem("current_role");
  removeStorageItem("roles");
  removeStorageItem("dashboard_path");
  // navigate("/");
  return true;
}

export function isTokenExists(): boolean {
  return isKeyExists("token");
}

export function isAuthenticated(): boolean {
  return isTokenExists();
}

export function isAuthorized(): boolean {
  const returned = false;
  // const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5150/api/";
  return returned;
}
