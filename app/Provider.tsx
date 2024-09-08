"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/ui/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/users.actions";
import { useUser } from "@clerk/nextjs";

export function Provider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}
    resolveUsers={async ({ userIds }) => {
      const users = await getClerkUsers({ userIds});

      return users;
    }}

    resolveMentionSuggestions={async ({ text, roomId }) => {
      const roomUsers = await getDocumentUsers({
        roomId,
        currentUser: clerkUser?.emailAddresses[0].emailAddress!,
        text,
      })

      return roomUsers;
    }}
    
    
    >
        <ClientSideSuspense fallback={<div><Loader></Loader></div>}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  );
}