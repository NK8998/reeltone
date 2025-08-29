import LegalNav from "@/components/reusables/Navbar/LegalNav";

export default function TermsOfService() {
  return (
    <>
      <LegalNav />
      <main className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Terms of Service</h1>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            <strong>Acceptance of Terms:</strong> By using ReelTone, you agree
            to these Terms of Service. If you do not agree, please discontinue
            use of the site.
          </li>
          <li>
            <strong>Eligibility:</strong> You must be at least 13 years old to
            use ReelTone. If you are under 18, you confirm you have parental
            consent.
          </li>
          <li>
            <strong>User Accounts:</strong> You are responsible for maintaining
            the confidentiality of your login credentials and for all activity
            under your account.
          </li>
          <li>
            <strong>Acceptable Use:</strong> You agree not to misuse ReelTone,
            such as uploading harmful content, violating laws, infringing
            intellectual property rights, or attempting to interfere with the
            platform.
          </li>
          <li>
            <strong>Content Ownership:</strong> All content and materials on
            ReelTone (logos, design, code, text, media) are owned by or licensed
            to ReelTone. You may not copy, modify, or distribute without
            permission.
          </li>
          <li>
            <strong>User Content:</strong> By uploading or sharing content, you
            grant ReelTone a non-exclusive, worldwide, royalty-free license to
            use, display, and distribute it for platform functionality.
          </li>
          <li>
            <strong>Third-Party Services:</strong> ReelTone may integrate with
            third-party tools (e.g., Google login). We are not responsible for
            their services, terms, or policies.
          </li>
          <li>
            <strong>Service Availability:</strong> We do not guarantee
            uninterrupted or error-free service. ReelTone may suspend or
            terminate access at any time for maintenance, updates, or misuse.
          </li>
          <li>
            <strong>Limitation of Liability:</strong> ReelTone is not liable for
            any indirect, incidental, or consequential damages arising from the
            use of our services.
          </li>
          <li>
            <strong>Termination:</strong> We reserve the right to suspend or
            terminate accounts that violate these terms or disrupt platform
            usage.
          </li>
          <li>
            <strong>Changes to Terms:</strong> ReelTone may update these Terms
            of Service at any time. Continued use of the platform means
            acceptance of the updated terms.
          </li>
          <li>
            <strong>Governing Law:</strong> These Terms are governed by the laws
            of Kenya (or your jurisdiction if specified later). Any disputes
            will be resolved under these laws.
          </li>
          <li>
            <strong>Contact Us:</strong> For questions or concerns about these
            Terms, please contact us at{" "}
            <a href='mailto:support@reeltone.com' className='text-blue-600'>
              support@reeltone.com
            </a>
            .
          </li>
        </ul>
      </main>
    </>
  );
}
