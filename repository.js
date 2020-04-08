const Repository = db => {

    const repositories = {};

    const getDb = () => {
        return db;
    };

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

    const add = (name, repository) => {
        repositories[name] = repository(db);
    };

    const get = name => {
        return repositories[name];
    };

    return {
        getDb,
        checkIfTableExists,
        add,
        get,
    };
};

module.exports = Repository;
