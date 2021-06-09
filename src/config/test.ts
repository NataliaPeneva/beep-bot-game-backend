require('dotenv').config()

const config = {
  serverUrl: process.env.SERVER_URL,
  serverPort: 5001,
  jwtSecret: process.env.JWT_SECRET,
  serverDatabase: process.env.SERVER_DB_TEST,
}

export default config
