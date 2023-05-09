'use strict';

module.exports = async (server, options) => {
    const { auth } = options;
    const { User } = server.app.models;
    const validateHeaderFunc = async function (decoded, request, h) {

        try {
            const scope = 'user';
            const user = await User.findOne({
                where: {
                    id: decoded.user
                }
            });
            user.authType = 'normal';
            user.currentRole = scope;

            if (!user) {
                return { isValid: false };
            }

            return {
                isValid: true,
                credentials: { user, scope }
            };
        }
        catch(err) {
            request.log(['auth'], err, request);
            return { isValid: false };
        }
    };

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('kubex', 'jwt', {
        key: Buffer.from(auth.secret, 'base64'),
        validate: validateHeaderFunc,
        verifyOptions: { algorithms: [ 'HS256' ] }
    });
}
