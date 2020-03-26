module.exports = async (req, res, next) => {
    try {
        if (req.userData.role === 'admin'){
            next()
        } else {
            next({
                status:404,
                msg:'Unauthorized access'
            })
        }
    } catch (error) {
        next(error)
    }
}