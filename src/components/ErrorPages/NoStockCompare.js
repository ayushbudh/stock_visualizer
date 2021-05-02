import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const NoStockCompare = () =>{
    // styling
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'black',
            flexGrow: 3,
            color:'#39FF14',
            height:'578px',
            margin:'0'
        },  
        }));
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
            No Stocks Selected to Compare.
        </div>
     )
    }

export default NoStockCompare;
