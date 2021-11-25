/**
 * ExchangeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fetch = require('node-fetch');
// import fetch from 'node-fetch';

// https://open.er-api.com/v6/latest/EUR

module.exports = {

    convert: async function (req, res) {
        let { from, to, amount } = req.allParams();
        fetch(`https://open.er-api.com/v6/latest/${from}`).then(async (result) => {
            let { rates } = await result.json();
            return res.json({ result: rates[to] * amount });

        }).catch(err => {
            res.serverError(err);
        });
    },
    country: async function (req, res) {
        fetch(`https://open.er-api.com/v6/latest/USD`).then(async (result) => {
            let { rates } = await result.json();
            return res.json({ result: Object.keys(rates) });
        }).catch(err => {
            res.serverError(err);
        });
    }
};

