'use client'
import { GetToken } from '@/utils/Token'
import { DatePicker, message } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL } from '../../../../config'
import { UserContext } from '@/app/UserProfileLayout'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

const PeopleProfileEdit = ({ }) => {
    const token = GetToken('userdetail')
    const { Userdata } = useContext(UserContext);
    const [Name, setName] = useState()
    const [number, setnumber] = useState()
    const [DateofBirth, setDateofBirth] = useState()
    const [MemberType, setMemberType] = useState()
    const [JobType, setJobType] = useState()
    const [Country, setCountry] = useState()
    const [City, setCity] = useState()
    const [Allcity, setAllcity] = useState()
    const [Address, setAddress] = useState()
    const [state, setstate] = useState()
    const [Allstate, setAllstate] = useState()
    const [Sex, setSex] = useState()
    const [classyear, setclassyear] = useState()
    const [height, setheight] = useState()
    const [weight, setweight] = useState()
    const [Sports, setSports] = useState()
    const [Position, setPosition] = useState()
    const [AAUTravel, setAAUTravel] = useState()
    const [C_institute, setC_institute] = useState()
    const [C_instituteweb, setC_instituteweb] = useState()
    const [getRoles, setgetRoles] = useState([])
    const [isloading, setisloading] = useState(false)
    const router = useRouter()
    const onChange = (date, dateString) => {
        setDateofBirth(date)
    };

    useEffect(() => {
        axios.get(`${APP_URL}/api/sub-roles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('roles', response);
                setgetRoles(response?.data)
            })
            .catch(error => {
                console.error('roles', error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])

    const handlegender = (e) => {
        setSex(e.target.value)
    }
    const EditcoachProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { name: Name, email: Userdata?.data?.email, role_id: Userdata.data.role.id.toString(), dob: DateofBirth, gender: Sex, city: City, state: state, JobType: JobType, current_institute: C_institute, current_ins_website: C_instituteweb, address: Address, number: number, job_title: JobType, travel_team_name: AAUTravel }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }
    const EditAthleteProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { name: Name, email: Userdata?.data?.email, role_id: Userdata.data.role.id.toString(), dob: DateofBirth, gender: Sex, city: City, state: state, JobType: JobType, current_institute: C_institute, current_ins_website: C_instituteweb, address: Address, number: number, class_year: classyear, height: height, weight: weight, sports: Sports, position: Position, travel_team_name: AAUTravel }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }
    {/* get states against country api */ }
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

    {/* get cities against state and country api */ }
    useEffect(() => {
        axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
            "country": "United States",
            "state": state
        }, {
            headers: {

                'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
                'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

            }
        })
            .then(response => {
                setAllcity(response?.data?.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [state])

    return (
        <>
            <p className="heading mt-3 clr-text">Edit Profile</p>

            <div className="border-bottom mb-4"></div>

            <form action="" onSubmit={Userdata?.data?.role?.slug != 'athlete' ? EditcoachProfile : EditAthleteProfile} className='job-detail'>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Name </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Date of Birth </label>
                    <div className="col">
                        <DatePicker onChange={onChange} className='inp' />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Number </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={number} onChange={(e) => setnumber(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Sex </label>
                    <div className="col">
                        <input type="radio" name="gender" className='form-check-input me-2' id="male" value={'male'} onChange={handlegender} />
                        <label htmlFor="male" className='para clr-text'>Male</label>
                        <input type="radio" name="gender" className='form-check-input mx-2' id="female" value={'female'} onChange={handlegender} />
                        <label htmlFor="female" className='para clr-text'>Female</label>
                        <input type="radio" name="gender" className='form-check-input mx-2' id="others" value={'others'} onChange={handlegender} />
                        <label htmlFor="others" className='para clr-text'>others</label>
                    </div>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>State </label>
                    <div className="col">
                        <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                            <option value='' selected hidden>select State</option>
                            {Allstate?.map((item, i) => (
                                <option value={item.name} key={i}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>City </label>
                    <div className="col">
                        <select name="" className='form-select slct' id="" value={City} onChange={(e) => { setCity(e.target.value) }}>
                            <option value='' selected hidden>select City</option>
                            {Allcity?.length === 0 ?
                                <option value=''>No City Available</option>
                                :
                                <>
                                    {Allcity?.map((item, i) => (
                                        <option value={item} key={i}>{item}</option>
                                    ))}
                                </>}
                        </select>
                    </div>
                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Address </label>
                    <div className="col">
                        <textarea type="text" className="form-control  area" rows={'3'} placeholder="" value={Address} onChange={(e) => { setAddress(e.target.value) }} />

                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Current institute </label>
                    <div className="col">

                        <input type="text" name="" id="" className='form-control inp col-m' value={C_institute} onChange={(e) => setC_institute(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Current institute website</label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={C_instituteweb} onChange={(e) => setC_instituteweb(e.target.value)} />
                    </div>
                </div>
                {Userdata?.data?.role?.slug != 'athlete' ?
                    <div className='d-md-flex align-items-center my-3'>
                        <label htmlFor="" className='col-md-2'>Job Title </label>
                        <div className="col">
                            <select name="" className='slct form-select' id="" value={JobType} onChange={(e) => setJobType(e.target.value)}>
                                <option hidden value=''>Change Job Type</option>
                                {getRoles?.data?.map((item, i) => (
                                    <option value={item.id} key={i}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    :
                    <>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Class Year</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={classyear} onChange={(e) => setclassyear(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Height</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={height} onChange={(e) => setheight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Weight</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={weight} onChange={(e) => setweight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Sports </label>
                            <div className="col">
                                <select name="" className='slct form-select' id="" value={Sports} onChange={(e) => setSports(e.target.value)}>
                                    <option hidden value=''>Change Sports</option>
                                    <option value="Boys Basketball">Boys Basketball</option>
                                    <option value="Girls Basketball">Girls Basketball</option>
                                    <option value="Boys Baseball">Baseball</option>
                                    <option value="Girls Football">Football</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Level</label>
                            <div className="col">
                                <select name="" className='form-select slct' id="" value={Position} onChange={(e) => setPosition(e.target.value)}>
                                    <option value='' selected hidden>--select Level--</option>
                                    <option value='NCAAD1'> NCAA D1</option>
                                    <option value='NCAAD2'>NCAA D2</option>
                                    <option value='NCAAD3'>NCAA D3</option>
                                    <option value='NAIA'> NAIA</option>
                                    <option value='USCAA'>USCAA</option>
                                    <option value='NCCAA'>NCCAA</option>
                                    <option value='CWPA'>CWPA</option>
                                    <option value='MCLA'> MCLA</option>
                                    <option value='High School'> High School</option>
                                    <option value='Club/Travel'>Club/Travel</option>
                                    <option value='Junior College'>Junior College</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>AAU/Travel Team Name</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={AAUTravel} onChange={(e) => setAAUTravel(e.target.value)} />
                            </div>
                        </div>
                    </>
                }
                <button type='submit' className='btn primary-btn mt-3' ><p className='px-3'>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p> </button>
            </form>
        </>
    )
}

export default PeopleProfileEdit