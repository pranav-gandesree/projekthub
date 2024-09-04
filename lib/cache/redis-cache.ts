import { createClient } from 'redis';

const redisClient = createClient({
    password: '8ZlJ01TMxtm0ljyorMRHZqVSU8Xds7QY',
    socket: {
        host: 'redis-10240.c14.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10240
    }
});

// Handle connection events
redisClient.on('connect', () => {
    console.log('Connecting to Redis...');
});

redisClient.on('ready', () => {
    console.log('Connected to Redis successfully!');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisClient.on('end', () => {
    console.log('Disconnected from Redis.');
});

// Connect to Redis
redisClient.connect();


export default redisClient;