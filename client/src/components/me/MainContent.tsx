import { mePageTypes } from "@/types/types"
import FriendsActivity from "./FriendsActivity"
import RecentFilms from "./RecentFilms"
import RecentReviews from "./RecentReviews"

interface MainContentProps {
    data: mePageTypes
}
export default function MainContent({ data }: MainContentProps) {

    return (
        <div>
            <FriendsActivity friendsActivities={data.friends_activity} />
            <RecentFilms recent_films={data.recent_films} />
            <RecentReviews reviews={data.reviews}/>
        </div>
    )
}