const express = require('express')
const instructors = require('./instructors')
const app = express()
const port = process.env.PORT || 3040
const cors = require('cors')

app.use(cors())

let selectedId = (instructors, id) => {
    for (let i = 0; i < instructors.length; i++) {
        if (instructors[i]["ID"] == id) {
            return instructors[i]
        }
    }
}

app.get('/', (req, res, next) => {
    res.json(instructors)
    next()
})

app.get('/:id', (req, res, next) => {
    let instructorInfo = selectedId(instructors, req.params.id)
    if (instructorInfo == null) {
        res.status(404).json({
            error: {
                message: 'Not found'}
        })
    }
    else {
        res.json({data: instructorInfo})
    }
})

app.listen(port)
