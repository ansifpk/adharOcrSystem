import { container } from "tsyringe";
import { AdharController } from "../controllers/implimentation/adharController";
import { AdharRouter } from "../routes/implimentation/adharRouter";
import { AdharService } from "../services/implimentation/imageService";

container.register("AdharController",{useClass:AdharController});  
container.register("AdharRouter",{useClass:AdharRouter});  
container.register("AdharService",{useClass:AdharService});  
container.register("AdharRepository",{useClass:AdharService});  

export default container;