// app/profile/[username]/page.tsx (Server Component)
import ProfilePage from "./ProfilePage";

export default async function ProfilePageWrapper({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <ProfilePage username={username} />;
}

// Modified: 2026-04-15 20:23:46 - Create login API endpoint

// Modified: 2026-04-15 20:23:46 - Optimize post query performance
