module.exports = {
    create: async (request, h) => {
        const { name } = request.body;
        const { user } = request.auth.credentials;
        const { id: userId } = user;
        const { Organization } = request.server.app.models;

        const createdOrganization = await Organization.create({
            name,
            userId
        })

        return createdOrganization
    }
}
