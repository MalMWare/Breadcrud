const React = require('react')
const Default = require('./layouts/default')

function error404 () {
    return (
        <Default>
            <h1>Oops something went wrong</h1>
        </Default>
    )
}

module.exports = error404