import React from 'react';
import {ImSpinner2} from 'react-icons/im';

function Button({label, icon, style, wrapperStyle, onclick, disable, busy}) {
    // eslint-disable-next-line
    return (
        <div className="button-wrapper" style={wrapperStyle}>
            <button style={style} onClick={onclick} disabled={disable}>{!busy ? icon : <ImSpinner2 style={{
                animation: "animate-spinner 0.5s linear infinite"
            }} />}{!busy ? label : ''}</button>
        </div>
    )
}

export default Button;