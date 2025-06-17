export default function Hero() {

    return (
        <section className='hero'>
          <h1>Discover. Review. Connect.</h1>
          <p>Join a global community of film lovers.</p>
          <div className="auth-buttons">
            <a href="/auth/sign-up" className="cta">Sign Up</a>
            <a href="/auth/sign-in" className="cta secondary">Sign In</a>
          </div>
        </section>
    )
}