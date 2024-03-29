'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next';
import { message } from 'antd';
import axios from 'axios';
import { APP_URL } from '../../../config';
import { useAppContext } from '@/context/AppContext';
import { useFrndContext } from '@/context/FriendContext';

const LoginForm = ({ id }) => {
  const [UserEmail, setUserEmail] = useState('')
  const [UserPass, setUserPass] = useState('')
  const [RememberMe, setRememberMe] = useState()
  const [ShowPass, setShowPass] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [bannedmsg, setbannedmsg] = useState('')
  const router = useRouter()
  const { UserProfiledata, UserProfileloader, setlogin } = useAppContext()
  const { setfrnd } = useFrndContext()
  useEffect(() => {
    setlogin(false)
  }, [])


  const loginuser = (e) => {
    e.preventDefault()
    if (UserEmail === '' || UserPass === '') {
      message.error('Empty Email or Password');
    } else {

      setisLoading(true)
      axios.post(`${APP_URL}/api/login`, { email: UserEmail, password: UserPass })
        .then(response => {
          message.success(response?.data?.message)
          setCookie('logged', response.data.data.token);
          setlogin(true)
          setfrnd(true)
          localStorage.setItem('userdetail', JSON.stringify({ response }))
          router.push('/activity')
          setisLoading(false)
          document.querySelector('.closelogin-modal').click()


        })
        .catch(error => {
          console.error(error);
          setbannedmsg(error?.response?.data?.data?.error)
          if (error.response) {
            message.error(error?.response?.data?.message)
          } else {
            message.error(error?.message)

          }
          setisLoading(false)
        });

    }
  }
  const LostPass = () => {
    document.querySelector('.closelogin-modal').click()
    router.push('/forget')
  }
  const RegisterYourSelf = () => {
    document.querySelector('.closelogin-modal').click()
    router.push('/register')
  }
  useEffect(() => {
    if (localStorage.getItem('rememberppm')) {
      setRememberMe(true)
      const rememberdetail = JSON.parse(localStorage.getItem('rememberppm'))
      setUserEmail(rememberdetail.email)
      setUserPass(rememberdetail.password)
    }
  }, [])

  const rememberuser = () => {
    if (RememberMe) {
      localStorage.setItem('rememberppm', JSON.stringify({ email: UserEmail, password: UserPass }))
    }
  }
  useEffect(() => {
    rememberuser()
  }, [RememberMe, UserEmail, UserPass])
  useEffect(() => {
    if (RememberMe == false) {
      localStorage.removeItem('rememberppm')
    }
  }, [RememberMe])



  return (
    <>
      <form action="" onSubmit={loginuser}>
        <Link href={'#'} className='d-none closelogin-modal' data-bs-dismiss="modal"></Link>
        <div className=" custome-inp">
          <span className="input-group-text" ><i className="bi bi-person"></i></span>
          <input type="text" className="form-control" value={UserEmail} onChange={(e) => { setUserEmail(e.target.value) }} placeholder="Email or Username" />
        </div>
        <div className=" custome-inp mt-3 ">
          <span className="input-group-text" ><i className="bi bi-key"></i></span>
          <div className="showpass">
            <input type={ShowPass ? 'text' : 'password'} className="form-control" value={UserPass} onChange={(e) => { setUserPass(e.target.value) }} placeholder="Password" />
            <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
          </div>
          <p className="para text-danger text-center my-3"> {bannedmsg}</p>
        </div>
        <div className="justify-content-between d-flex mt-3 align-items-center">
          <div className="form-check custome-checkbox ">
            <input className="form-check-input" type="checkbox" value={RememberMe} onClick={() => { setRememberMe(!RememberMe) }} checked={RememberMe} id={id} />
            <label className="form-check-label" htmlFor={id}>
              Remember
            </label>
          </div>
          <button type='button' className='text-decoration-none text-black para-sm align-items-center bg-transparent border-0' onClick={LostPass}>Lost Password?</button>
        </div>
        <button type='submit' className='btn primary-btn mt-3 w-100'><p>Log into your account   {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
      </form>
      <button className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-3 text-center bg-transparent border-0' onClick={RegisterYourSelf}>Create an Account</button>
    </>
  )
}

export default LoginForm