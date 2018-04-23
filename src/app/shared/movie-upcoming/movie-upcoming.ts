import { Movie } from "../movie";

export interface UpcomingMovies{
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
}