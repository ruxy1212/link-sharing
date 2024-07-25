"use client";

import { createContext, useState, useReducer, ReactNode } from 'react';
import linksReducer from './linksManager';
import { AppContextType, LinksState, LinksAction } from './types';

export const Context = createContext<AppContextType | undefined>(undefined);

export const MyAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uid, setUid] = useState<string>('');  // the user's account id
    const [usersLinks, dispatch] = useReducer<React.Reducer<LinksState, LinksAction>>(linksReducer, []);  // usersLinks contains ALL of the user's links
    const [openLoginMessage, setOpenLoginMessage] = useState<boolean>(false);  // a dialog box that appears that will give the user a message
    const [openSaveChangesMessage, setOpenSaveChangesMessage] = useState<boolean>(false);
    const [openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage] = useState<boolean>(false);

    const value: AppContextType = {
        uid,
        setUid,
        usersLinks,
        dispatch,
        openLoginMessage,
        setOpenLoginMessage,
        openSaveChangesMessage,
        setOpenSaveChangesMessage,
        openCopiedToClipboardMessage,
        setOpenCopiedToClipboardMessage,
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
