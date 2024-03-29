'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GetToken, imgurl } from '@/utils/Token';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { APP_URL } from '../../../../config';
import Pagination from '@/components/jobs/Pagination';
import Loader from '@/components/Loader'
import { useAppContext } from '@/context/AppContext';
import { joingrp } from '@/utils/GrpFunctions';

const MyGroups = ({ setminegrpcount, runminegrp }) => {
    const { userprofile } = useParams()
    const { UserProfiledata } = useAppContext()
    const [Minegrp, setMinegrp] = useState([])
    const router = useRouter()
    const token = GetToken('userdetail')
    const handlePageChangemine = (pageNumber) => {
        setCurrentPagemine(pageNumber);
        // setisLoading(true)
    };
    const [isLoading, setisLoading] = useState(true)
    const [dataOnPagemine, setdataOnPagemine] = useState(20)
    const [currentPagemine, setCurrentPagemine] = useState(1);
    const itemsPerPagemine = dataOnPagemine;
    const indexOfLastItemmine = currentPagemine * itemsPerPagemine;
    const indexOfFirstItemmine = indexOfLastItemmine - itemsPerPagemine;
    const getminegrp = () => {
        setisLoading(true)
        axios.get(`${APP_URL}/api/get-all-groups-by-user-id/${userprofile}?per_page=${dataOnPagemine}&page=${currentPagemine}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setMinegrp(response)
                setminegrpcount(response?.data?.data?.total)
                setisLoading(false)
            })
            .catch(error => {
                setisLoading(false)
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    useEffect(() => {
        getminegrp()
    }, [dataOnPagemine, currentPagemine, runminegrp])
    const accptgrpreq = ({ e, endpoint }) => {
        axios.post(`${APP_URL}/api/groups/${endpoint}`, {
            user_id: UserProfiledata?.data?.id,
            group_id: e
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                getallgrp()
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    }
    return (

        <>
            <div className="border-bottom row justify-content-between">
                <div className="mb-3 col-xl-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" aria-label="Username" />
                    </div>
                </div>
                {/* <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3 w-100">
                        <select name="" className='form-select mt-3 slct ' id="" >
                            <option value="">Last Active</option>
                            <option value="">Most Members</option>
                            <option value="">Newly Created</option>
                            <option value="">Alphabetical</option>
                        </select>
                    </div>
                </div> */}
            </div>
            <div className="row position-relative">
                {isLoading ? <Loader /> : <>
                    {Minegrp?.data?.data?.data?.length === 0 ? <p className='heading-sm text-center text-black my-5'>No Groups Found!</p> :
                        <>

                            {Minegrp?.data?.data?.data?.map((item, i) => (
                                <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                    <div className="card people-card h-100">
                                        <div className="card-body">
                                            <div className="Grp-Bg bg-light">
                                                {item.cover_photo === null ?
                                                    <div alt="" width={200} height={200} className='object-fit-contain w-25 Grp-Bg-img'></div>
                                                    :
                                                    <Image loader={imgurl} src={item.cover_photo?.url} alt="" width={200} height={200} className='object-fit-cover w-100 Grp-Bg-img'></Image>
                                                }
                                                <div className='h-0'>
                                                    {item.profile_photo === null ?
                                                        <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile'></Image> :
                                                        <Image loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile'></Image>
                                                    }
                                                </div>
                                            </div>
                                            <p className="heading text-black mb-2 mt-4">{item.group_name}</p>
                                            {/* <p className="para clr-light">Active 2 minutes ago</p> */}
                                            <div className="imgtoimg">
                                                {item.some_members.map((item, i) => (

                                                    item.profile_photo === null ?
                                                        <Image key={i} src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                        : <Image key={i} loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='object-fit-cover post-profile-sm'></Image>
                                                ))}

                                            </div>
                                            <p className="para text-black mt-3 text-capitalize">{item.privacy} Group / {item.member_count} members</p>
                                        </div>
                                        <div className="card-footer">
                                            {/* <Link href={`/groups/${item.id}`} className='btn secondary-btn '><p className='mb-0 px-4'>Visit</p></Link>zxcv */}
                                            {UserProfiledata?.data?.id === item?.created_by?.id ?
                                                <button className='btn secondary-btn px-4' onClick={() => router.push(`/groups/${item.id}`)}>View Group</button> :
                                                <>
                                                    {item.button_trigger != 'accept-request' ?

                                                        <button className='btn secondary-btn ' onClick={
                                                            item.button_trigger === 'join-now' ? () => joingrp({ e: item.id, getallgrp: getminegrp, type: 'send' }) :
                                                                item.button_trigger === 'withdrawl-request' ? () => joingrp({ e: item.id, getallgrp: getminegrp, type: 'withdraw' }) :
                                                                    item.button_trigger === 'view-group' ? () => router.push(`/groups/${item.id}`) :
                                                                        ''
                                                        }>
                                                            <p className='mb-0 px-4'>
                                                                {
                                                                    item.button_trigger === 'join-now' ? 'Join Group' :
                                                                        item.button_trigger === 'withdrawl-request' ? 'Pending Group' :
                                                                            item.button_trigger === 'pending' ? 'Cancel Group Request' :
                                                                                item.button_trigger === 'view-group' ? 'View Group' :
                                                                                    ''}
                                                            </p>
                                                        </button>
                                                        : item.button_trigger === 'accept-request' ?
                                                            <>
                                                                <button className='btn secondary-btn mx-1' onClick={() => accptgrpreq({ e: item.id, endpoint: 'acceptInvite' })}>Accept</button>
                                                                <button className='btn secondary-btn mx-1' onClick={() => accptgrpreq({ e: item.id, endpoint: 'rejectInvite' })}>Reject</button>
                                                            </>
                                                            : ''}
                                                </>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>

                }
            </div>
            {Minegrp?.data?.data?.data?.length > 0 &&
                <Pagination
                    dataOnPage={dataOnPagemine}
                    currentPage={currentPagemine}
                    totalPages={Math.ceil(Minegrp?.data?.data?.total / itemsPerPagemine)}
                    tabledata={Minegrp?.data?.data?.data}
                    onPageChange={handlePageChangemine}
                    indexOfFirstItem={indexOfFirstItemmine}
                    // currentData={currentData}
                    itemsPerPage={itemsPerPagemine}
                    indexOfLastItem={indexOfLastItemmine}
                />}
        </>
    )
}

export default MyGroups