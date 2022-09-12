import React from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import {BsPlay, BsShuffle } from "react-icons/bs";
import "./stylesheets/mediaplayer.css";
import faker from 'faker';
import {MdOutlinePlaylistPlay} from 'react-icons/md'

function MediaPlayer() {

  return (
    <div className="mp-main-wrapper">
      <div className="mp-content">
        <div className="mp-image-wrapper">
          <img src={faker.image.fashion()} alt="@" />
        </div>
        <div className="mp-controls-wrapper">
          <div className="mp-track-title">
            <h5>By Tercy</h5>
          </div>
          <div className="mp-controls">
            <div className="mp-basic-controls">
              <AiOutlineStepBackward fontSize="15px" />
              <BsPlay fontSize="22px" />
              <AiOutlineStepForward fontSize="15px" />
            </div>
            <div className="mp-sec-controls">
                <BsShuffle fontSize="14px" />
                <MdOutlinePlaylistPlay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaPlayer;