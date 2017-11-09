# ICoinBase
Coinbase implementation in nodeJS
A polling agent will check the current value and based on the high & low of the configuration will buy | sell. 

# Setup
`npm install`
This will install all required node_modules including the coinbase npm package. 

# Configuration
You must modify the configuration to see your internal wallet. 
`config.json`
This file will also include buy and sell values (in USD) on coinbase.

# Execution 
`node main.js`

# TODO: 
- Implement buy sell API from coinbase. Adhear to CoinBase security standard. 
- Maintain historic data of prices recorded. 
- Evaluate trends of price fluctuations
- Database implementation : TimeSeries Database ? Cassandra ?
