const DbPropType = require('./prop_types/Db.propType');

const Repository = db => {

    const checkIfTableExists = async table => {
        const results = await db.query(
            "SELECT * " +
            "FROM information_schema.tables " +
            "WHERE table_schema = '" + process.env.DB_DB + "' " +
            "AND table_name = '" + table + "' " +
            "LIMIT 1"
        );

        return results && results.length > 0;
    };

    const getDb = () => {
        return db;
    };

    return {
        checkIfTableExists,
        getDb
    };
};

if (process.env.NODE_ENV !== 'production') {
    Repository.propTypes = {
        db: PropTypes.shape(DbPropType)
    };
}

module.exports = Repository;
