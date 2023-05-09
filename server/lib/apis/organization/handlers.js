const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { name } = request.payload;
        const { user } = request.auth.credentials;
        const { id: userId } = user;
        const { Organization } = request.server.app.models;

        try {
            const organization = await Organization.create({
                name,
                userId
            })

            console.log(organization);

            return organization
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
}
