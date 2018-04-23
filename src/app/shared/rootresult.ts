import { Movie } from "./movie";

export interface RootResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: Movie[];
}