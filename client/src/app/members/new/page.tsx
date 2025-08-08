"use client";
import { backendService } from "@/services/backendService";
import "./page.css";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { MembersPage } from "@/types/types";
import MainSectionError from "@/components/reusables/MainSectionError";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainContent from "@/components/members/MainContent";
import Navbar from "@/components/reusables/Navbar/Navbar";
import Footer from "@/components/reusables/Footer/Footer";

export default function Page() {
  const { user } = useUser();

  const { data, isError, error, isLoading } = useQuery<MembersPage>({
    queryKey: ["membersData", user?.id],
    queryFn: () => backendService.getMembersPageData(user?.id),
  });

  return (
    <div className='members-page'>
      <Navbar />
      <main className='members-main'>
        <h1 className='page-intro'>
          Film lovers, critics and friends — find popular members.
        </h1>
        {isError && <MainSectionError errorMessage={error.message} />}
        {isLoading && <MainSectionLoader />}
        {data && <MainContent data={data} />}
      </main>
      <Footer />
    </div>
  );
}
