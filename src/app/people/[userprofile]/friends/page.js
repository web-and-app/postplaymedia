'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import MyFriends from '@/components/people/MyFriends'
import AllFriends from '@/components/profile/friends/AllFriends'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    return (
        <ProfileLayout ProfilePages>

            <div className="row position-relative w-100 mx-auto mt-2">

                <AllFriends xl={'xl-4'} md={'lg-6'} />

            </div>

        </ProfileLayout>
    )
}

export default page