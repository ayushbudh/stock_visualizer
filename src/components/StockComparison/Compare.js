import React, {  useContext } from 'react'
import 
{Button, IconButton, MenuItem, FormControl, TextField, Typography, Toolbar, AppBar,makeStyles, withStyles,
 Table, TableCell, TableContainer,TableHead, TableRow, Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import HomeIcon from '@material-ui/icons/Home';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListItem from './ListItem';
import NoStocksScreen from '../ErrorPages/NoStockCompare';
import { StockContext } from '../ContextProvider/StockContext';
import '../../App.css';

// Styling
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const Compare = () => {
    
    // need to use context api here
    const { compareItems, compareSelect, compareDisplay } = useContext(StockContext);
    const [selected, setSelected] = compareSelect;
    const [items, setItem] = compareItems;
    const [display, setDisplay] = compareDisplay;


    const history = useHistory();


        const handleChange = e => {
              if(e.target.value===0){
                  setDisplay(false);
              }else{
                  setDisplay(true);
                  setSelected(e.target.value); 
              }
        }

        // add the stock to the comparison list 
        const addToCompareList = (e) =>{
            e.preventDefault();
            
            // getting the stock symbol from
            let StockSymbol = selected;

            let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${process.env.API_KEY}`;
            
            // fetching using the api call
            fetch(API_Call)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                  const earliestRefresedDate = data['Meta Data']['3. Last Refreshed'];
                       setItem([...items, {Name:StockSymbol, High:data['Time Series (Daily)'][earliestRefresedDate]['2. high'],Low:data['Time Series (Daily)']["2021-04-30"]['3. low'] ,OpenPrice:data['Time Series (Daily)']["2021-04-30"]['1. open'], id:uuidv4()}]);
                       if(e.target.value===0){
                         setDisplay(false);
                       }else{
                          setDisplay(true)
                       }      
                }
            )
        }

        const handleClick = () => {
            history.push("/");
        }
            
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
            tableHead:{
            
              backgroundColor: 'black',
                flexGrow: 1,
                color:'#39FF14',
                borderBottom:'1px solid white',
                boxShadow:'5px 5px 30px 7px #39FF14',
            },
             black:{
                backgroundColor: 'black',
            },
            menuButton: {
                marginRight: theme.spacing(0),
            },
            title: {
                margin:'auto',
            },
            formControl: {
               
            },
             table: {
                margin:'auto',
                minWidth: '20rem',
                maxWidth: '60rem',
             },
             form: {
                 marginTop:'2.2rem',
                 padding:'3rem',
                 backgroundColor: 'black',
                 
             },
             container: {
               padding:'20px',
                backgroundColor: 'black',
                height:'700px',
             },
             visualize: {
                backgroundColor: '#39FF14',
                paddingLeft:30,
                paddingRight:30,
                paddingTop:18,
                paddingBottom:12,
             },
             neonGreen: {
              color: "#39FF14"
            
            },           
            addBtn:{
               backgroundColor: '#39FF14',
               paddingLeft:30,
               paddingRight:30,
               paddingTop:18,
               paddingBottom:12,
            },
            cell:{
              display:'flex',
              justifyContent: 'center',
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
            },
          }
        }));
        
        const classes = useStyles();
        return (
          <div className={classes.black} >
                  <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <HomeIcon fontSize="large" style={{paddingRight:90,}}/>
                        </IconButton>

                    <Typography edge="edge" variant="h6" className={classes.title}>
                        Stock Comparison
                    </Typography>
                    <Button onClick={handleClick}  variant="contained" className={classes.visualize} >
                        Visualize
                    </Button>
                    </Toolbar>
                  </AppBar>
                <div className={classes.form} position="static">
                <FormControl className={classes.formControl} style={{minWidth: 80}}>
                        <TextField defaultValue="" className={classes.text} onChange={(e)=> handleChange(e)} variant="outlined" label="Select Stock" select > 
                          <MenuItem value={'AAPL'}>AAPL</MenuItem>
                          <MenuItem value={'IBM'}>IBM</MenuItem>
                          <MenuItem value={'FB'}>FB</MenuItem>
                          <MenuItem value={'GOOG'}>GOOG</MenuItem>
                          <MenuItem value={'AMC'}>AMC</MenuItem>
                          <MenuItem value={'GE'}>GE</MenuItem>
                          <MenuItem value={'TSLA'}>TSLA</MenuItem>
                          <MenuItem value={'NFLX'}>NFLX</MenuItem>
                          <MenuItem value={'MSFT'}>MSFT</MenuItem>
                        </TextField>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={addToCompareList}  variant="contained" className={classes.addBtn}> Add </Button>
                <br/><br/>
            </div>
              
            {!display ? <NoStocksScreen/> :
                <TableContainer className={classes.container} component={Paper} direction="row">
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow className={classes.tableHead}>
                        <StyledTableCell align="center"><LocalOfferIcon />&nbsp;Ticker </StyledTableCell>
                        <StyledTableCell  align="center"><AttachMoneyIcon/>&nbsp;Open Price</StyledTableCell>
                        <StyledTableCell align="center"><TrendingUpIcon/>&nbsp;High Price</StyledTableCell>
                        <StyledTableCell align="center"><TrendingDownIcon/>&nbsp;Low Price</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {!display ?<h3>No Stocks Selected</h3> :
                    <>
                        {items.map(item => (
                              <ListItem name={item.Name} openPrice={item.OpenPrice} highPrice={item.High} lowPrice={item.Low} key={item.id} />
                        ))}
                    </>
                    }
                  </Table>
                </TableContainer>  
            }  
        </div>
      )
}

export default Compare;
