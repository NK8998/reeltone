import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface EnticerProps {
  filmId?: number;
  filmTitle?: string;
}

export default function EnticerBox({ filmId, filmTitle }: EnticerProps) {
  const { user } = useUser();

  return (
    <section className='limited-width enticer-block'>
      <p className='e-primary'>
        Write and share reviews. Follow your friends. Share your life in film.
      </p>
      <p className='e-secondary'>
        Below are some popular Revies from {filmTitle},
        {user ? (
          <Link href={`/film/${filmId}`}> Write Yours Too</Link>
        ) : (
          <Link href={"/auth/sign-up"}> Sign Up</Link>
        )}{" "}
        and be part of the community
      </p>
    </section>
  );
}
