import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import MainContent from "@/components/landing/MainContent";
import { LandingDataType } from "@/types/types";

export default async function Landing() {
  const landingData: LandingDataType = await backendService.landingData();
  return (
    <div className='landing-page'>
      <Navbar />
      <main className='landing-main'>
        <MainContent landingData={landingData} loading={false} />
      </main>
      <Footer />
    </div>
  );
}
