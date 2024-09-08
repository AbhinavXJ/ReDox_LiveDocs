import { Editor } from '@/components/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/users.actions'
const Document = async  ({params:{id}}:SearchParamProps) => {
  const clerkUser= await currentUser();
  if(!clerkUser)redirect('/sign-in')
  console.log("hiiii")

  console.log(id)
  const room = await getDocument({
    roomId:id,
    userId:clerkUser.emailAddresses[0].emailAddress

  })
  

  if(!room) redirect('/')
  
  const userIds = Object.keys(room.usersAccesses)
  const users = await getClerkUsers({userIds})

  const usersData = users.map((user:User)=>({
      ...user,
      userType:room.usersAccesses[user.email]?.includes("room:write")?
      "editor":"viewer"
  }))

  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress].includes("room:write")?"editor":"viewer"



  return (
    <main className='flex flex-col w-full items-center'> 




        <CollaborativeRoom
        
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
        
        >
        
        
        </CollaborativeRoom>

    </main>
  )
}

export default Document