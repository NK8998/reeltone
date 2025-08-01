import { EssentialData, UserFlags } from "@/types/types";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { Clock, Eye, Heart } from "lucide-react";
import { toast } from "sonner";

type Response = {
  message: { message: string };
  newState: boolean;
};

type Props = {
  currentState: boolean;
  serviceFunction: () => Promise<Response>;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  label: string;
  onSuccess?: (response: Response) => void;
  onError?: (error: Error) => void;
};

const UserFlagsButton = ({
  currentState,
  serviceFunction,
  icon,
  iconActive,
  label,
  onSuccess,
  onError,
}: Props) => {
  const [state, setState] = useState(currentState);
  const queryClient = useQueryClient();

  const toggleMutation = useMutation<Response, Error, boolean>({
    mutationFn: async (_newState) => {
      const response = await serviceFunction();
      return response;
    },
    onMutate: async (newState) => {
      setState(newState);
    },
    onError: (error) => {
      console.error("Error occurred during mutation:", error);
      setState((prev) => !prev);
      onError?.(error);
    },
    onSuccess: (response) => {
      toast.success(response.message.message);
      queryClient.invalidateQueries({ queryKey: [label] });
      onSuccess?.(response);
    },
  });

  const handleToggle = () => {
    toggleMutation.mutate(!state);
  };

  return (
    <button
      className={`user-flags-button ${label} ${state ? "remove" : "add"}`}
      onClick={handleToggle}
      disabled={toggleMutation.isPending}
    >
      {state ? iconActive : icon}
      <span className='label'>{label}</span>
      {state && <span className='remove'>Remove</span>}
    </button>
  );
};

export default function FilmRight({
  essentialData,
  userFlags,
}: {
  essentialData: EssentialData;
  userFlags: UserFlags;
}) {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  const {
    id: filmId,
    title: filmTitle,
    poster_path: filmPoster,
  } = essentialData;

  const addToFavourites = () => {
    return backendService.addToFavourites(user.id, filmId.toString());
  };
  const addToWatchList = () => {
    return backendService.addToWatchList(
      user.id,
      filmId,
      filmTitle,
      filmPoster
    );
  };

  const addtoWatched = () => {
    return backendService.addToWatched(user.id, filmId, filmTitle, filmPoster);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Film link copied to clipboard!");
  };
  return (
    <div className='film-right'>
      <div className='film-right-interactions interaction-row'>
        <div className='user-flags-row'>
          <UserFlagsButton
            currentState={userFlags.watched}
            serviceFunction={addtoWatched}
            icon={<Eye fill='grey' strokeWidth={1} />}
            iconActive={<Eye fill='orange' strokeWidth={1} />}
            label='Watched'
          />
          <UserFlagsButton
            currentState={userFlags.has_liked}
            serviceFunction={addToFavourites}
            icon={<Heart fill='grey' strokeWidth={1} />}
            iconActive={<Heart fill='red' strokeWidth={1} />}
            label='Favorites'
          />
          <UserFlagsButton
            currentState={userFlags.in_watchlist}
            serviceFunction={addToWatchList}
            icon={<Clock fill='grey' strokeWidth={1} />}
            iconActive={<Clock fill='#3A9196' strokeWidth={1} />}
            label='Watchlist'
          />
        </div>
        <div className='share-row interaction-row' onClick={copyToClipboard}>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}
