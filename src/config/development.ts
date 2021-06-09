require('dotenv').config()

const config = {
  serverUrl: process.env.SERVER_URL,
  serverPort: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
  serverDatabase: process.env.SERVER_DB_DEV,
}

export default config
