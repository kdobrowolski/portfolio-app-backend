require('dotenv').config()

const MONGO_URL: string = process.env.MONGO_URL as string;

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const MONGO = {
    url: MONGO_URL,
    options: MONGO_OPTIONS
}

const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 6000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;