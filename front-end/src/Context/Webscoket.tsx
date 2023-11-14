import React, {Children, PropsWithChildren} from "react";
import {BooleanLiteral} from "typescript";



export type WebSocketInfo  = {
    isReady : Boolean;
    data : any;
}

export interface WebSocketProps {
    readonly data : WebSocketInfo | null
    readonly setData : (data : WebSocketInfo) => void;
    readonly loadData: () => Promise<void>;
}

export const WebSocketContext = React.createContext<WebSocketProps>({ data : null, 
                                                               setData: () => null,
                                                               loadData: async () => {} });

interface Props {
  children?: React.ReactNode;
}

export const WebSocketProvider : React.FC<Props> = ({ children }) => {
    const [data, setData] = React.useState<WebSocketInfo|null>(null);

    const loadData = async () => {
        console.log("data");
    }
    const value = {
        data,
        setData,
        loadData
    }

    return (
    <WebSocketContext.Provider value = {value}>
        { children }
    </WebSocketContext.Provider>
    );

};


