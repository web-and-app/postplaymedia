'use client'
// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import UserProfileTabs from '../userprofile/UserProfileTabs'
import { APP_URL, IMG_URL } from '../../../config'
import { useParams, useRouter } from 'next/navigation'
import { Image, Skeleton, message } from 'antd'
import ProfileTabs from './ProfileTabs'
import { GetToken } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Link from 'next/link'

const Coverandtab = ({ Userdata, UserdataLoader }) => {
    const { userprofile } = useParams()
    const router = useRouter()
    const [frndstatus, setfrndstatus] = useState('')
    const [isDisable, setisDisable] = useState(false)
    const token = GetToken('userdetail')
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    useEffect(() => {
        setfrndstatus(Userdata?.data?.friendship_status)
    }, [Userdata])

    const movetoedit = () => {
        router.push('/profile/profile?profile-tab=editprofile')
    }
    const movetochangecover = () => {
        router.push('/profile/profile?profile-tab=changecover')
    }
    const movetochangedp = () => {
        router.push('/profile/profile?profile-tab=changeprofile')
    }
    const unfriend = (e) => {
        setisDisable(true)
        axios.delete(`${APP_URL}/api/friendships/unfriend/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setfrndstatus('send-request')
                setisDisable(false)
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const sendreq = (e) => {
        setisDisable(true)
        axios.post(`${APP_URL}/api/friend-requests/send`, { receiver_id: e }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setfrndstatus('pending')
                setisDisable(false)
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const accptfrndreq = (e) => {

        setisDisable(true)
        axios.patch(`${APP_URL}/api/friend-requests/accept/${e}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setfrndstatus('friends')
                setisDisable(false)
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const dltfrndreq = (e) => {
        setisDisable(true)
        axios.delete(`${APP_URL}/api/friend-requests/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setfrndstatus('send-request')
                setisDisable(false)
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (
        <>
            <div className="position-relative">
                <div className="profile-page-cover">
                    {UserdataLoader ?
                        <div className='skeleton'>
                            <Skeleton.Image active />
                        </div>
                        : <>
                            {Userdata?.data?.cover_photo === null ?
                                <Skeleton.Image /> :
                                <Image src={IMG_URL + Userdata?.data?.cover_photo.url} className='h-100 ' alt=''></Image>
                            }
                        </>}
                </div>
                <div className="container position-relative">
                    <div className="profile-page-user">
                        <div className="card mb-3">
                            <div className="row g-0 justify-content-center">
                                <div className="img-p" style={UserdataLoader ? { height: '200px' } : {}}>
                                    {UserdataLoader ?
                                        <div className='skeleton'>
                                            <Skeleton.Image active />
                                        </div> : <>
                                            {Userdata?.data?.profile_photo === null ?
                                                <img src="/assets/images/avatar/user.jpg" alt='' className="img-fluid rounded-start user-img" /> :
                                                <Image src={IMG_URL + Userdata?.data?.profile_photo.url} alt='' className="img-fluid rounded-start user-img" />
                                            }
                                        </>}

                                    {UserdataLoader ? <div className='text-skeleton-2 skel-w-100 my-auto w-50 mx-auto mt-3' > <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                        <p className="heading text-center mt-2 clr-dark text-capitalize">{Userdata?.data?.name}</p>
                                    }
                                </div>
                                <div className="col-md-8 col-lg mt-auto">
                                    <div className="d-md-flex mb-md-5 pb-md-3">
                                        <div className="card-body d-flex align-items-center justify-content-center justify-content-md-start">
                                            {UserdataLoader ? <Skeleton active paragraph={{ rows: 0 }} height={50} /> :
                                                <>
                                                    <p className="heading mb-0 text-md-white">@{Userdata?.data?.username}</p>
                                                    <span className='para mb-0 ms-3'>Active Now </span>
                                                </>}

                                        </div>

                                    </div>
                                    <div className=" profile-tabs d-md-flex d-none justify-content-between my-3 align-items-center">
                                        <ProfileTabs Userdata={Userdata} />
                                        <div className='d-flex align-items-center'>


                                            {Userdata?.data?.room_id ?

                                                <Link href={Userdata?.data?.room_id === null ? { pathname: `/messages`, query: { chat: 'startchating', profile: JSON.stringify(Userdata?.data) } } : { pathname: `/messages`, query: { profile: JSON.stringify(Userdata?.data), chat: (Userdata?.data?.room_id) } }} className="btn h-fit-content secondary-btn me-2" >
                                                    <i className="bi bi-envelope"></i>
                                                </Link>
                                                :
                                                <Link href={{ pathname: `/messages`, query: { chat: 'startchating', profile: JSON.stringify(Userdata?.data) } }} className='btn h-fit-content secondary-btn me-2' ><i className="bi bi-envelope"></i></Link>


                                            }
                                            {frndstatus === 'send-request' ?
                                                <button className='btn secondary-btn ' disabled={isDisable} onClick={() => sendreq(Userdata?.data?.id)}><p className='mb-0 px-md-3 px-1'> Add Friend</p></button>
                                                : frndstatus === 'pending' ?
                                                    <button className='btn secondary-btn' disabled={isDisable} onClick={() => dltfrndreq(Userdata?.data?.frp_id)}><p className='mb-0 px-md-3 px-1'> Cancel</p></button>
                                                    : frndstatus === 'friends' ?
                                                        <button className='btn secondary-btn ' disabled={isDisable} onClick={() => unfriend(Userdata?.data?.id)}><p className='mb-0 px-md-3 px-1'> Unfriend { }</p></button>
                                                        : frndstatus === 'accept-request' ?
                                                            <div className='d-md-flex justify-content-center'>
                                                                <button className='btn secondary-btn m-1' disabled={isDisable} onClick={() => dltfrndreq(Userdata?.data.frp_id)}><p className='mb-0 px-md-3 px-1'> Cancel</p></button>
                                                                <button className='btn secondary-btn m-1' disabled={isDisable} id={Userdata?.data?.id} onClick={() => accptfrndreq(Userdata?.data?.frp_id)}><p className='mb-0 px-md-3 px-1' > Accept</p></button>
                                                            </div>
                                                            : ''
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-none">
                <div className="profile-tabs  " >
                    <ProfileTabs Userdata={Userdata} />
                    <div className='d-flex align-items-center justify-content-center pt-3'>
                        {Userdata?.data?.room_id ?

                            <Link href={Userdata?.data?.room_id === null ? { pathname: `/messages`, query: { chat: 'startchating', profile: JSON.stringify(Userdata?.data) } } : { pathname: `/messages`, query: { profile: JSON.stringify(Userdata?.data), chat: (Userdata?.data?.room_id) } }} className="btn h-fit-content secondary-btn me-2" >
                                <i className="bi bi-envelope"></i>
                            </Link>
                            :
                            <Link href={{ pathname: `/messages`, query: { chat: 'startchating', profile: JSON.stringify(Userdata?.data) } }} className='btn h-fit-content secondary-btn me-2' ><i className="bi bi-envelope"></i></Link>


                        }
                        {frndstatus === 'send-request' ?
                            <button className='btn secondary-btn ' disabled={isDisable} onClick={() => sendreq(Userdata?.data?.id)}><p className='mb-0 px-md-3 px-1'> Add Friend</p></button>
                            : frndstatus === 'pending' ?
                                <button className='btn secondary-btn' disabled={isDisable} onClick={() => dltfrndreq(Userdata?.data?.frp_id)}><p className='mb-0 px-md-3 px-1'> Cancel</p></button>
                                : frndstatus === 'friends' ?
                                    <button className='btn secondary-btn ' disabled={isDisable} onClick={() => unfriend(Userdata?.data?.id)}><p className='mb-0 px-md-3 px-1'> Unfriend</p></button>
                                    : frndstatus === 'accept-request' ?
                                        <div className='d-md-flex justify-content-center'>
                                            <button className='btn secondary-btn m-1' disabled={isDisable} onClick={() => dltfrndreq(Userdata?.data.frp_id)}><p className='mb-0 px-md-3 px-1'> Cancel</p></button>
                                            <button className='btn secondary-btn m-1' disabled={isDisable} id={Userdata?.data?.id} onClick={() => accptfrndreq(Userdata?.data?.frp_id)}><p className='mb-0 px-md-3 px-1' > Accept</p></button>
                                        </div>
                                        : ''
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Coverandtab