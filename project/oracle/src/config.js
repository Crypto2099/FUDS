const fs = require("fs");
const config = {
    policy_id: 'd894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a0',
    asset_name: 'spacecoins',
    port: 867,
    version: '1.0.0',
    customHeaders: function(req, res, next) {
        res.setHeader('X-Powered-By', `FuDS v${config.version}`);
        next();
    },
    getDisclosure: function() {
        let disclosure = null;
        if (this.useFlatFiles) {
            const raw_disclosure = fs.readFileSync('disclosure.json');
            disclosure = JSON.parse(raw_disclosure);
        }
        return disclosure;

    },
    useFlatFiles: true
}

module.exports = config;