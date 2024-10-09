const mongoose=require('mongoose')

const dbConnection=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected To MongoDB",connect.Connection.name,connect.connection.host)
        
    } catch (error) {
        console.log("Not connected to MongoDB",error)
        ProcessingInstruction.exit(1)
    }
}

module.exports=dbConnection 