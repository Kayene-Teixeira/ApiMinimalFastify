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

const drivers = [
    {
        id: 1,
        name: 'Max Verstappen',
        team: 'Red Bull Racing'
    },
    {
        id: 2,
        name: 'Lewis Hamilton',
        team: 'Ferrari'
    },
    {
        id: 3,
        name: 'Lando Norris',
        team: 'McLaren'
    },
];

// Fazendo a controller 
server.get('/teams', async (request, response) => {
    response.type('application/json').code(200);
    return teams;
});

server.get('/drivers', async (request, response) => {
    response.type('application/json').code(200);

    return drivers;
});

interface DriverParams {
    id: string
}

// Filtrando corredores, passando parametros pela rota 
// os parametros da rota devem seguir o contrato DriverParams
server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((driver) => driver.id === id);

    if(!driver) {
        response.type('application/json').code(404);
        return { message: 'Driver not found' };
    } else {
        response.type('application/json').code(200);
        return { driver };
    }
});

// Iniciando servidor
server.listen({ port: 3333 }, () => {
    console.log('Server init');
});