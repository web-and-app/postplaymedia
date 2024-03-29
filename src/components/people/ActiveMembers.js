'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { GetToken } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import { useAppContext } from '@/context/AppContext'
const ActiveMembers = ({ fetchMembers, UserData, UserDataLoader, MemberSearch, setMemberSearch }) => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const token = GetToken('userdetail')
    const [btndisable, setbtndisable] = useState(false)
    const [Receiverid, setReceiverid] = useState()
    const router = useRouter()
    const unfriend = (e) => {
        axios.delete(`${APP_URL}/api/friendships/unfriend/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                fetchMembers()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }

    const sendreq = (e) => {
        setReceiverid(e)
        axios.post(`${APP_URL}/api/friend-requests/send`, { receiver_id: e }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                fetchMembers()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }

    const accptfrndreq = (e) => {

        axios.patch(`${APP_URL}/api/friend-requests/accept/${e}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                fetchMembers()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const dltfrndreq = (e) => {
        axios.delete(`${APP_URL}/api/friend-requests/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                fetchMembers()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" value={MemberSearch} onChange={(e) => setMemberSearch(e.target.value)} />
                    </div>
                </div>

            </div>
            <div className="row position-relative w-100 mx-auto">

                {UserDataLoader ? <Loader /> :
                    <>
                        {UserData?.length ?
                            <>
                                {UserData?.map((item, i) => (
                                    <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                        <div className="card people-card h-100">
                                            <div className="card-body">
                                                {item.profile_photo === null ?
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                    :
                                                    <Image loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                                }
                                                {UserProfiledata?.data?.id === item.id ?
                                                    <Link className='link-hov' href={`/profile/activity`}><p className="heading text-black mb-2 mt-4">{item.name}</p></Link>
                                                    :
                                                    <Link className='link-hov' href={`/people/${item.id}/activity`}><p className="heading text-black mb-2 mt-4">{item.name}</p></Link>
                                                }
                                                {/* <p className="para clr-light">Active 2 minutes ago</p> */}
                                                <div className="d-flex fng justify-content-center">
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.friends_count}</p>
                                                        <p className="para">Friends</p>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.group_count}</p>
                                                        <p className="para">Groups</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-footer justify-content-center">
                                                {UserProfiledata?.data?.id != item.id && (<>
                                                    {item.friendship_status === 'send-request' ?
                                                        <button className='btn secondary-btn' onClick={() => sendreq(item.id)}><p className='mb-0 px-4'> Add Friend</p></button>
                                                        : item.friendship_status === 'pending' ?
                                                            <button className='btn secondary-btn' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                            : item.friendship_status === 'friends' ?
                                                                <button className='btn secondary-btn' onClick={() => unfriend(item.id)}><p className='mb-0 px-4'> Unfriend </p></button>
                                                                : item.friendship_status === 'accept-request' ?
                                                                    <div className='d-md-flex w-100 mx-auto justify-content-center'>
                                                                        <button className='btn secondary-btn m-1' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                                        <button className='btn secondary-btn m-1' id={item.id} onClick={() => accptfrndreq(item.frp_id)}><p className='mb-0 px-4' > Accept</p></button>
                                                                    </div>
                                                                    :
                                                                    ''
                                                    }
                                                </>)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                            : <div className="alert-box">
                                <p>No Member Found!</p>
                            </div>}
                    </>
                }
            </div >
        </>
    )
}

export default ActiveMembers