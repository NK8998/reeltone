"use client";

import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import React, { useState, useEffect } from "react";

// Define a type for the user data to ensure consistency and better type-checking
interface Member {
  user_id: string;
  username: string;
  pfp_url: string;
  bio: string;
  recentActivity: string;
}

// Define the different states for the view
type ViewState = "all" | "followers" | "following";

const Members: React.FC = () => {
  // Use a hardcoded user ID to match the mock data in the Flask backend
  const currentUserId = "12345";

  // State to hold the different lists of members
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [followers, setFollowers] = useState<Member[]>([]);
  const [following, setFollowing] = useState<Member[]>([]);

  // State to manage the current view (all, followers, or following)
  const [currentView, setCurrentView] = useState<ViewState>("all");

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all data from the backend
  const fetchAllData = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all members
      const allMembersResponse = await fetch(
        "http://localhost:8888/api/members/all"
      );
      if (!allMembersResponse.ok)
        throw new Error("Failed to fetch all members");
      const allMembersData = await allMembersResponse.json();
      setAllMembers(allMembersData.members);

      // Fetch followers for the current user
      const followersResponse = await fetch(
        "http://localhost:8888/api/members/follows/followers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      if (!followersResponse.ok) throw new Error("Failed to fetch followers");
      const followersData = await followersResponse.json();
      setFollowers(followersData.followers);

      // Fetch who the current user is following
      const followingResponse = await fetch(
        "http://localhost:8888/api/members/follows/following",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      if (!followingResponse.ok)
        throw new Error("Failed to fetch who user is following");
      const followingData = await followingResponse.json();
      setFollowing(followingData.following);
    } catch (err: any) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // We will use the hardcoded ID since Clerk is not available
    fetchAllData(currentUserId);
  }, [currentUserId]);

  // Function to handle the follow/unfollow button click
  const handleFollowToggle = async (memberId: string) => {
    if (!currentUserId) return; // Don't proceed if there is no logged-in user

    // Check if the current user is already following this member
    const isFollowing = following.some((member) => member.user_id === memberId);

    // Determine the API endpoint based on the follow status
    const endpoint = isFollowing
      ? "http://localhost:8888/api/members/follows/remove"
      : "http://localhost:8888/api/members/follows/add";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          follower_id: currentUserId,
          following_id: memberId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update follow status");
      }

      // Re-fetch all data to ensure the UI is in sync with the backend
      await fetchAllData(currentUserId);
    } catch (err) {
      console.error("Error toggling follow status:", err);
      // Optionally, show an error message to the user
    }
  };

  // Function to render the list of members based on the current view
  const renderMembers = () => {
    let membersToDisplay: Member[] = [];
    let title = "";

    switch (currentView) {
      case "all":
        membersToDisplay = allMembers;
        title = "All Community Members";
        break;
      case "followers":
        membersToDisplay = followers;
        title = "My Followers";
        break;
      case "following":
        membersToDisplay = following;
        title = "Following";
        break;
    }

    if (membersToDisplay.length === 0) {
      return (
        <p className='text-gray-400 text-center'>
          No members found in this list.
        </p>
      );
    }

    return (
      <>
        <h2 className='text-3xl font-bold text-gray-100 text-center mb-8'>
          {title}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {membersToDisplay.map((member) => {
            const isCurrentUser = member.user_id === currentUserId;
            const isFollowing = following.some(
              (f) => f.user_id === member.user_id
            );

            return (
              <div
                key={member.user_id}
                className={`flex items-start p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-2xl 
                  ${
                    isCurrentUser
                      ? "bg-indigo-700 text-white border-2 border-indigo-400"
                      : "bg-slate-800 text-gray-100"
                  }`}
              >
                <img
                  src={member.pfp_url}
                  alt={`${member.username}'s profile`}
                  className='w-16 h-16 rounded-full mr-6 object-cover border-2 border-gray-600'
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevents infinite loop
                    e.currentTarget.src =
                      "https://placehold.co/100x100/1F2937/FFFFFF?text=PFP";
                  }}
                />
                <div className='flex-grow'>
                  <h3 className='text-xl font-bold mb-1'>{member.username}</h3>
                  <p className='text-sm text-gray-300 mb-2'>{member.bio}</p>
                  <p className='text-xs text-gray-400 italic mb-4'>
                    {member.recentActivity}
                  </p>

                  {/* The follow button is not shown for the current user */}
                  {!isCurrentUser && (
                    <button
                      onClick={() => handleFollowToggle(member.user_id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors 
                        ${
                          isFollowing
                            ? "bg-gray-600 text-gray-100 hover:bg-gray-700"
                            : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className='text-center text-lg font-medium text-gray-400 mt-20'>
        Loading members...
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-lg font-medium text-red-500 mt-20'>
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className='font-sans p-8 max-w-7xl mx-auto bg-slate-900 text-gray-100 min-h-screen'>
        <nav className='flex justify-center gap-4 mb-8'>
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentView === "all"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-800 text-gray-400 hover:bg-slate-700"
            }`}
            onClick={() => setCurrentView("all")}
          >
            All Members
          </button>
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentView === "followers"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-800 text-gray-400 hover:bg-slate-700"
            }`}
            onClick={() => setCurrentView("followers")}
          >
            Followers ({followers.length})
          </button>
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentView === "following"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-800 text-gray-400 hover:bg-slate-700"
            }`}
            onClick={() => setCurrentView("following")}
          >
            Following ({following.length})
          </button>
        </nav>
        {renderMembers()}
      </div>
      <Footer />
    </>
  );
};

export default Members;
