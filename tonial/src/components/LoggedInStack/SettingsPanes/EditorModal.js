import React from 'react';
import {useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {useContext} from 'react';
import { ModalCtx } from '../../contexts/ModalCtx';
import Button from '../../LoggedOutStack.js/Button';
import { AiOutlineCheck } from "react-icons/ai";
import { FcHighPriority } from "react-icons/fc";
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import {doc, updateDoc, getDoc, deleteDoc, setDoc} from 'firebase/firestore';
import { db } from '../../LoggedOutStack.js/firebase/firebase';

function EditorModal({label, initialData, icon, errorTip}){
    const [newData, setNewData] = useState('');
    const [openModal, setOpenModal] = useContext(ModalCtx);
    const [submitting, setSubmitting] = useState(false);
    const [correctInput, setCorrectInput] = useState(false);
    const [busy, setBusy] = useState(false);

    function validateEmail(emailAddr) {
        // eslint-disable-next-line
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAddr.match(regexEmail)) {
          // eslint-disable-next-line
        return true;
      } else {
        return false;
      }
    }

      function validateUsername(input) {
        if (input.length >= 4) {
          let regex = /^[A-Za-z0-9_ ]+$/;
    
          let isValid = regex.test(input);
          if (!isValid) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }

    function inputChecker(input){
        // switch (label) {
        //     case "Email":
        //         if (validateEmail(input) == true){
        //             setCorrectInput(true)
        //         } else {
        //             setCorrectInput(false)
        //         }
        //     case "Username":
        //         if (validateUsername(input) == true){
        //             setCorrectInput(true)
        //         } else {
        //             setCorrectInput(false)
        //         }
        //     default:
        //         return true

        // }
        if (label == "Email"){
            if (validateEmail(input)== true){
                setCorrectInput(true)
            } else {
                setCorrectInput(false)
            }
        } else if (label == "Username") {
            if (validateUsername(input) == true){
                setCorrectInput(true)
            } else {
                setCorrectInput(false)
            }
        } else if (label == "About") {
            setCorrectInput(true)
        }
    }

    function submitNewData(url, data){
        // Remember to change the data in firebase too
        let originalData = {};
        if (label == "Username") {
            getDoc(doc(db, "users", localStorage.getItem("tonialUser"))).then((snapshot)=>{
                if (snapshot.exists()) {
                    originalData = snapshot.data();
                    originalData.userName = data.username;
                    deleteDoc(doc(db, "users", localStorage.getItem("tonialUser"))).then(()=>{
                        setDoc(doc(db, "users", originalData.userName), originalData).then(()=>{
                            axios.post(url, data).then(()=>{
                                localStorage.setItem("tonialUser", originalData.userName);
                                setBusy(false)
                                setOpenModal({openStatus: false});
                                return true;
                            }).catch((e)=>{
                                console.log(e);
                                return false;
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    })
                } else {
                    console.log("No such Document in firebase")
                }
            }).catch((e)=>{
                console.log(e)
            });
        } else {
            updateDoc(doc(db, "users", localStorage.getItem('tonialUser')),data).then(()=>{
                axios.post(url, data).then(()=>{
                    setBusy(false)
                    setOpenModal({openStatus: false})
                    return true;
                }).catch((e)=>{
                    console.log(e);
                    return false;
                })
            }).catch((e)=>{
                console.log(e)
            })
        }
    }

    function urlCreator(currentLabel){
        if (currentLabel == "Email") {
            return `http://localhost:4767/user/updatemail/`
        } else if (currentLabel == "Username"){
            return `http://localhost:4767/user/updateusername/`
        } else if (currentLabel == "About") {
            return `http://localhost:4767/user/updateabout`
        }
    }

    function submit(){
        if (newData !== ''){
            if (label == "Email"){
                let new_email = {
                    uid: localStorage.getItem('uid'),
                    email: newData
                }
                console.log(urlCreator(label))
                submitNewData(urlCreator(label), new_email);
                localStorage.setItem("email", newData);
            } else if (label == "Username"){
                let new_username = {
                    uid: localStorage.getItem('uid'),
                    username: newData
                }
                console.log(urlCreator(label))
                submitNewData(urlCreator(label), new_username);
            } else if (label == "About") {
                let new_about = {
                    uid: localStorage.getItem('uid'),
                    about: newData
                }
                console.log(urlCreator(label))
                submitNewData(urlCreator(label), new_about);
                localStorage.setItem("tonialAbout", newData);
            }
        }
    }

    return (
        <div className="st-editor-modal">
            <div className="st-editor-modal-header">
            <button onClick={()=>{
              setOpenModal({
                  openStatus: false,
              })
            }}>
              <BiArrowBack />
            </button>
                <h2>Edit {label}</h2>
            </div>
                <div className="st-form-inputs">
                    <div className="st-form-input-div">
                        {icon}
                        <input type="text" placeholder={`Enter New ${label}`} onChange={(e)=>{
                            setNewData(e.target.value);
                            inputChecker(newData)
                        }} />
                        <p
                            data-tip={
                            correctInput
                                ? `Correct ${label} Format`
                                : errorTip
                            }
                        >
                        {
                            newData !== "" && (correctInput == true ? <AiOutlineCheck color="chartreuse" /> : <FcHighPriority />)
                        }
                        </p>
                    </div>
                    <div className="st-form-submit-div">
                        <Button label="Make Changes" busy={busy ? true : false} onclick={()=>{
                            setBusy(true)
                            submit()
                        }} />
                    </div>
            </div>
        </div>
    )
}

export default EditorModal;