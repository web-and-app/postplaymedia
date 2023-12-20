'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
import Loader from '../Loader'
import { GetToken } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const AllJobs = ({ loadcomponent }) => {
    const token = GetToken('userdetail')
    const [Filter, setFilter] = useState(false)
    const [Freelance, setFreelance] = useState(true)
    const [FullTime, setFullTime] = useState(true)
    const [Internship, setInternship] = useState(true)
    const [PartTime, setPartTime] = useState(true)
    const [Temporary, setTemporary] = useState(true)
    const [AllJobisLoader, setAllJobisLoader] = useState(true)
    const [SearchTitle, setSearchTitle] = useState('')
    const [Allstate, setAllstate] = useState([])
    const [Allcity, setAllcity] = useState([])
    const [GetAllJobs, setGetAllJobs] = useState([])
    const [state, setstate] = useState('')
    const router = useRouter()
    // console.log(confrences)
    
    useEffect(() => {
        setAllJobisLoader(true)
        axios.get(`${APP_URL}/api/all-jobs?search=${SearchTitle}&type[]=${!Freelance ? '' : 'Freelance'}&type[]=${!FullTime ? '' : 'FullTime'}&type[]=${!Internship ? '' : 'Internship'}&type[]=${!PartTime ? '' : 'PartTime'}&type[]=${!Temporary ? '' : 'Temporary'}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('alljobs', response);
                setGetAllJobs(response)
                setAllJobisLoader(false)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setAllJobisLoader(false)
            });
    }, [loadcomponent, SearchTitle, Freelance, FullTime, Internship, PartTime, Temporary])


    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }

    useEffect(() => {
        axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
            "country": "United States",
            // "state": "Kabul"
        }, {
            headers: {

                'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
                'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

            }
        })
            .then(response => {
                console.log('authMelayout', response);
                setAllstate(response?.data?.data?.states)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    // useEffect(() => {
    //     axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
    //         "country": "United States",
    //         "state": state
    //     }, {
    //         headers: {

    //             'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
    //             'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

    //         }
    //     })
    //         .then(response => {
    //             console.log('llll', response);
    //             setAllcity(response?.data?.data)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [state])
    return (
        <>



            <div className="border-bottom row justify-content-between">
                <div className="col-sm-8 col-lg-6">
                    <form className="  my-3">
                        <div className="d-flex">
                            <input type="text" className="form-control w-50 inp me-2 " placeholder="keywords" aria-label="Username" value={SearchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} />
                            {/* <input type="text" className="form-control inp me-2 " placeholder="Location" aria-label="Username" /> */}
                            <button className='btn primary-btn rounded-5 '><p><i className="bi bi-search"></i></p></button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4 col-lg-6 my-3 text-sm-end">
                    <button className='btn secondary-btn px-4' onClick={() => { setFilter(!Filter) }}><i className="bi bi-sliders2-vertical" ></i> Filter</button>
                </div>
                {Filter ?
                    <div className="border-top row justify-content-between">
                        <div className="d-flex flex-wrap py-3 justify-content-center flex-wrap">
                            <div className='m-2'>
                                {/* <input className=' form-check-input' type="checkbox" name="" id="Freelance" value={'freelance'} onChange={(e => { setFreelance(!Freelance) })} checked={Freelance} /> */}
                                {/* <label className='para clr-text ms-2' htmlFor="Freelance"></label> */}
                                <select name="" className='form-select slct' id="" >
                                    <option value='' selected hidden>Level</option>
                                    <option value='NCAAD1'> NCAA D1</option>
                                    <option value='NCAAD2'>NCAA D2</option>
                                    <option value='NCAAD3'>NCAA D3</option>
                                    {/* <option value='USPORTS'>U SPORTS</option> */}
                                    <option value='NAIA'> NAIA</option>
                                    <option value='USCAA'>USCAA</option>
                                    <option value='NCCAA'>NCCAA</option>
                                    <option value='CWPA'>CWPA</option>
                                    <option value='MCLA'> MCLA</option>
                                    <option value='High-School'> High School</option>
                                    <option value='Club/Travel'>Club/Travel</option>
                                    <option value='Junior-College'>Junior College</option>
                                </select>
                            </div>
                            <div className='m-2'>
                                {/* <input className=' form-check-input' type="checkbox" name="" id="FullTime" value={'FullTime'} onChange={(e => { setFullTime(!FullTime) })} checked={FullTime} />
                                <label className='para clr-text ms-2' htmlFor="FullTime">Full Time</label> */}
                                <select name="" className='form-select slct' id="" >
                                    <option value='' selected hidden>Sports</option>
                                    <option value='BoysBasketball'>Boys Basketball</option>
                                    <option value='GirlsBasketball'>Girls Basketball</option>
                                    <option value='BoysBaseball'>Baseball</option>
                                    <option value='GirlsFootball'>Football</option>
                                </select>
                            </div>
                            <div className='m-2'>
                                {/* <input className=' form-check-input' type="checkbox" name="" id="Internship" value={'Internship'} onChange={(e => { setInternship(!Internship) })} checked={Internship} />
                                <label className='para clr-text ms-2' htmlFor="Internship">Internship</label> */}
                                <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                                    <option value='' selected hidden>select State</option>
                                    {Allstate?.map((item, i) => (
                                        <option value={item.name} key={i}>{item.name}</option>
                                    ))}
                                    {/* <option value='city2'>State 2</option> */}
                                </select>
                            </div>
                            <div className='m-2'>
                                {/* <input className=' form-check-input' type="checkbox" name="" id="PartTime" value={'PartTime'} onChange={(e => { setPartTime(!PartTime) })} checked={PartTime} />
                                <label className='para clr-text ms-2' htmlFor="PartTime">Part Time</label> */}
                                <select name="" className='form-select slct' id="">
                                    <option value='' selected hidden>Conference</option>
                                    <option value='Conference1'>Conference 1</option>
                                    <option value='Conference2'>Conference 2</option>
                                </select>
                            </div>
                            {/* <div className='m-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Temporary" value={'Temporary'} onChange={(e => { setTemporary(!Temporary) })} checked={Temporary} />
                                <label className='para clr-text ms-2' htmlFor="Temporary">Temporary</label>
                            </div> */}
                        </div>
                    </div>
                    : ''}
            </div>
            <div className="position-relative">
                {AllJobisLoader ? <Loader /> : <>
                    {GetAllJobs?.data?.data.length === 0 ? <div className='text-center heading-m text-black my-5'>No Result Found </div> :
                        <>
                            {GetAllJobs?.data?.data?.map((item, i) => (
                                <div className="card n-card my-4 py-3 " key={i} >
                                    <div className="row g-0">
                                        <div className="col-lg-1 col-md-2 text-center my-auto">
                                            {item.image === null ?
                                                <Image src={'/assets/images/avatar/img.png'} width={300} height={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="" />
                                                :
                                                <Image loader={imgurl} src={item.image.url} width={300} height={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="" />
                                            }
                                        </div>
                                        <div className="col-lg col-md">
                                            <div className="card-body">
                                                <Link href={`jobs/${item.id}`} className="link-hov heading-m fw-bold text-black">{item.title}</Link>
                                                <p className="card-text para clr-text my-3">{item.location}</p>
                                                <p className="clr-primary para mb-0">{item.company_name}</p>

                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-3 job-card-btn px-4 ">
                                            <p className=''>{item.job_type}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>

                }
            </div>
        </>
    )
}

export default AllJobs