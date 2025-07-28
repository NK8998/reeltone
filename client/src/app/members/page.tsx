"use client";

import { useEffect, useState } from "react";

interface Member {
  id: number;
  user_id: string;
  username: string;
  email: string;
  pfp_url: string;
  created_at: string;
}

const USER_ID = "user_2zrbPjqNbYNWVvNppoVv5g1jwJL"; // Replace with logged-in user's ID

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [followers, setFollowers] = useState<Member[]>([]);
  const [following, setFollowing] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState("discover");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8888/members/all?user_id=" + USER_ID)
      .then((res) => res.json())
      .then((data) => {
        const format = (list: any[]) =>
          (list || []).map((m: any) => ({
            id: m.id || m[0],
            user_id: m.user_id || m[1],
            username: m.username || m[2],
            email: m.email || m[3],
            pfp_url: m.pfp_url || m[4],
            created_at: m.created_at || m[5],
          }));

        setMembers(format(data.members));
        setFollowers(format(data.followers));
        setFollowing(format(data.following));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading members:", err);
        setLoading(false);
      });
  }, []);

  const toggleFollow = async (targetUserId: string) => {
    try {
      await fetch("http://127.0.0.1:8888/members/follows/add", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          follower_id: USER_ID,
          followed_id: targetUserId,
        }),
      });
      // Reload lists
      window.location.reload();
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  const renderList = (list: Member[], showButton = false) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {list.length === 0 && <p>No members found.</p>}
      {list.map((member) => (
        <div
          key={member.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "6px",
            maxWidth: "400px",
          }}
        >
          <img
            src={member.pfp_url}
            alt={member.username}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div style={{ flex: 1 }}>
            <strong>{member.username}</strong>
            <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
              {member.email}
            </p>
          </div>
          {showButton && member.user_id !== USER_ID && (
            <button
              onClick={() => toggleFollow(member.user_id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Follow/Unfollow
            </button>
          )}
        </div>
      ))}
    </div>
  );

  if (loading) return <div>Loading members...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Members</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("discover")}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: activeTab === "discover" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveTab("followers")}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: activeTab === "followers" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          style={{
            padding: "5px 10px",
            backgroundColor: activeTab === "following" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Following
        </button>
      </div>

      {activeTab === "discover" && renderList(members, true)}
      {activeTab === "followers" && renderList(followers)}
      {activeTab === "following" && renderList(following)}
    </div>
  );
}

















