export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Este es el título de Swagger',
            description: 'Esta es la descripción que aparecerá en la página principal'
        }
    },
    apis: ['../src/docs/**/*.yaml']
}