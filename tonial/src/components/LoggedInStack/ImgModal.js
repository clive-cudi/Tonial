import React from 'react';
import {useContext} from 'react';
import { ModalCtx } from '../contexts/ModalCtx';
import {BiArrowBack} from 'react-icons/bi';

function ImgModal({image}) {
    const [openModal, setOpenModal] = useContext(ModalCtx);
    return (
        <div className="img-modal-wrapper">
            <button onClick={()=>{
                setOpenModal({openStatus: false, data: null})
            }}><BiArrowBack /></button>
            <img src={image} />
        </div>
    )
}

export default ImgModal;