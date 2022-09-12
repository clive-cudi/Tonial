import React from 'react';
import { ModalCtx } from '../contexts/ModalCtx';
import {useContext} from 'react';
import ImgModal from './ImgModal';

function ProfileStatus({status, image, styling}) {
    const [openModal, setOpenModal] = useContext(ModalCtx);
    return (
        <div className="status-disp-wrapper" onClick={()=>{
            setOpenModal({openStatus: true, data: <ImgModal image={image} />})
        }}>
            <img src={image} alt="@" style={styling} />
            {
                status === true ? <span style={{
                    color: "green"
                }}></span> : <span style={{
                    display: 'none'
                }} ></span>
            }
        </div>
    )
}

export default ProfileStatus
