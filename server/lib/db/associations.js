module.exports = async (models) => {
    const { User, Organization, Token } = models;

    // inject all models associations
    await Organization.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id'
    })

    await User.hasMany(Organization, {
        foreignKey: 'id',
    })

    await Token.belongsTo(User);
}
