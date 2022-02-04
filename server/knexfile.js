module.exports = {
  client: "mysql",
  connection: {
      host: "db", // name defined in docker-compose.yml
      user: "root",
      password: "root", // defined in docker-compose.yml
      database: "dnd", // defined in docker-compose.yml
      charset:"utf8"
  }
}
