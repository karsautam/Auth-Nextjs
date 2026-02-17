// import { error } from "console";
// import { console } from "inspector";
import mongoose from "mongoose";


export async function connect() {
    const URL=`mongodb+srv://user2000:hitlar123@cluster0.srs0t42.mongodb.net/`
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection
        connection.on("connected", ()=> {
                console.log("mongodb is connected succesfully✅✅");
                
        })
        connection.on("error",(error) => {
            console.log("mongodb is not connected❌❌, make sure db is up and running:"+ error );
            process.exit();
            
        })
    }
    catch (error){
        console.log("something went wrong in connecting to Database");
        console.log(error);

    }
    
}