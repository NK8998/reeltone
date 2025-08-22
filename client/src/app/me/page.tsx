import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import MainContent from "@/components/me/MainContent";
import { currentUser } from "@clerk/nextjs/server";

export default async function Me() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const data = await backendService.meData(user?.id);

  return (
    <div className='me-page'>
      <Navbar />
      <main className='main-content'>
        <MainContent data={data} />
      </main>
      <Footer />
    </div>
  );
}
