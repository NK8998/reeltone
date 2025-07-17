import { LandingDataType } from "@/types/types";
import axios, { AxiosResponse } from "axios";
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
      const response: AxiosResponse<LandingDataType> = await axiosInstance.get(
        "/landing/all"
      );
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching landing data:", error);
      throw error;
    }
  },
  meData: async (user_id: string) => {
    try {
      const response = await axiosInstance.get("/me/all?user_id=" + user_id);
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching me data:", error);
      throw error;
    }
  },
  filmsData: async () => {
    try {
      const response = await axiosInstance.get("/films/all");
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching films data:", error);
      throw error;
    }
  },
  filmData: async (query: string, user_id?: string) => {
    try {
      const response = await axiosInstance.get(
        "/film/all?query=" + query + "&user_id=" + user_id
      );
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching film data:", error);
      throw error;
    }
  },
  membersData: async (user_id: string) => {
    try {
      const response = await axiosInstance.get(
        "/members/all?user_id=" + user_id
      );
      if (!response || response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching members data:", error);
      throw error;
    }
  },
  addMember: async (
    user_id: string,
    username: string,
    email: string,
    pfp_url: string
  ) => {
    try {
      const response = await axiosInstance.post("/members/add", {
        user_id,
        username,
        email,
        pfp_url,
      });
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  },
};
