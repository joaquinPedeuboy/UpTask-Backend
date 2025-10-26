import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () => {
    if(server.listen){
        console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`))  
    } else {
        console.log(colors.bgRed.bold(`Error REST API en el puerto ${port}`))  
    }
})

