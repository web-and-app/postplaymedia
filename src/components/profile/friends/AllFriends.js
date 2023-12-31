'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config'
import { GetToken } from '@/utils/Token'
import { useParams, useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Loader from '@/components/Loader'
import { message } from 'antd'
import MyFriends from '@/components/people/MyFriends'
import Peoplefriend from '@/components/people/Peoplefriend'

const AllFriends = ({ xl, md }) => {
    const token = GetToken('userdetail')
    const router = useRouter()
    const { userprofile } = useParams()
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const allfrnd = () => {
        axios.get(`${APP_URL}/api/friendships-by-user-id/${userprofile}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('people frend', response);
                setAllFrndsData(response)
                setUserDataLoader(false)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setUserDataLoader(false)
            });
    }
    useEffect(() => {
        allfrnd()
    }, [])
    const unfriend = (e) => {

        console.log(e)
        axios.delete(`${APP_URL}/api/friendships/unfriend/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('unfriendsd', response);
                allfrnd()
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


            <Peoplefriend getallfrnds={allfrnd} AllFrndsData={AllFrndsData} UserDataLoader={UserDataLoader} />
        </>
    )
}

export default AllFriends