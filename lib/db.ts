import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null

export async function ConnectToDB() {

    if (cachedConnection) {
        console.log("Using cached connection");
        return cachedConnection

    }

    try {

        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        cachedConnection = connection.connection
        console.log("New DB connection");
        return cachedConnection;

    } catch (error) {

        console.log(error);
        throw error

    }
}