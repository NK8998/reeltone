import axios from "axios";
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8888";

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const backendService = {
  landingData: async () => {
    try {
      const response = await axiosInstance.get("/landing/all");
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching landing data:", error);
      throw error;
    }
  },
};
