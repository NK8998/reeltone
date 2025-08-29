import Footer from "@/components/reusables/Footer/Footer";
import LegalNav from "@/components/reusables/Navbar/LegalNav";
import Navbar from "@/components/reusables/Navbar/Navbar";

export default function CookiePolicy() {
  return (
    <>
      <LegalNav />
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Cookie Policy</h1>
        <p className='mb-4'>
          Reeltone uses cookies to improve your browsing experience. Here’s how:
        </p>
        <ul className='list-disc pl-6 space-y-2'>
          <li>
            We use cookies to remember your preferences (e.g., language, theme).
          </li>
          <li>Cookies help us keep you signed in securely.</li>
          <li>
            Analytics cookies track how you use Reeltone to improve our
            features.
          </li>
          <li>
            We may use cookies to personalize recommendations and film
            suggestions.
          </li>
          <li>
            Third-party services (like analytics or ads) may also set their own
            cookies.
          </li>
          <li>
            You can clear or block cookies in your browser settings at any time.
          </li>
          <li>
            Disabling cookies may affect certain functionality (like login or
            saved lists).
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
