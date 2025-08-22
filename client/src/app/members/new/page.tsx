import { backendService } from "@/services/backendService";
import "./page.css";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { MembersPage } from "@/types/types";
import MainContent from "@/components/members/MainContent";
import Navbar from "@/components/reusables/Navbar/Navbar";
import Footer from "@/components/reusables/Footer/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { getQueryClient } from "@/services/getQueryClient";

export default async function Page() {
  const user = await currentUser();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<MembersPage>({
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
        <HydrationBoundary state={dehydrate(queryClient)}>
          {user && <MainContent userId={user.id} />}
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
