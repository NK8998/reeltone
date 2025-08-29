import LegalNav from "@/components/reusables/Navbar/LegalNav";

export default function PrivacyPolicy() {
  return (
    <>
      <LegalNav />
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Privacy Policy</h1>
        <p className='mb-4'>
          At Reeltone, we value your privacy. Here’s what you should know:
        </p>
        <ul className='list-disc pl-6 space-y-2'>
          <li>We collect account details you provide (e.g., name, email).</li>
          <li>
            Usage data (searches, favorites, and interactions) is logged to
            improve recommendations.
          </li>
          <li>
            We do not sell or trade your personal information to third parties.
          </li>
          <li>
            Data may be shared with trusted partners (e.g., hosting, analytics)
            to run Reeltone.
          </li>
          <li>
            Your information is stored securely with encryption where
            applicable.
          </li>
          <li>
            You can request deletion of your account and associated data at any
            time.
          </li>
          <li>
            We comply with applicable privacy laws (e.g., GDPR/CCPA where
            relevant).
          </li>
          <li>
            Policy updates will be posted here with a revised “last updated”
            date.
          </li>
        </ul>
      </div>
    </>
  );
}
