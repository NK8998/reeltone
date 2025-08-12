// types for landing page data
export interface Film {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  poster_url: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  backdrop_url: string | null;
  backdrop_path: string | null;
  popularity: number;
}

export interface AuthorDetails {
  avatar_path: string | null;
  name: string;
  rating: number | null;
  username: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
  author_details: AuthorDetails;
}

export interface RecentReviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface LandingDataType {
  trending_film: Film | null;
  top_6_recent_films: Film[];
  recent_films: Film[];
}
// types for landing page data

//types for film page data
export type CastMember = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CrewMember = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type RelatedFilm = {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type UserFlags = {
  has_liked: boolean;
  in_watchlist: boolean;
  watched: boolean;
};

export type EssentialData = {
  backdrop_path: string;
  cast: CastMember[];
  crew: CrewMember[];
  genres: string[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: string[];
  production_countries: string[];
  release_date: string;
  run_time: number;
  runtime: number;
  spoken_languages: string[];
  title: string;
  trailer: string; // Replace if known
  vote_average: number;
  vote_count: number;
};

export type FilmPageReview = {
  id: number;
  user_id: number;
  username: string;
  pfp_url?: string | null;
  film_id: number;
  film_title: string;
  film_poster?: string | null;
  rating?: number | null; // optional in case it's not always provided
  review_text?: string | null;
  is_parent: boolean;
  parent_id?: number | null;
  like_count: number;
  created_at: string; // or Date, depending on how you parse it
  updated_at: string; // same as above
};

export type FilmData = {
  essential_data: EssentialData;
  related_films: RelatedFilm[];
  reviews: FilmPageReview[]; // Replace if structure becomes known
  user_flags: UserFlags;
};
//types for film page data

//types for me page data

// recentFilm.ts

// friendActivity.ts
export type FriendActivity = {
  review_id: string;
  user_id: string;
  film_id: string;
  content: string;
  like_count: number;
  created_at: string;
  follower_id: string;
};

// review.ts
export type MeReview = {
  id: string;
  user_id: string;
  film_id: string;
  content: string;
  like_count: number;
  created_at: string;
  username: string;
  profile_picture: string;
};

export type WatchedFilm = {
  film_id: number;
  film_title: string | null;
  film_poster: string | null;
  watched_at: string;
  rewatching: number;
};

export type WatchlistFilm = {
  film_id: number;
  film_title: string | null;
  film_poster: string | null;
  added_at: string;
  rewatching: number;
};

export interface mePageTypes {
  top_rated: Film[];
  now_playing: Film[];
  friends_activity: FilmPageReview[];
  reviews: FilmPageReview[];
  user_content: {
    watched: WatchedFilm[];
    watchlist: WatchlistFilm[];
  };
}
//types for me page data

//types for films page data
export interface FilmsPageData {
  popular_films: Film[];
  reviewed_films: FilmPageReview[];
}
//types for films page data

//types for filter data
export interface FilteredFilms {
  filtered_films: Film[];
}

//types for members page

export type Member = {
  id: number;
  email: string;
  joined_at: string;
  pfp_url: string;
  user_id: string;
  username: string;
  is_following: boolean;
};

export interface MembersPage {
  members: Member[];
  followers: Member[];
  following: Member[];
}
