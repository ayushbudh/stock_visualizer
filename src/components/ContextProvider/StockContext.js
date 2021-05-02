import React, { useState, createContext } from 'react';

export const StockContext = createContext();

export const StockProvider = (props) => {

    const [stock, setStockData] = useState({stockName:'', stockSymbol:'', stockChartXValues: [],stockChartYValues:[], stockTitle:'', display:false });
    const [selected, setSelected] = useState(""); 
    const [items, setItem] = useState([]); 
    const [display, setDisplay] = useState(false);

    return (
        <StockContext.Provider value={{compareItems: [items, setItem],compareSelect:[selected, setSelected], compareDisplay:[display, setDisplay]
        ,stocks:[stock, setStockData]}}>
            {props.children}
        </StockContext.Provider>

    );
}

