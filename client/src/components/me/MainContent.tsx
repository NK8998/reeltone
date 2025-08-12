import { mePageTypes } from "@/types/types";
import FriendsActivity from "./FriendsActivity";
import RecentReviews from "./RecentReviews";
import TopRated from "./TopRated";
import NowPlaying from "./NowPlaying";
import { useUser } from "@clerk/nextjs";
import ContentRenderer from "./ContentRenderer";
import { Clock, Eye } from "lucide-react";

interface MainContentProps {
  data: mePageTypes;
}
export default function MainContent({ data }: MainContentProps) {
  const { user } = useUser();
  return (
    <div>
      <h3 className='text-2xl font-thin text-gray-300 mb-8 mt-15 px-4 sm:px-6 lg:px-8 text-center'>
        Welcome back, <span className='text-gray-500'>{user?.firstName}</span>.
        Here’s what your friends have been watching…
      </h3>
      <FriendsActivity friendsActivities={data.friends_activity ?? []} />
      <ContentRenderer
        userContent={data.user_content.watchlist ?? []}
        title='Watchlist'
        icon={<Clock fill='#3A9196' />}
      />
      <TopRated top_rated={data.top_rated ?? []} />
      <NowPlaying now_playing={data.now_playing ?? []} />
      <ContentRenderer
        userContent={data.user_content.watched ?? []}
        title='Watched'
        icon={<Eye fill='orange' />}
      />
      <RecentReviews reviews={data.reviews ?? []} />
    </div>
  );
}
