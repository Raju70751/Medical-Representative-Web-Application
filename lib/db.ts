import mongoose from 'mongoose'

export const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongo DB Connected")
    } catch {
        console.log('Error')
    }

}