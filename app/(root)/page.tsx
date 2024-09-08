import Header from '@/components/Header';
import AddDocumentButton from '@/components/ui/AddDocumentButton';
import { DeleteModal } from '@/components/ui/DeleteModal';
import Notifications from '@/components/ui/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async () => {
  const user = await currentUser();
  if(!user) redirect('/sign-in')

  const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress)
  const documents = [];
  return (
    <main>
      <Header className='sticy left-0 top-0'>
      <div className='flex items-center gap-2 lg:gap-4'>
      <Notifications>

      </Notifications>
      <SignedIn>
        <UserButton>

        </UserButton>
      </SignedIn>
      </div>
      </Header>

        
          {roomDocuments.data.length > 0 ? (
            <div className="document-list-container">
              <div className="document-list-title">
                <h3 className="text-28-semibold">All documents</h3>
                <AddDocumentButton 
                  userId={user.id}
                  email={user.emailAddresses[0].emailAddress}
                />
              </div>
              <ul className="document-ul">
                {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                      <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                        <Image 
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="line-clamp-1 text-lg">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    <DeleteModal roomId={id} />
                  </li>
                ))}
              </ul>
            </div>
          ):(
            <div className='document-list-empty'>
              <Image
              src="/assets/icons/doc.svg"
              alt="bruh"
              width={40}
              height={40}
              className='mx-auto'

              
              >

              </Image>
              <AddDocumentButton
              userId={user.id}
              email={user.emailAddresses[0].emailAddress}
              >
                
              </AddDocumentButton>


            </div>
          )
        }

    </main>
  )
}

export default Home;