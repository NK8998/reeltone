import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function useAddUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    backendService
      .addMember(
        user.id,
        user.username || "",
        user.emailAddresses[0]?.emailAddress || "",
        user.imageUrl || ""
      )
      .then((res) => console.log("User added:", res))
      .catch(console.error);
  }, [isLoaded, user?.id, user?.imageUrl, user?.username]);
}
