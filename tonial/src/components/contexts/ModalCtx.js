import React from 'react';
import { useState } from 'react';

export const ModalCtx = React.createContext();

export const ModalCtxProvider = ({children}) => {
    const [openModal, setOpenModal] = useState({
        openStatus: false,
        data: null,
    });

    return (
        <ModalCtx.Provider value={[openModal, setOpenModal]}>
            {children}
        </ModalCtx.Provider>
    )

}