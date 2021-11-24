const mongoose = require('mongoose');
import Config,{Connection} from '../config/index'



    mongoose.Promise = global.Promise;

    //https://tutorial.tips/3-ways-to-fix-property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructorts/
    
    export class MongoDB {
    
    
      constructor(local ){
        this.uri = local ? Config.MONGO_LOCAL_URL : Config.MONGO_INGRESS;
         
        this.instance = 0
      }
      
       async connect(){
        if (!this.connection){ 
        return  this.connection = await mongoose.connect(this.uri)
        }
        else{
          this.connection
        }
      }
      async getConnection() {
        if (!this.connection){
         
         
         return  this.connection =  await  mongoose.createConnection(this.uri);
        }
        return this.connection;
      }
 }
    


