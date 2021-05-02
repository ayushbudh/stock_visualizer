import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const NoStock = () =>{
    // styling
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'black',
            flexGrow: 3,
            color:'#39FF14',
            height:'430px',
            marginTop:'300px'
        },  
        }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3>No Stocks Selected!</h3>
        </div>
    )
}

export default NoStock
