import { RewatchIcon } from "@/assets/icons";
import { WatchedFilm, WatchlistFilm } from "@/types/types";
import { Repeat } from "lucide-react";
import Link from "next/link";

type UserContent = {
  userContent: WatchedFilm[] | WatchlistFilm[];
  title: React.ReactNode;
  icon: React.ReactNode;
};

export default function ContentRenderer({
  userContent,
  title,
  icon,
}: UserContent) {
  return (
    <section className='py-6 px-2 sm:px-6 lg:px-8 rounded-md'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-1'>
        <h2 className='font-semibold mb-2 text-gray-300 flex items-center gap-2 content-title'>
          {title} {icon}
        </h2>
      </div>
      <div className='film-grid film-grid-user-content'>
        {userContent.map((content, index) => (
          <Link
            href={`/film/${content.film_id}`}
            key={`${content.film_id}-${index}`}
            className='film-item relative'
            prefetch={false}
          >
            <div className='content-overlay absolute inset-0'>
              {content.rewatching ? <RewatchIcon /> : null}
            </div>
            <img
              src={content.film_poster ?? "/images/loading.jpg"}
              alt={content.film_title ?? ""}
              className='object-cover rounded-b-xs'
            />
            <span className='title-overlay'>{content.film_title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
