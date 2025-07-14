'use client';
import './page.css';

const suggestedUsers = [
  {
    username: 'film_buff88',
    bio: 'Lover of indie films and Tarantino classics.',
    avatar: '/avatars/user1.png',
  },
  {
    username: 'cinephile_kate',
    bio: 'Reviewing one film a day 🎬',
    avatar: '/avatars/user2.png',
  },
  {
    username: 'movie_maniax',
    bio: 'Let’s connect over horror flicks!',
    avatar: '/avatars/user3.png',
  },
];

export default function MembersPage() {
  return (
    <main className="members-page">
      <section className="member-section">
        <h1>Discover Members</h1>
        <div className="member-list">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="member-card">
              <img className="avatar" src={user.avatar} alt={user.username} />
              <strong>{user.username}</strong>
              <p>{user.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="member-section">
        <h2>Your Followers</h2>
        <p style={{ textAlign: 'center', color: '#bbb' }}>Coming soon...</p>
      </section>

      <section className="member-section">
        <h2>Your Following</h2>
        <p style={{ textAlign: 'center', color: '#bbb' }}>Coming soon...</p>
      </section>
    </main>
  );
}





