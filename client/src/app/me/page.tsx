"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";

import "./page.css";

// (Keep your UserProfileData and UserProfile components as they are)
interface UserProfileData {
  id: string;
  username: string;
  email: string;
}

const UserProfile = ({ userProfile }: { userProfile: UserProfileData }) => (
  <div className="profile-details">
    <h1>Welcome, {userProfile.username}!</h1>
    <p>Email: {userProfile.email}</p>
  </div>
);

// A simple component for loading spinners or messages
const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;

export default function Me() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Clerk is still loading, do nothing yet.
    if (!isLoaded) {
      return;
    }

    // Redirect if the user is not signed in.
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    const fetchUserData = async () => {
      // No need to set isLoading here, we use the initial state.
      try {
        const data = await backendService.meData(user.id);
        setUserProfile(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        // Set loading to false after the fetch attempt is complete.
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user, router]);

  // Consolidate the loading check
  const isPageLoading = !isLoaded || isLoading;

  return (
    <div className='me-page'>
      <Navbar />
      <main className='main-content'>
        {/* 1. Show a loading indicator first */}
        {isPageLoading && <LoadingSpinner />}

        {/* 2. Show an error message if something went wrong */}
        {error && <p className="error-message">{error}</p>}

        {/* 3. Show the profile only when loading is done and there's no error */}
        {!isPageLoading && !error && userProfile && (
          <UserProfile userProfile={userProfile} />
        )}
      </main>
      <Footer />
    </div>
  );
}