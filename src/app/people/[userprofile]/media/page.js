'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import AllPhotos from '@/components/photos/AllPhotos'
import AllVideos from '@/components/watch/AllVideos'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { userprofile } = useParams()
    return (
        <ProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active  text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Photos  </p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllVideo-tab" data-bs-toggle="tab" data-bs-target="#AllVideo" type="button" role="tab" aria-controls="AllVideo" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Video</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">

                <div className="tab-pane fade active show" id="AllPhotos" role="tabpanel" aria-labelledby="AllPhotos-tab">
                    <AllPhotos endpoint={`posted-activity-media?user_id=${userprofile}&`} />
                </div>
                <div className="tab-pane fade " id="AllVideo" role="tabpanel" aria-labelledby="AllVideo-tab">
                    <AllVideos endpoint={`posted-activity-media?user_id=${userprofile}&`} />
                </div>

            </div>
        </ProfileLayout>
    )
}

export default Page