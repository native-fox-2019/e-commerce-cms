function errorHandler(err, req, res, next) {

    let status, message, error = []
    //  console.log(err)

    if (err.name === 'ValidationError') {
        status = 400
        for (let key in err.errors) {
            error.push(err.errors[key].message)
        }
    } else if (err.name === 'CastError') {
        status = 404
        error.push('data not found')
    } else if (err.message.name === 'JsonWebTokenError') {
        status = 400
        error.push('login first')
    } else {
        if (err.status) status = err.status
        else status = 500
        error.push(err)
    }

    res.status(status).json({ error })

}

module.exports = errorHandler


// "use strict"

// function errorHandler(err, req, res, next) {
//     console.log('ERROR HANDLER')
//     console.log(err)
//     console.log('ERROR NAME')
//     console.log(err.name)
//     let status, error = []

//     switch (err.name) {
//         case ('SequelizeValidationError'):
//             status = 400
//             for (let key in err.errors) error.push(err.errors[key].message)
//             break
//         case ('JsonWebTokenError'):
//             status = 400
//             error.push(`You're not authenticated to do that!`)
//             break
//         default:
//             status = err.status || 500
//             error.push(err)
//             break
//     }
//     console.log('SENDING ERROR')
//     res.status(status).json({ error })
// }

// module.exports = errorHandler
