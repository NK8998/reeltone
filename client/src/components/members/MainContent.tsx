import FeaturedMembers from "./FeaturedMembers";
import Followers from "./Followers";
import Following from "./Following";
import "./style.css";
import { MembersPage } from "@/types/types";

export default function MainContent({ data }: { data: MembersPage }) {
  return (
    <div className='main-content'>
      <FeaturedMembers members={data.members ?? []} />
      <Following members={data.following ?? []} />
      <Followers members={data.followers ?? []} />
    </div>
  );
}
