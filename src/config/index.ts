const env = process.env.NODE_ENV || 'development'

interface Config {
  serverUrl: string
  serverPort: number
  serverDatabase: string
  jwtSecret: string
}

const config: Config = require(`./${env}`).default

export default config
