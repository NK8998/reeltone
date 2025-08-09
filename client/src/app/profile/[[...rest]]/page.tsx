import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='profile-page'>
      <Navbar />
      <main className='profile-content'>
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
}
