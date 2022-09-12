import React from 'react';
import './stylesheets/accountsettings.css';
import {BiArrowBack} from 'react-icons/bi';
import {VscChevronLeft} from 'react-icons/vsc';
import cyanAvatar from '../../assets/cyan_avatar.png';
import {FcCameraIdentification} from 'react-icons/fc';
import {useRef, useState} from 'react';
import {CgSpinnerTwoAlt} from 'react-icons/cg';
import { storage } from '../../LoggedOutStack.js/firebase/firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import axios from 'axios';
import {useContext} from 'react';
import { LoggedInCtx } from '../../contexts/LoggedInCtx';
import {AiOutlineUser} from 'react-icons/ai';
import {FiMail} from 'react-icons/fi';
import {FaUserEdit, FaEdit} from 'react-icons/fa';
import {FcVoicePresentation} from 'react-icons/fc';
import EditorModal from './EditorModal';
import { ModalCtx } from '../../contexts/ModalCtx';
import ReactTooltip from "react-tooltip";
import {AiOutlineLogout} from "react-icons/ai";


function AccountSettings(){
    const inputFile = useRef(null);
    const [profilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
    const [isLoading, setLoading] = useState(false);
    const [LoggedInData, setLoggedInData] = useContext(LoggedInCtx);
    const [openModal, setOpenModal] = useContext(ModalCtx);

    function openFilePicker(){
        inputFile.current.click();
    }

    function logout(){
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div className="st-account-main-wrapper">
            <ReactTooltip place="top" type="dark" effect="float" />
            <div className="st-account-header">
                <button><VscChevronLeft /></button>
                <h1>Account</h1>
                <span><button className="logout-btn" onClick={()=>{
                    logout();
                }}><AiOutlineLogout />Log Out</button></span>
            </div>
            <div className="st-account-profile-wrapper">
                <h4>Profile Pic</h4>
                <div className="st-account-profile-pic">
                    {
                        isLoading ? <CgSpinnerTwoAlt /> : <img src={profilePic !== "null" ? profilePic : cyanAvatar} alt="@" />
                    }
                </div>
                <button onClick={openFilePicker}><FcCameraIdentification fontSize="20px" />{isLoading ? <span>Updating...</span> : "Change Profile Picture"}</button>
                <input type="file" ref={inputFile} onChange={(e)=>{
                    let fileReader = new FileReader();
                    setLoading(true)
                    fileReader.onload = ()=>{
                        let picture = fileReader.result;
                        const file = e.target.files[0];
                        const storageRef = ref(storage, `profileImages/${file.name}`);
                        const metadata = {
                            contentType: file.type,
                        }
                        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
                        // upload the data to firebase then get the download url and send a post request to server to update the image with the download link

                        uploadTask.on('state_changed',(snapshot)=>{
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload of ${file.name}: `, progress);
                            switch (snapshot.state){
                                case "paused":
                                    console.log('Upload Paused');
                                case "running":
                                    console.log('Uploading to firebase');
                            }

                        },(e)=>{
                            // unsuccessful upload to firebase
                            console.log(e);
                        },()=>{
                            // successful upload to firebase
                            // get the download URL to the uploaded file
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                                console.log(`Download URL: ${downloadURL}`);
                                let updateProfilePayload = {
                                    uid: localStorage.getItem("uid"),
                                    profilepicurl: downloadURL
                                }
                                axios.post('http://localhost:4767/user/updateprofilepic/', updateProfilePayload).then((res)=>{
                                    if (res){
                                        console.log(res)
                                    }
                                    setProfilePic(picture);
                                    setLoading(false);
                                    localStorage.setItem('avatar', res.data);
                                    console.log(LoggedInData)
                                }).catch((e)=>{
                                    console.log(e)
                                })
                            }).catch((e)=>{
                                console.log(e)
                            })
                        })
                    }
                    fileReader.readAsDataURL(e.target.files[0])
                }} />
            </div>
            <div className="st-account-details-wrapper">
                <div className="st-account-username-wrapper">
                    <AiOutlineUser style={{
                        color: "white",
                        fontSize: "22px",
                        margin: "10px"
                    }} />
                    <h4>Your Username :</h4>
                    <div className="st-account-username">
                        <h4>{localStorage.getItem("tonialUser")}</h4>
                    </div>
                    <div className="st-editor-tools">
                        <button onClick={()=>{
                            setOpenModal({openStatus: true, data: <EditorModal label={"Username"} initialData={localStorage.getItem("tonialUser")} icon={<AiOutlineUser style={{
                                fontSize: "22px",
                                margin: "10px"
                            }} />} errorTip={"Username should be at least 4 characters and only contain _ special character"} />})
                        }}><FaUserEdit /></button>
                    </div>
                </div>
                <div className="st-account-username-wrapper">
                    <FiMail style={{
                        color: "white",
                        fontSize: "22px",
                        margin: "10px"
                    }} />
                    <h4>Your Email :</h4>
                    <div className="st-account-username">
                        <h4>{localStorage.getItem("email") ? localStorage.getItem("email") : "No Email Available"}</h4>
                    </div>
                    <div className="st-editor-tools">
                        <button onClick={()=>{
                            setOpenModal({openStatus: true, data: <EditorModal label={"Email"} initialData={localStorage.getItem("email")} icon={<FiMail style={{
                                fontSize: "22px",
                                margin: "10px"
                            }} />} />})
                        }}><FaEdit /></button>
                    </div>
                </div>
                <div className="st-account-username-wrapper">
                    <FcVoicePresentation style={{
                        fontSize: "24px",
                        margin: "10px"
                    }} />
                    <h4>About Me :</h4>
                    <div className="st-account-username">
                        <h4>{localStorage.getItem("tonialAbout") == "null" ? "..." : localStorage.getItem("tonialAbout")}</h4>
                    </div>
                    <div className="st-editor-tools">
                        <button onClick={()=>{
                            setOpenModal({openStatus: true, data: <EditorModal label={"About"} initialData={localStorage.getItem("email")} icon={<FcVoicePresentation style={{
                                fontSize: "22px",
                                margin: "10px"
                            }} />} />})
                        }} ><FaEdit /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;