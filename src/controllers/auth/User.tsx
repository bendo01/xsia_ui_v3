import { AuthLogin, UserWithRole } from "../../models/auth/User";
import { isKeyExists, removeStorageItem, setStorageItem, getStorageItem } from "../../lib/storage";

export async function LoginUser(credensial: AuthLogin) {
    const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5150/api/";
    // Function to handle user login
    if (credensial.email && credensial.password) {
        try {
            const response = await fetch(`${server_api_url}auth/users/login`, {
                method: "POST", // HTTP method
                headers: {
                    "Content-Type": "application/json", // Specify the data format
                    Accept: "application/json",
                },
                body: JSON.stringify(credensial), // Send form data as JSON
            });
            const data = await response.json();

            if (!response.ok) {
                return {
                    code: data.code || 500,
                    message: data.message || "Login failed"
                };
            }
            // If login is successful, you might want to store user data or token here
            // setStorageItem("user", data.user); // Example if you want to store user
            setStorageItem("token", data.token);
            setStorageItem("pid", data.pid);
            setStorageItem("name", data.name);
            setStorageItem("is_verified", data.is_verified);
            return {
                code: data.code || 200,
                message: data.message || "Login successful"
            };
        } catch (error) {
            return {
                code: 500,
                message: "Gagal terhubung ke server"
            };
        }
    }
    // Return null if credentials are missing
    return {
        code: 500,
        message: "Empty Credentials"
    };
}

export async function GetUserRoles() {
    const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5150/api/";
    try {
        const response = await fetch(`${server_api_url}auth/roles/user`, {
            method: "GET", // HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the data format
                Accept: "application/json",
                Authorization: `Bearer ${getStorageItem("token")}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                code: 500,
                message: "Pengambilan Daftar Peran Pengguna Gagal"
            };
        }
        setStorageItem("roles", JSON.stringify(data));
        return {
            code: data.code || 200,
            message: data.message || "Get Role successful"
        };
    } catch (error) {
        return {
            code: 500,
            message: "Gagal terhubung ke server"
        };
    }
}

export async function GetCurrentUser() {
    const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5150/api/";
    try {
        const response = await fetch(`${server_api_url}auth/users/current`, {
            method: "GET", // HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the data format
                Accept: "application/json",
                Authorization: `Bearer ${getStorageItem("token")}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                code: 500,
                message: "Pengambilan Peran Pengguna Gagal"
            };
        }
        setStorageItem("current_user", JSON.stringify(data));
        return {
            code: data.code || 200,
            message: data.message || "Get Role successful"
        };
    } catch (error) {
        return {
            code: 500,
            message: "Gagal terhubung ke server"
        };
    }
}

export async function ChangeUserRole(role_id: string) {
    const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5150/api/";
    const path = "auth/users/set_current_role";
    try {
        const response = await fetch(`${server_api_url}${path}/${role_id}`, {
            method: "GET", // HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the data format
                Accept: "application/json",
                Authorization: `Bearer ${getStorageItem("token")}`,
            }
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                code: 500,
                message: "Mengganti Peran Pengguna Gagal"
            };
        }
        setStorageItem("current_user", JSON.stringify(data));
    } catch (error) {
        return {
            code: 500,
            message: "Gagal terhubung ke server"
        };
    }
}

export function LogoutUser(): boolean {
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
    // const server_api_url = import.meta.env.VITE_API_SERVER_URL ?? "http://localhost:5153/api/";
    return returned;
}
