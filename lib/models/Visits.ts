import mongoose from "mongoose";


const VisitsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: String
    },
    pharmacy: {
        type: String
    },
    remarks: {
        type: String
    }
})

const VisitModel = mongoose.models.visitlist || mongoose.model('visitlist', VisitsSchema)

export default VisitModel
