import { FriendActivity } from "@/types/types";

interface FriendsActivityProps {
    friendsActivities: FriendActivity[];
}

export default function FriendsActivity({ friendsActivities }: FriendsActivityProps) {
    return (
        <section className="py-6 px-4 sm:px-6 lg:px-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-300">Friends’ Recent Activity</h2>
            <div className="space-y-4">
                {friendsActivities.length === 0 ? (
                    <p className="text-gray-500">No activity from friends yet.</p>
                ) : (
                    friendsActivities.map((activity) => (
                        <div
                            key={activity.review_id}
                            className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">User ID: {activity.user_id}</span>
                                <span className="text-sm text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-800">{activity.content}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                Likes: <span className="font-medium">{activity.like_count}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
