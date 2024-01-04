'use client'
import ActivityLayout from '@/app/ActivityLayout'
import Chat from '@/components/chat/Chat'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {


    const { messagechat } = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('chat')

  
    const [TabState, setTabState] = useState('1')
    useEffect(() => {
        if (param === null) {
            setTabState('1')
        } else {
            setTabState(param)
        }
    }, [param, TabState])
    useEffect(() => {
        document.querySelector('.closechatmodal').click()
    }, [TabState])
    return (
        <>
            <div className="container-fluid px-0">
                <div className="row w-100 mx-0">
                    <div className="sidebar-size px-0">
                        <ActivitySidebar />
                    </div>
                    <div className="col px-0 ">
                        <div className="d-flex flex-column min-vh-100">
                          
                            <div className=" flex-1" >
                                <div className="">
                                    <div className="tab-content flex-1">

                                        <div className={`tab-pane fade  ${TabState === '1' ? 'active show' : ''}`} id="1" role="tabpanel" aria-labelledby="1-tab">
                                      
                                            <Chat TabState={TabState} />
                                        </div>
                                        <div className={`tab-pane fade  ${TabState === '2' ? 'active show' : ''}`} id="2" role="tabpanel" aria-labelledby="2-tab">
                                            <Chat TabState={TabState} />
                                        </div>
                                        <div className={`tab-pane fade  ${TabState === '3' ? 'active show' : ''}`} id="3" role="tabpanel" aria-labelledby="3-tab">
                                            <Chat TabState={TabState} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chatbar-size px-0">
                        <ChatSideBar />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page