module.exports = async (models) => {
    const { User, Organization } = models;

    // inject all models associations
    await Organization.belongsTo(User, {
        foreignKey: 'id',
        targetKey: 'userId'
    })

    await User.hasMany(Organization, {
        foreignKey: 'id',
        targetKey: 'userId'
    })
}
