'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import axios from 'axios'

const Invitetabs = () => {
    const token = GetToken('userdetail')
    const router = useRouter()

    const [selectedCards, setSelectedCards] = useState([]);
    const [MyFriends, setMyFriends] = useState([]);
    useEffect(() => {
        axios.get(`${APP_URL}/api/friendships`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp frnds', response);
                setMyFriends(response.data.message)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])


    // const MyFriends = [
    //     { id: 1, title: 'champ', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 2, title: 'John', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 3, title: 'Nick', img: '/assets/images/Modal/Avatar.png' },

    // ];
    const AllMembers = [
        { id: 'all1', title: 'champ', img: '/assets/images/Modal/Avatar.png' },
        { id: 'all2', title: 'John', img: '/assets/images/Modal/Avatar.png' },
        { id: 'all3', title: 'Nick', img: '/assets/images/Modal/Avatar.png' },

    ];

    const handleCardSelect = (card) => {
        const isSelected = selectedCards.find((selected) => selected.friend.id === card.friend.id);
        console.log(card);
        if (isSelected) {
            const updatedSelected = selectedCards.filter((selected) => selected.id !== card.id);
            setSelectedCards(updatedSelected);
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleSendInvitations = () => {
        console.log('Sending invitations:', selectedCards);
    };
 
    return (
        <>
            <div className="activity-tabs mt-2">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="InviteMyFriends-tab" data-bs-toggle="tab" data-bs-target="#InviteMyFriends" type="button" role="tab" aria-controls="InviteMyFriends" aria-selected="false" tabIndex="-1">
                        My Friends
                    </li>
                    <li className="nav-item nav-link " id="InviteAllMembers-tab" data-bs-toggle="tab" data-bs-target="#InviteAllMembers" type="button" role="tab" aria-controls="InviteAllMembers" aria-selected="false" tabIndex="-1">
                        All Members
                    </li>
                    {selectedCards.length > 0 ?
                        <li className="nav-item nav-link " id="SendInvite-tab" data-bs-toggle="tab" data-bs-target="#SendInvite" type="button" role="tab" aria-controls="SendInvite" aria-selected="false" tabIndex="-1">
                            Send Invites <span className="comment-active ms-1">{selectedCards.length}</span>
                        </li>
                        : ''}

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="InviteMyFriends" role="tabpanel" aria-labelledby="InviteMyFriends-tab">
                        <div className="border-bottom ">
                            <div className="col-lg-3 mb-3 col-md-6 ">
                                <div className=" search-inp mt-3">
                                    <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                                    <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                                </div>
                            </div>
                        </div>
                        {MyFriends.map((card, i) => (
                            <div className="card rounded-5 mt-3" key={i}>
                                <div className="card-body align-items-center d-flex justify-content-between py-2">
                                    <div className="d-flex align-items-center ">
                                        {card.friend.profile_photo === null ?
                                            <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                            : <Image loader={imgurl} src={card.friend.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}
                                        <p className='papa mb-0 clr-text fw-bold ms-2'>{card.friend.name}</p>
                                    </div>
                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => handleCardSelect(card)}>
                                        {selectedCards.find((selected) => selected.friend.id === card.friend.id)
                                            ? <i className="bi bi-dash-circle"></i>
                                            : <i className="bi bi-plus-circle"></i>}

                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>





                    <div className="tab-pane fade " id="InviteAllMembers" role="tabpanel" aria-labelledby="InviteAllMembers-tab">
                        <div className="border-bottom ">
                            <div className="col-lg-3 mb-3 col-md-6 ">
                                <div className=" search-inp mt-3">
                                    <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                                    <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                                </div>
                            </div>
                        </div>
                        {AllMembers.map((card, i) => (
                            <div className="card rounded-5 mt-3" key={i}>
                                <div className="card-body align-items-center d-flex justify-content-between py-2">
                                    <div className="d-flex align-items-center ">
                                        <Image src={card.img} alt="" width={100} height={100} className='post-profile Z'></Image>
                                        <p className='papa mb-0 clr-text fw-bold ms-2'>{card.title}</p>
                                    </div>
                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv ' onClick={() => handleCardSelect(card)}>
                                        {selectedCards.find((selected) => selected.id === card.id)
                                            ? <i className="bi bi-dash-circle"></i>
                                            : <i className="bi bi-plus-circle"></i>}

                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tab-pane fade " id="SendInvite" role="tabpanel" aria-labelledby="SendInvite-tab">
                        <div className="d-flex flex-wrap ">
                            {selectedCards.length > 0 ? (
                                selectedCards.map((selectedCard, i) => (
                                    <>
                                        <div>
                                            <div className='mx-2 mt-2' key={i}>
                                                {selectedCard.friend.profile_photo === null ?
                                                    <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                    :
                                                    <Image loader={imgurl} src={selectedCard.friend.profile_photo.url} title={selectedCard.friend.name} alt="" width={100} height={100} className='post-profile object-fit-cover' onClick={() => handleCardSelect(selectedCard)}></Image>
                                                }
                                            </div>
                                            <p className='para-sm text-center'>{selectedCard.friend.name}</p>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <p className='mt-3'>Group Invitations Cleared</p>
                            )}
                        </div>
                        {selectedCards.length > 0 ?
                            <>
                                <p className="para fw-bold clr-text mt-3">
                                    Optional: add a message to your invite.
                                </p>
                                <textarea name="" className='form-control my-3 area' id="" cols="30" rows="10" ></textarea>
                                <div className="d-flex ">
                                    <button className='btn primary-btn px-3'><p>Send</p></button>
                                    <button className='btn secondary-btn px-3 ms-2' onClick={() => { setSelectedCards([]) }}>Cancel</button>
                                </div>
                            </>
                            : ''}
                    </div>


                </div>
            </div>
        </>
    )
}

export default Invitetabs