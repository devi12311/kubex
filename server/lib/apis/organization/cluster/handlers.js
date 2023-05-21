module.exports = {
    create: async (request, h) => {
        const { kubeconfig, name } = request.payload;
        const { organization } = request.pre;
        const { Cluster } = request.server.app.models;
        const file = kubeconfig[0];
        // Read the kubeConfigData file into a buffer
        const kubeConfigData = await new Promise((resolve, reject) => {
            const chunks = [];
            file.on('data', (chunk) => chunks.push(chunk));
            file.on('end', () => resolve(Buffer.concat(chunks)));
            file.on('error', (error) => reject(error));
        });

        // Create a new cluster record in the database
        try {
            const cluster = await Cluster.create({ name, kubeConfig: kubeConfigData.toString(), organizationId: organization.id });
            return h.response({ message: 'Cluster created successfully', cluster }).code(201);
        } catch (error) {
            return h.response({ message: 'Error creating cluster', error }).code(500);
        }
    },

    getAll: async (request, h) => {
        const { organization, mapper } = request.pre;
        const { Cluster } = request.server.app.models;

        const clusters = await Cluster.findAll({
            where: {
                organizationId: organization.id
            }
        })

        return mapper(clusters);
    }
}
