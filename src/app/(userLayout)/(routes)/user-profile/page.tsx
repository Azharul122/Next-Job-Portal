import { auth } from '@/auth';
import BreadCrumb from '@/components/ui/custom-breadceumb';
import { redirect } from 'next/navigation';
import React from 'react';
import UserNameForm from './_components/UserNameForm';
import { db } from '@/lib/db';
import Image from 'next/image';
import UserEmailForm from './_components/UserEmailForm';
import UserContactForm from './_components/UserContactForm';
import { UserResumesForm } from './_components/UserResumesForm';
import { Edit } from 'lucide-react';
import UserProfileInfo from './_components/UserProfileInfo';

const UserProfile = async () => {
  const session = await auth();
  const user = session?.user;


  if (!user) {
    redirect("/sign-in");

  }

  const profile = await db.userProfile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      resumes: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });



  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb breaderCrumbPage='user-profile' />


      {/*  */}
      {/* User Profile */}

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="col-span-2">
          <div className="flex flex-col gap-3">
            <UserNameForm userId={user?.id} initialData={profile} name={user.name} />
            <UserEmailForm userId={user?.id} initialData={profile} email={user.email} />
            <UserContactForm userId={user?.id} initialData={profile}  />
            <UserResumesForm userId={user?.id} initialData={profile}  />
          </div>

        </div>
        <div className="flex flex-col gap-3">

          <UserProfileInfo user={user} profile={profile}/>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
