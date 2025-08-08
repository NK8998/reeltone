import { useState } from "react";
import { useUser } from "@clerk/nextjs"; // guessing based on your context
import { useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { Member } from "@/types/types";
import { backendService } from "@/services/backendService";

export default function MemberCard({
  member,
  followButton = false,
}: {
  member: Member;
  followButton?: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState<boolean>(member.is_following);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const followUser = async () => {
    if (!user) return;

    setIsFollowing(!isFollowing);

    backendService
      .followMember(String(user.id), String(member.user_id))
      .then((response) => {
        console.log(response.message);

        // 🔥 Tell React Query this data is stale
        queryClient.invalidateQueries({
          queryKey: ["membersData", user.id],
        });
      })
      .catch((error) => {
        console.error("Error following user:", error);
        setIsFollowing(!isFollowing);
      });
  };

  return (
    <div className='member-card'>
      <img src={member.pfp_url} alt={member.username} />
      <h3>{member.username}</h3>
      {user && String(user.id) !== String(member.user_id) && followButton && (
        <button
          onClick={followUser}
          className={isFollowing ? "following" : "not-following"}
        >
          {isFollowing ? <Minus /> : <Plus />}
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}
