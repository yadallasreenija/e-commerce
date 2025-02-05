const app = require('./app')
const connectDB=require('./db/db')

process.on('uncaughtException',(error)=>{
    console.log(`server shutting down ${error.message}`)
    process.exit(0)
})


if(process.env.NODE_ENV !== 'PRODUCTION')
    require('dotenv').config({path:'config/.env'})

connectDB()

PORT =5000
app.listen(PORT,()=>{
    try {
        console.log(`Server successfully listen at port http://localhost:${PORT}`)
        
    } catch (error) {
         console.log(error)
    }
   
})