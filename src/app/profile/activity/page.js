'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import AllMembers from '@/components/activity/AllMembers'
import PostArea from '@/components/posts/PostArea'
import FriendsTab from '@/components/userprofile/PeopleActivity/FriendsTab'
import GroupsTab from '@/components/userprofile/PeopleActivity/GroupsTab'
import MentionTab from '@/components/userprofile/PeopleActivity/MentionTab'
import PersonalTab from '@/components/userprofile/PeopleActivity/PersonalTab'
import React, { useState } from 'react'

const Page = () => {
    const [postdone, setpostdone] = useState(true)
    return (
        <UserProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active text-center" id="PeopleActivityPersonal-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityPersonal" type="button" role="tab" aria-controls="PeopleActivityPersonal" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Personal</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="PeopleActivityMention-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityMention" type="button" role="tab" aria-controls="PeopleActivityMention" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Mentions</p>
                    </li>

                    {/* <li className="nav-item nav-link text-center" id="PeopleActivityFriends-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityFriends" type="button" role="tab" aria-controls="PeopleActivityFriends" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Friends</p>
                    </li> */}
                    {/* <li className="nav-item nav-link text-center" id="PeopleActivityGroup-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityGroup" type="button" role="tab" aria-controls="PeopleActivityGroup" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Groups</p>
                    </li> */}
                </ul>
            </div>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="PeopleActivityPersonal" role="tabpanel" aria-labelledby="PeopleActivityPersonal-tab">
                    <PostArea postdone={postdone} setpostdone={setpostdone}/>
                    <AllMembers endpoint={`/get-all-my-posts?`}  postdone={postdone} setpostdone={setpostdone}/>
                </div>
                <div className="tab-pane fade " id="PeopleActivityMention" role="tabpanel" aria-labelledby="PeopleActivityMention-tab">
                    <MentionTab endpoint={'/get-my-post-mentions?'}  />
                </div>
                <div className="tab-pane fade " id="PeopleActivityFriends" role="tabpanel" aria-labelledby="PeopleActivityFriends-tab">
                    <FriendsTab />

                </div>
                <div className="tab-pane fade " id="PeopleActivityGroup" role="tabpanel" aria-labelledby="PeopleActivityGroup-tab">
                    <GroupsTab />
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default Page