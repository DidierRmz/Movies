import HTTP from "@/api/client-http";
import { defineStore } from "pinia";
import type { Movie } from "@/model/movie.model";

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    listMovies: [] as Movie[],
  }),
  actions: {
    async getMovies(search: string = 'movies') {
      try {
        const resp = await HTTP.get('', {
          params: {
            s: search,
          },
        });
        this.listMovies = resp.data.Search;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
  },
});
