import React from 'react';
import ProfileStatus from './ProfileStatus';
import axios from 'axios';
import {useEffect, useState} from 'react';
import avatarOutline from '../assets/avatar_outline.png';

function Participant({username, uid}) {
    const [image, setImage] = useState(avatarOutline)

    useEffect(()=>{
        axios.get(`http://localhost:4767/user/getprofilepic?uid=${uid}`).then((res)=>{
            if (res.data.result !== null){
                setImage(res.data.result)
            } else {
                setImage(avatarOutline)
            }
        })
    })

    return (
        <div className="ptc-wrapper">
            <ProfileStatus image={image} />
            <h5>{username}</h5>
        </div>
    )
}

export default Participant;