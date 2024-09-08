import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
const Document = () => {
  return (
    <div> 
        <Header>
        <p className='text-white'>
          hello
        </p>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
      </Header>
        {/* <Editor></Editor> */}

    </div>
  )
}

export default Document