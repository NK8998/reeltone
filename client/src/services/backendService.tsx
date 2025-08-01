import { FilmData, FilmPageReview, LandingDataType } from "@/types/types";
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
  landingData: async (): Promise<LandingDataType> => {
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
  filmData: async (query: string, user_id?: string): Promise<FilmData> => {
    try {
      const response: AxiosResponse<FilmData> = await axiosInstance.get(
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
  addToWatchList: async (
    user_id: string,
    film_id: number,
    film_title: string,
    film_poster: string
  ) => {
    try {
      const response = await axiosInstance.post("/film/watchlist", {
        user_id,
        film_id,
        film_title,
        film_poster,
      });
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      throw error;
    }
  },
  addToFavourites: async (user_id: string, film_id: string) => {
    try {
      const response = await axiosInstance.post("/film/like", {
        user_id,
        film_id,
      });
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding to favourites:", error);
      throw error;
    }
  },
  addToWatched: async (
    user_id: string,
    film_id: number,
    film_title: string,
    film_poster: string
  ) => {
    try {
      const response = await axiosInstance.post("/film/watched", {
        user_id,
        film_id,
        film_title,
        film_poster,
      });
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding to watched:", error);
      throw error;
    }
  },
  addReview: async (
    user_id: string,
    username: string,
    pfp_url: string,
    film_id: number,
    review_text: string,
    rating?: number,
    film_title?: string,
    film_poster?: string
  ) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("username", username);
    data.append("pfp_url", pfp_url);
    data.append("film_id", film_id.toString());
    data.append("review_text", review_text);
    if (rating) {
      data.append("rating", rating.toString());
    }
    if (film_title) {
      data.append("film_title", film_title);
    }
    if (film_poster) {
      data.append("film_poster", film_poster);
    }
    try {
      const response: AxiosResponse<{
        message: string;
        film_data: FilmPageReview;
      }> = await axiosInstance.post("/film/reviews/add", data);
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },
  editReview: async (
    user_id: string,
    review_id: number,
    review_text: string,
    rating: number
  ) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("review_id", review_id.toString());
    data.append("new_content", review_text);
    data.append("rating", rating.toString());

    try {
      const response: AxiosResponse<{
        message: string;
        film_data: FilmPageReview;
      }> = await axiosInstance.post("/film/reviews/edit", data);
      if (!response || response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      console.error("Error editing review:", error);
      throw error;
    }
  },
};
