import mysql from "mysql";

const Db = (multipleStatements = false) => {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const database = process.env.DB_DB;
  const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
    multipleStatements: multipleStatements,
  });

  const query = async (sql) => {
    return await new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  const insert = async (table, data) => {
    const fields = Object.keys(data).join(",");
    const values = '"' + Object.values(data).join('","') + '"';
    return await query(
      "INSERT INTO" + " " + table + " (" + fields + ") VALUES (" + values + ")"
    );
  };

  const update = async (table, data, conditions) => {
    let values = createConditions(data);
    let where = createConditions(conditions, "=", " AND ");

    return await query(
      "UPDATE " + table + " SET " + values + " WHERE " + where
    );
  };

  const createConditions = (data, keyValueSeparator = "=", separator = ",") => {
    const entries = Object.entries(data);
    const length = entries.length;
    let conditions = "";

    for (let i = 0; i < length; i++) {
      const [key, value] = entries[i];
      if (conditions !== "") {
        conditions += separator;
      }
      conditions += " `" + key + "` ";
      conditions += keyValueSeparator;
      conditions += '"' + value + '"';
    }

    return conditions;
  };

  const get = async (table, fields, conditions) => {
    const select = typeof fields === "string" ? fields : fields.join(",");
    const where = createConditions(conditions, "=", " AND ");

    return await query(
      "SELECT " + select + " FROM " + table + " WHERE " + where
    );
  };

  const countAllRows = async (table) => {
    return await query("SELECT COUNT(*) AS count FROM" + " " + table);
  };

  return {
    getConnection: connection,
    query,
    insert,
    update,
    get,
    countAllRows,
    close: () => {
      connection.end();
    },
  };
};

export default Db;

