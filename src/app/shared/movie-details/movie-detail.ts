import { MovieGenre } from "./movie-genre";
import { MovieCollection } from "./movie-collection";
import { ProductionCompany } from "./movie-productioncompany";
import { ProductionCountry } from "./movie-productioncountry";
import { MovieLanguage } from "./movie-language";

export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: MovieCollection;
    budget: number;
    genres: MovieGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: MovieLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number
}