const config = require('./config');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// It's usually a good idea to cache data w/ something like redis
// const redis = require('redis');

// If you want to store data in MySQL database instead of flat files
// const mysql = require('mysql2/promise');

const app = express();

app.use(express.json());
app.use(config.customHeaders);
app.use(cors());

// Enable CORS on all endpoints
app.options('*', cors());

app.get('/v1/status/', async (req, res) => {
    res.send({
        status: "OK",
        version: config.version
    });
});

app.get('/v1/disclosure/', async (req, res) => {
    const disclosure = config.getDisclosure();
    res.send(disclosure);
});

app.get('/v1/script/', async (req, res) => {
    const koios_url = new URL('https://api.koios.rest/api/v0/native_script_list');
    koios_url.searchParams.append(`script_hash`, `eq.${config.policy_id}`);

    const response = await axios.get(koios_url);

    res.send(response.data[0]);
});

app.get('/v1/supply/', async (req, res) => {
    const koios_url = new URL('https://api.koios.rest/api/v0/asset_info');
    koios_url.searchParams.append('_asset_policy', config.policy_id);
    koios_url.searchParams.append('_asset_name', Buffer.from(config.asset_name, 'ascii').toString('hex'));

    const response = await axios.get(koios_url);

    const total_supply = Number(response.data[0].total_supply);
    const disclosure = config.getDisclosure();

    let total_allocation = 0;
    let current_allocation = 0;

    const stake_addresses = [];
    const enterprise_addresses = [];

    if (disclosure.allocations.length) {
        disclosure.allocations.forEach(wallet => {
            if (wallet.amount) {
                total_allocation += Number(wallet.amount);
            }
            if (wallet.stake_key !== undefined && wallet.stake_key !== '') {
                stake_addresses.push(wallet.stake_key);
            } else {
                enterprise_addresses.push(wallet.address);
            }
        });
    }

    if (stake_addresses.length) {
        const staked_url = new URL('https://api.koios.rest/api/v0/account_assets');
        const staked = await axios.post(staked_url, {
            _stake_addresses: stake_addresses
        });

        if (staked.data.length) {
            staked.data.forEach(holder => {
                if (holder.asset_list.length) {
                    holder.asset_list.every(asset => {
                        if (asset.policy_id === config.policy_id) {
                            current_allocation += Number(asset.quantity);
                            return false;
                        }
                        return true;
                    });
                }
            });
        }
    }

    if (enterprise_addresses.length) {
        const enterprise_url = new URL('https://api.koios.rest/api/v0/address_assets');
        const enterprise = await axios.post(enterprise_url, {
            _addresses: enterprise_addresses
        });

        if (enterprise.data.length) {
            console.log("Have enterprise addresses...");
            enterprise.data.forEach(holder => {
                if (holder.asset_list.length) {
                    holder.asset_list.every(asset => {
                        if (asset.policy_id === config.policy_id) {
                            current_allocation += Number(asset.quantity);
                            return false;
                        }
                        return true;
                    });
                }
            });
        }
    }

    res.send({
        allocated: total_allocation,
        held: current_allocation,
        circulating: total_supply - current_allocation,
        total: total_supply,
        max: disclosure.max_supply
    });

})

app.listen(config.port, () => {
    console.log(`FUDS Oracle running on port ${config.port}`);
});
