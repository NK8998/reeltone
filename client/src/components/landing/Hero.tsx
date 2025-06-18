import { Film } from "@/types/types";
import { useUser } from "@clerk/nextjs";

export default function Hero({
  trending_film,
}: {
  trending_film: Film | null;
}) {
  const { isSignedIn } = useUser();
  return (
    <section className='hero'>
      <h1>Discover. Review. Connect.</h1>
      <p>Join a global community of film lovers.</p>
      {!isSignedIn && (
        <div className='auth-buttons'>
          <a href='/auth/sign-up' className='cta'>
            Sign Up
          </a>
          <a href='/auth/sign-in' className='cta secondary'>
            Sign In
          </a>
        </div>
      )}
    </section>
  );
}
