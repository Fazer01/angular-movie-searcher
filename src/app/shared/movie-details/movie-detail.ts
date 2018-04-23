import { MovieGenre } from "./movie-genre";
import { MovieCollection } from "./movie-collection";
import { ProductionCompany } from "./movie-productioncompany";
import { ProductionCountry } from "./movie-productioncountry";
import { MovieLanguage } from "./movie-language";

export class MovieDetail {

    constructor (
        public adult: boolean,
        public backdrop_path: string,
        public belongs_to_collection: MovieCollection,
        public budget: number,
        public genres: MovieGenre[],
        public homepage: string,
        public id: number,
        public imdb_id: string,
        public original_language: string,
        public original_title: string,
        public overview: string,
        public popularity: number,
        public poster_path: string,
        public production_companies: ProductionCompany[],
        public production_countries: ProductionCountry[],
        public release_date: string,
        public revenue: number,
        public runtime: number,
        public spoken_languages: MovieLanguage[],
        public status: string,
        public tagline: string,
        public title: string,
        public video: boolean,
        public vote_average: number,
        public vote_count: number)
        {}
    
}