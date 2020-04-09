const PropTypes = require('prop-types');

const DbPropType = {
    getConnection: PropTypes.func.isRequired,
    query: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    countAllRows: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};

module.exports = DbPropType;
