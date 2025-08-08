import "./footer.css";
export default function Footer() {
  return (
    <footer className='footer  mt-10'>
      {/* Bottom Bar */}
      <div className=' mt-6 py-4 text-center text-xs text-gray-500'>
        <p>© {new Date().getFullYear()} ReelTone. All rights reserved.</p>
        <p className='mt-1'>
          Made with <span className='text-red-500'>♥</span> by the ReelTone Team
        </p>
      </div>
    </footer>
  );
}
