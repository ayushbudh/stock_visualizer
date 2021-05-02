
## What it does?

Stock Visualizer is an app that helps to keep track prices of the some of the popular stocks by using line graph. It also allows to compare prices of two or more stocks and make a better choice from it. 

## How I Build ?

1.Stock Visualizer is build using <code>React.js</code>, <codeMaterial-UI></code>,  <code>Plotly.js</code>, <code>Context API</code> and <code>Alpha Vantage API</code>.
2. Stock Visualizer fetches data from the Alpha Vantage API and plots the x and y datasets on the graph using Plotly.js library.
3. It uses Context API to manage the state across different components without passing props deep down in different components.

## Instructions

1. Download the repository using the <code>code</code> button or clone the repository into your local machine using <code>git clone  https://github.com/ayushbudh/stock_visualizer </code> command in your terminal/command prompt.
2. Run <code>npm install</code> to install all node dependencies.
3. Run <code>npm start</code> to run the app locally on your machine

## Note

1. The Alpha Vantage API allows to make only five requests per minute. So, please wait for one minute to perform any actions once you have exhausted the limit.


