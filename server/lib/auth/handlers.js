const Boom = require('@hapi/boom');

module.exports = {
    register: async function (request, h) {
        const { User } = request.server.app.models;
        const { mapper } = request.pre;
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

            const user = await User.create({
                username,
                password,
                email
            })

            return mapper(user)
        } catch (err) {
            request.log(['auth', 'register', 'complete'], err, request);
            return Boom.badImplementation(err);
        }
    },

    login: async function (request, h) {
        const { Token, User } = request.server.app.models;
        const AuthHelpers = request.pre.auth;
        const { password, username } = request.payload;
        const { mapper } = request.pre;

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

            return { ...mapper(user), auth: { ...generatedData } };
        } catch (err) {
            console.log(err)
            request.log(['auth', 'login'], err, request);
            return Boom.badImplementation(err);
        }
    },

    logout: async function (request, h) {
        const { Token } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { refreshToken } = request.payload
        try {
            if (refreshToken) {
                await Token.destroy({
                    where: {
                        userId: user.id,
                        refreshToken
                    }
                })
            }

            return {
                message: "Logged out successfully.",
            }
        } catch (err) {
            request.log(['auth', 'logout'], err, request);
            return Boom.badImplementation(err);
        }
    },

    getNewAccessToken: async function (request, h) {

        const AuthHelpers = request.pre.auth;
        const { Token, User } = request.server.app.models;
        const { refreshToken } = request.payload;

        try {
            const token = await Token.findOne({
                where: {
                    refreshToken: refreshToken
                },
                include: {
                    model: User,
                    as: 'user'
                },
            })

            if (!token) {
                return Boom.badRequest("Not valid or expired refresh token.")
            }

            const tokenExpireDate = new Date(token.expiresAt);
            const dateNow = new Date();

            if (tokenExpireDate < dateNow) {
                return Boom.badRequest("Not valid or expired refresh token.")
            }

            const newRefreshToken = await Token.create({
                userId: token.userId
            });

            const generatedData = await AuthHelpers.generateAccessToken({
                user: { id: token.userId },
                token: newRefreshToken,
                authType: 'normal'
            });

            await Token.destroy({
                where: {
                    refreshToken: refreshToken
                }
            })

            return {
                accessToken: generatedData.accessToken,
                refreshToken: generatedData.refreshToken,
                expiresIn: generatedData.expiresIn,
                tokenType: generatedData.tokenType,
                expiresAt: generatedData.expiresAt,            }

        } catch (err) {
            request.log(['auth', 'getNewAccessToken'], err, request);
            return Boom.forbidden(err)
        }
    },
}
