import { useCallback } from "react";
import { API_KEY } from "@env";
import { IHistory } from "@/types";
import { useApi } from "../hooks/useApi";

const getPlaces = useCallback(
  async (value: string): Promise<IHistory[] | undefined> => {
    const { get } = useApi();

    if (!value.trim()) return;

    try {
      const { status, results } = await get(
        `maps/api/place/textsearch/json?query=${value}&key=${API_KEY}`
      );

      if (status === "OK") {
        //   setPlaces(results);
        return results;
      }
      return;
    } catch (error) {
      console.error("Error fetching history", error);
    }
  },
  []
);

export { getPlaces };
