import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/sea-green";

import { FilmPageReview } from "@/types/types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./style.css";
import Link from "next/link";
import Rating from "../reusables/Comment/Rating";

interface FriendsActivityProps {
  friendsActivities: FilmPageReview[];
}

export default function FriendsActivity({
  friendsActivities,
}: FriendsActivityProps) {
  return (
    <section className='py-6 px-2 sm:px-6 lg:px-8 rounded-md friends-activity-container'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2'>
        <h2 className='font-semibold text-gray-300 text-base'>
          New From Friends
        </h2>
        <Link href='#' className='text-sm text-blue-500 hover:underline'></Link>
      </div>

      <div className='space-y-4'>
        {friendsActivities.length === 0 ? (
          <p className='text-gray-500'>No activity from friends yet.</p>
        ) : (
          <Splide
            aria-label="Friends' Watched Films"
            options={{
              perPage: 4,
              gap: "5px",
              pagination: false,
              arrows: true,
              breakpoints: {
                1024: { perPage: 3 },
                640: { perPage: 2 },
                400: { perPage: 1 },
              },
            }}
            className='mb-6'
          >
            {friendsActivities
              .filter((activity) => activity.film_poster)
              .map((activity) => (
                <SplideSlide
                  key={activity.id}
                  className='rounded-md overflow-hidden w-36 h-full'
                >
                  <Link
                    href={`/film/${activity.film_id}`}
                    className='relative block w-36 h-56 overflow-hidden'
                    style={{ borderRadius: "4px" }}
                  >
                    <img
                      src={activity.film_poster!}
                      alt={activity.film_title}
                      style={{ borderRadius: "4px" }}
                      className='w-full h-full object-cover shadow'
                    />
                    <div
                      className='absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-1 text-sm w-full flex gap-1 overflow-hidden text-ellipsis'
                      style={{ backgroundColor: "#747c7c" }}
                    >
                      <img
                        src={activity.pfp_url ?? "/svgs/default-user-icon.svg"}
                        alt={activity.username}
                        className='w-5 h-5 rounded-full inline-block mr-2'
                      />
                      <span
                        className='font-semibold text-ellipsis overflow-hidden whitespace-nowrap '
                        style={{ fontSize: "12px" }}
                      >
                        {activity.username}
                      </span>
                    </div>
                  </Link>
                  {activity.rating != null && (
                    <Rating rating={activity.rating} />
                  )}
                </SplideSlide>
              ))}
          </Splide>
        )}
      </div>
    </section>
  );
}
