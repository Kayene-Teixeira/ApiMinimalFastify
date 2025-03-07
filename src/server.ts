import fastify from "fastify";
import { request } from "http";

const server = fastify({ logger: true }); //criando servidor

const teams = [
    {
        id: 1,
        name: 'McLaren',
        base: 'Woking, United Kingdom'
    },
    {
        id: 2,
        name: 'Mercedes',
        base: 'Brackley, United Kingdom'
    }
];

// Fazendo a controller 
server.get('/teams', async (request, response) => {
    response.type('application/json').code(200);
    return teams;
});

server.get('/drivers', async (request, response) => {
    response.type('application/json').code(200);

    return [
        {
            id: 1,
            name: 'Max Verstappen',
            team: 'Red Bull Racing'
        }
    ];
});

// Iniciando servidor
server.listen({ port: 3333 }, () => {
    console.log('Server init');
});