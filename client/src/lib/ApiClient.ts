import axios, { AxiosError, AxiosInstance } from "axios";

export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8888";
}

class ApiClient {
  private axiosInstance: AxiosInstance;
  private baseURL: string;
  private token: string | null = null;
  private tokenExpiration: number | null = null;

  constructor() {
    this.baseURL = getBackendUrl();
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //to implement
  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const isProtected = config.headers?.["x-protected"] === "true";

        if (isProtected) {
          await this.ensureValidToken();
          if (this.token) {
            config.headers["Authorization"] = `Bearer ${this.token}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.warn(
            "Unauthorized access - possible missing or expired token."
          );
        }
        return Promise.reject(error);
      }
    );
  }

  private async fetchClerkToken(): Promise<{
    token: string;
    expiresIn: number;
  }> {
    try {
      const res = await fetch("/api/get-token");
      if (!res.ok) {
        throw new Error("Failed to retrieve token");
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching Clerk token:", error);
      throw error;
    }
  }

  private async ensureValidToken(): Promise<void> {
    const tokenExpiringSoon = this.tokenExpiration
      ? Date.now() >= this.tokenExpiration - 5000 // 5s buffer
      : true;

    if (!this.token || tokenExpiringSoon) {
      const { token, expiresIn } = await this.fetchClerkToken();
      this.token = token;
      this.tokenExpiration = Date.now() + expiresIn * 1000;
    }
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }
}

const axiosInstance = new ApiClient().getAxiosInstance();

export default axiosInstance;
