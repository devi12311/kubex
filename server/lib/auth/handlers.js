const Boom = require('@hapi/boom');

module.exports = {
    register: async function (request, h) {
        const { User } = request.server.app.models;
        const { db } = request.server.app;
        const {
            username,
            password,
            email
        } = request.payload;
        try {
            if (email) {
                const existingUser = await User.findOne({
                    where: { email }
                });

                if (existingUser) {
                    return Boom.badRequest(
                        'Email address is already used to register an account');
                }
            }

            const user = {};

            const mappedUser = await db.transaction(async (t) => {
                    user.username = username.trim();
                    user.email = email.trim();
                    user.password = password;
                    await User.create(user,{ transaction: t });
                return user;
            });

            return { ...mappedUser };
        } catch (err) {
            request.log(['auth', 'register', 'complete'], err, request);
            return Boom.badImplementation(err);
        }
    },

    login: async function (request, h) {
        const { Token, User } = request.server.app.models;
        const AuthHelpers = request.pre.auth;
        const { password, username } = request.payload;

        if (!password) {
            return Boom.badRequest(
                'No password',
            );
        }

        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })

            if (!user) {
                return Boom.forbidden('Wrong Credentials');
            }

            const token = await Token.create({
                userId: user.id
            });

            const generatedData = await AuthHelpers.generateAccessToken({
                user,
                token,
                authType: 'normal'
            })

            return { user, auth: { ...generatedData } };
        } catch (err) {
            console.log(err)
            request.log(['auth', 'login'], err, request);
            return Boom.badImplementation(err);
        }
    },
}
