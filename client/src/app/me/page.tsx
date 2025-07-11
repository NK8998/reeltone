"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";

import "./page.css";

// Define a type for the user data you expect from your backend
interface UserProfileData {
  id: string;
  username: string;
  email: string;
  // Add any other fields you expect from your backend
}

// A dedicated component for displaying the user profile
const UserProfile = ({ userProfile }: { userProfile: UserProfileData }) => (
  <div className="profile-details">
    <h1>Welcome, {userProfile.username}!</h1>
    <p>Email: {userProfile.email}</p>
    {/* Render other user data as needed */}
  </div>
);

export default function Me() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // State for managing the fetched user data
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for handling errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait until the user is loaded from Clerk
    if (!isLoaded) {
      return;
    }

    // If the user is not signed in, redirect them
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    // Fetch the user data from the backend
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await backendService.meData(user.id);
        setUserProfile(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load your profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user, router]);

  // Main render logic
  const renderContent = () => {
    
    if (userProfile) {
      return <UserProfile userProfile={userProfile} />;
    }

    return null; // Or some fallback UI
  };

  return (
    <div className='me-page'>
      <Navbar />
      <main className='main-content'>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}