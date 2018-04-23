// export interface Movie {
    
//     // constructor(
//     //     public vote_count: number,
//     //     public id: number,
//     //     public video: boolean,
//     //     public vote_average: number,
//     //     public title: string,
//     //     public popularity: number,
//     //     public poster_path: string,
//     //     public original_language: string,
//     //     public original_title: string,
//     //     public genre_ids: number[],
//     //     public backdrop_path: string,
//     //     public adult: boolean,
//     //     public overview: string,
//     //     public release_date: string)
//     //     {}
    
//     // constructor(public t1: string, public t2: string)
//     // {}
// }
export interface Movie{
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
}