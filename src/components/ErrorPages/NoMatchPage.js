import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

const NoMatchPage = () => { 
        // to navigate different route
        const history = useHistory();

        // handling click event
        const handleClick = () =>{
            history.push("/");
        }

        // styling
        const useStyles = makeStyles((theme) => ({
            root: {
                backgroundColor: 'black',
                flexGrow: 1,
                color:'#39FF14',
                borderBottom:'1px solid white',
                boxShadow:'5px 5px 27px 5px #39FF14',
                height:'5.3rem',
                padding:8,
                },
                 black:{
                    backgroundColor: 'black',
                },
            msg: {
                backgroundColor: 'black',
                flexGrow: 3,
                color:'#39FF14',
                height:'407px',
                marginTop:'300px',

                },
            menuButton: {
                    marginRight: theme.spacing(0),
                },
            title: {
                    margin:'auto',
                },
            line_plot: {
                    marginTop:'2.2rem'
                },
                whiteColor: {
            color: "#39FF14"
                
                },
            cmpBtn:{
                    backgroundColor: '#39FF14',
                },
            text: {
                width: 130,
                "& .MuiOutlinedInput-input": {
                color: "#39FF14"
                },
                "& .MuiInputLabel-root": {
                color: "#39FF14"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#39FF14"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "green"
                },
                "& .MuiInputLabel-root.Mui-focused": {
                color: "green"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "green"
                }
            }
        }));
       
        const classes = useStyles();
        return(
            <div className={classes.black}>
             <AppBar position="static" className={classes.root} >
                <Toolbar >
                <IconButton edge="start" onClick={handleClick}  className={classes.menuButton} color="inherit" aria-label="menu">
                            <HomeIcon fontSize="large"/>
                </IconButton>
                <Typography edge="edge" variant="h6" className={classes.title}>
                    Stock App - Not Found :(
                </Typography>
                </Toolbar>
             </AppBar> 
                <div className={classes.msg}>
                    <h3>You have reached wrong page! Please click home button to return back to app.</h3>
                </div>
            </div>
        )
}

export default NoMatchPage;
