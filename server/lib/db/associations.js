module.exports = async (models) => {
    const { User, Organization, Token, Cluster } = models;

    // inject all models associations
    await Organization.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
        constraints: false
    })

    await Cluster.belongsTo(Organization, {
        foreignKey: 'organizationId',
        targetKey: 'id',
        constraints: false
    })

    await Organization.hasMany(Cluster, {
        foreignKey: 'id',
        constraints: false
    })


    await User.hasMany(Organization, {
        foreignKey: 'id',
        constraints: false
    })

    await Token.belongsTo(User);
}
