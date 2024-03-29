'use client'
import Image from 'next/image'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import NavLinks from './NavLinks'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { APP_URL, IMG_URL } from '../../../config'
import Loader from '../Loader'
import { Authme, GetToken, authMeData } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import { Skeleton } from 'antd'
import { useAppContext } from '@/context/AppContext';

const ActivitySidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    // const [UserProfiledata, setUserProfiledata] = useState()
    const [UserProfiledata2, setUserProfiledata2] = useState()
    // const [UserProfileloader, setUserProfileloader] = useState(true)
    const token = GetToken('userdetail')
    const { UserProfiledata, UserProfileloader } = useAppContext()


    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    const logoclick = () => {
        router.push('/activity')
        document.querySelector('#AllMembers-tab')?.click()
    }
    return (
        <>
            {/* {UserProfileloader ? <div className="main-loader"> <Loader /></div> : */}
            <>
                {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#ActivitySidebar" aria-controls="ActivitySidebar">
                Button with data-bs-target
            </button> */}

                <div className="offcanvas offcanvas-start sidebar-offcanvas " tabIndex="-1" id="ActivitySidebar" aria-labelledby="ActivitySidebarLabel">

                    <div className="offcanvas-body p-0 ">
                        <div className=" p-0">
                            <div className='SideBarTop'>
                                <button type="button" className="close-canva d-md-none" data-bs-dismiss="offcanvas" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                                <Image onClick={logoclick} src={'/assets/images/logo/Logo.png'} alt='' className='pointer' width={100} height={100}></Image>

                                <div className="card admin-card c-card">
                                    <div className="card-body py-4">
                                        <div className='admin-img mb-4'>
                                            {UserProfileloader ?
                                                <Skeleton.Avatar active size={50} />
                                                : <>
                                                    {UserProfiledata?.data?.profile_photo === null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                        :
                                                        <Image loader={imgurl} src={UserProfiledata?.data?.profile_photo?.url} alt="" width={100} height={100}></Image>

                                                    }
                                                </>
                                            }
                                        </div>
                                        {UserProfileloader ? <div className='text-skeleton-2'> <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                            <Link href={'/profile/activity'} className="heading mb-0 text-decoration-none text-capitalize">
                                                {UserProfiledata?.data?.name}
                                            </Link>
                                        }
                                        {UserProfileloader ? <div className='text-skeleton-2'> <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                            <p className="para">
                                                {UserProfiledata?.data?.role?.name === "Admin" ? UserProfiledata?.data?.role?.name : UserProfiledata?.data?.role?.name === "Athlete" ? UserProfiledata?.data?.role?.name :
                                                    UserProfiledata?.data?.sub_role?.name}

                                            </p>
                                        }
                                        <hr />
                                        <div className="d-flex justify-content-center">



                                            <div className='mx-2'>
                                                {UserProfileloader ? <div className='text-skeleton'> <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                                    <>
                                                        <p className="heading mb-0">{UserProfiledata?.data?.friends_count}</p>
                                                    </>
                                                }
                                                <p className="para">Friends</p>
                                            </div>
                                            <div className='mx-2'>
                                                {UserProfileloader ? <div className='text-skeleton'> <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                                    <p className="heading mb-0">{UserProfiledata?.data?.group_count}</p>
                                                }
                                                <p className="para">Groups</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sidebar-nav px-xl-5 mt-5'>
                            <li>
                                <Link href={'/activity'} className={pathname === '/activity' ? 'active-nav' : ''}>
                                    <i className="bi bi-activity"></i> <br />
                                    <p>Activity</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/photos'} className={pathname === '/photos' ? 'active-nav' : ''}>
                                    <i className="bi bi-image-fill"></i> <br />
                                    <p>Photos</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/watch'} className={pathname === '/watch' ? 'active-nav' : ''}>
                                    <i className="bi bi-play"></i> <br />
                                    <p>Watch</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/people'} className={pathname === '/people' ? 'active-nav' : ''}>
                                    <i className="bi bi-person"></i> <br />
                                    <p>People</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/groups'} className={pathname === '/groups' ? 'active-nav' : ''}>
                                    <i className="bi bi-people"></i> <br />
                                    <p>Groups</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/teams'} className={pathname === '/teams' ? 'active-nav' : ''}>
                                    <i className="bi bi-person-arms-up"></i> <br />
                                    <p>Teams</p>
                                </Link>
                            </li>
                            {/* <li>
                                    <Link href={'/forums'} className={pathname === '/forums' ? 'active-nav' : ''}>
                                        <i className="bi bi-chat"></i> <br />
                                        <p>Forums</p>
                                    </Link>
                                </li> */}
                            {/* <li>
                                <Link href={'/blog'} className={pathname === '/blog' ? 'active-nav' : ''}>
                                    <i className="bi bi-newspaper"></i> <br />
                                    <p>Blog</p>
                                </Link>
                            </li> */}

                        </div>
                    </div>
                </div>
            </>
            {/* } */}

        </>
    )
}

export default ActivitySidebar