// Interface of CoinBase API 
// Possible uses are for poling for buy/sell limits. 
var chalk = require('chalk');
var config = require('./config.json');
var coinbase = require('coinbase');
var asyncpoll = require('async-polling');

console.log(config.key);

var client = new coinbase.Client({
    'apiKey': config.key,
    'apiSecret': config.secret
});
var self = this;
var pricePerETH;
var pricePerBTC;

// Simply get accounts. 
client.getAccounts({}, function (err, accounts) {
    if (accounts) {
        accounts.forEach(function (acct) {
            console.log('Wallet Balance: ' + chalk.cyan(acct.balance.amount) + ' for ' + acct.name);
            console.log(chalk.yellow('EUR Balance: ' + acct.balance.amount * self.pricePerETH));
        });
    } else {
        console.log(chalk.yellow("Got nothing from CoinBase.. Do you have accounts ? Error : " + err));
    }
});

// Check prices
// TODO : Fire events based on high|low
self.checkPrices = function () {
    client.getBuyPrice({
        'currencyPair': 'ETH-EUR'
    }, function (err, obj) {
        self.pricePerETH = obj.data.amount;
        console.log(chalk.green('ETH - EUR : ' + obj.data.amount));
    });

    client.getBuyPrice({
        'currencyPair': 'BTC-EUR'
    }, function (err, obj) {
        self.pricePerBTC = obj.data.amount;
        console.log(chalk.green('BTC - EUR : ' + obj.data.amount));
    });
}

// TODO: Thread management for repolling
var pollingAgent = asyncpoll(self.checkPrices, config.repoll_period_ms);
// TODO: Any extra checks ? 

pollingAgent.run();
