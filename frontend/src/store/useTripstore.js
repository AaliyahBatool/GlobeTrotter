import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

export const useTripStore = create(
  devtools((set) => ({
    trip: null,

    setTrip: (tripData) => set({ trip: tripData }),

    createTrip: async (tripData) => {
      try {
        const response = await axiosInstance.post("/trips", tripData);
        set({ trip: response.data });
        return response.data;
      } catch (error) {
        console.error("Error creating trip:", error);
        throw error;
      }
    }
  }))
);
