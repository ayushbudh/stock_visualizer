import React, {  useContext } from 'react'
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, MenuItem, FormControl } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { StockContext } from '../ContextProvider/StockContext';
import NoStocksScreen from '../ErrorPages/NoStock';

const Stock = () => {
       
        // using Context Api to get the current state and the fuction to alter it.
        const { stocks } = useContext(StockContext);
        const [stock, setStockData] = stocks;
        
        // to navigate different route
        const history = useHistory();

        // handling click event
        const handleClick = () =>{
            history.push("/compare");
        }

        // fetching and plotting points on the graph for a given stock 
        const setStock = e => {
        
        // put this in .env file
        
        // getting stock symbol from the selection
        let StockSymbol = e.target.value;

        // mapping company names to their respective stock ticker (or stock symbol)
        const companyNames = {"AAPL":"Apple", "FB": "Facebook", "GOOG": "GOOGLE", "TSLA":"Tesla", "AMC":"AMC", "IBM":"IBM", "GE": "General Electric", "NFLX":"Netflix", "MSFT":"MicroSoft"};

        // api endpoint
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${process.env.API_KEY}`;
        
        // making two arrays for temporary storage of X and Y values fetched from the API. These values wiil be store in the state using Context API.
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        // fetching data using the api endpoint
        // if it succedds then we can get json response
        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                // pusing all the X and Y values to the temporary arrays
                for (let key in data['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                }

            // setting state of the app 
                     if(e.target.value===0){
                         setStockData({stockName: companyNames[StockSymbol], stockSymbol: e.target.value, stockChartXValues: stockChartXValuesFunction, stockChartYValues: stockChartYValuesFunction, stockTitle: e.target.value, display:false });
                       }else{
                          setStockData({stockName: companyNames[StockSymbol], stockSymbol: e.target.value, stockChartXValues: stockChartXValuesFunction, stockChartYValues: stockChartYValuesFunction, stockTitle: e.target.value, display:true });
                       }
            }
        )       
        }

        // styling
        const useStyles = makeStyles((theme) => ({
                root: {
                    backgroundColor: 'black',
                    flexGrow: 1,
                    paddingBottom:4,
                    color:'#39FF14',
                    borderBottom:'1px solid white',
                    boxShadow:'5px 5px 27px 5px #39FF14 '
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
                    paddingLeft:30,
                    paddingRight:30,
                    paddingTop:18,
                    paddingBottom:12,
                },
                text: {
                
                width: 120,
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
            <div className={classes.root}>
             <AppBar position="static" className={classes.root} >
                <Toolbar >
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FormControl >
                        <TextField defaultValue="" className={classes.text} onChange={setStock} variant="outlined" label="Select Stock" select>
                        <MenuItem value={'AAPL'}>AAPL</MenuItem>
                        <MenuItem value={'IBM'} >IBM</MenuItem>
                        <MenuItem value={'FB'}  >FB</MenuItem>
                        <MenuItem value={'GOOG'}>GOOG</MenuItem>
                        <MenuItem value={'AMC'}>AMC</MenuItem>
                        <MenuItem value={'GE'}>GE</MenuItem>
                        <MenuItem value={'TSLA'}>TSLA</MenuItem>
                        <MenuItem value={'NFLX'}>NFLX</MenuItem>
                        <MenuItem value={'MSFT'}>MSFT</MenuItem>
                        </TextField>
                    </FormControl>
                </IconButton>
                <Typography edge="edge" variant="h6" className={classes.title}>
                    Stock Visualizer
                </Typography>
                    <Button onClick={handleClick} variant="contained" className={classes.cmpBtn}>
                    Compare
                    </Button>
                </Toolbar>
             </AppBar>


                 {!stock.display ?<NoStocksScreen/> : 
                <div className={classes.line_plot}>
                    <Plot position="static"
                    data={[
                        {
                          x: stock.stockChartXValues, y: stock.stockChartYValues, type: 'scatter', mode: 'lines+markers', marker: {color: '#39FF14'},                      
                        },
                    ]}
                    layout={ 
                            { width: 900, height: 690,title: stock.stockName, plot_bgcolor: 'black', paper_bgcolor:'black',
                              font:{color:'#39FF14'},
                              xaxis: {title: { font: { family: 'Courier New, monospace', size: 18, color: '#39FF14' }}},
                              yaxis: {title: { text: 'Amount($)',font: { family: 'Courier New, monospace', size: 18, color: '#39FF14'}}},
                            }
                        }
                    />
                    </div>
                } 
            </div>
        )
}

export default Stock;
