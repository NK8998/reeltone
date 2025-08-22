"use client";
import { backendService } from "@/services/backendService";
import FeaturedMembers from "./FeaturedMembers";
import Followers from "./Followers";
import Following from "./Following";
import "./style.css";
import { MembersPage } from "@/types/types";
import MainSectionError from "../reusables/MainSectionError";
import MainSectionLoader from "../reusables/MainSectionLoader";
import { useQuery } from "@tanstack/react-query";

export default function MainContent({ userId }: { userId: string }) {
  const { data, isError, error, isLoading } = useQuery<MembersPage>({
    queryKey: ["membersData", userId],
    queryFn: () => backendService.getMembersPageData(userId),
  });
  if (isError) return <MainSectionError errorMessage={error.message} />;
  if (isLoading) return <MainSectionLoader />;

  return data ? (
    <div className='main-content'>
      <FeaturedMembers members={data.members ?? []} />
      <Following members={data.following ?? []} />
      <Followers members={data.followers ?? []} />
    </div>
  ) : null;
}
