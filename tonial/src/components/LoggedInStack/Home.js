import React from 'react';
import SideNav from './SideNav';
import './stylesheets/home.css';
import DispSwitch from './DispSwitch';
import HorizontalSideNav from './HorizontalSideNav';
import { ModalCtx } from '../contexts/ModalCtx';
import { useContext } from 'react';
import Modal from './Modal';

function Home() {
    const [openModal, setOpenModal] = useContext(ModalCtx);    
    return (
        <div className="home-main-wrapper">
            <div className="home-main-content">
                <SideNav />
                <DispSwitch />
                <HorizontalSideNav />
                {
                    openModal.openStatus && <Modal data={openModal.data} />
                }
            </div>
        </div>
    )
}

export default Home;