module.exports = (req, res, next) => {
    const token = req.query.token;
    let isLogin = !!token
    if (req.data) req.data.isLogin = isLogin;
    else req.data = { isLogin }
    next()
}