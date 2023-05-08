const { faker } = require('@faker-js/faker');
const full_data = [];

function createRandomUser() {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        city: faker.address.city(),
        vehicle: faker.vehicle.vehicle()
    };
}

Array.from({ length: 2000 }).forEach(() => {
    full_data.push(createRandomUser());
});
const users = full_data.map(user => {
    return {
        id: user.id,
        username: user.username,
        avatar: user.avatar
    }
})

const fastify = require('fastify')({ logger: true })
fastify.get('/users', async (request, reply) => {
    return users
})

const Random = {
    Range : function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
}

fastify.get('/users/:id', async (request, reply) => {
    await new Promise(resolve => setTimeout(resolve, Random.Range(2000,6000)));
    return full_data.find( user => user.id === request.params.id)
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()