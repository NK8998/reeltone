import { Member } from "@/types/types";
import MemberCard from "./MemberCard";
import Link from "next/link";

export default function FeaturedMembers({ members }: { members: Member[] }) {
  return (
    <section className='featured-members'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2'>
        <h2 className='font-semibold text-gray-300 text-base'>
          Featured Members
        </h2>
      </div>
      <div className='members-grid'>
        {members.map((member) => {
          return <MemberCard key={member.id} member={member} followButton />;
        })}
      </div>
    </section>
  );
}
