import { useState } from "react";
import { client } from "../service/client";


export default ()=>{
    const [errors,setError] = useState<null|{message:string}[]>(null);

     const doRequest = async({url,method,body,onSuccess}:{
        url:string,
        method:"get"|"post"|"patch"|"delete",
        onSuccess:(data:any)=>void,
        body:object
    })=>{
          try {
            setError(null);
            const res = await client[method](url,body);
           
            if(onSuccess){
              onSuccess(res.data)
            }
            return res.data;
          } catch (error:any) {
            console.log(error,"errorerrorerrorerror",error.response.data.errors);
            
            setError(error.response.data.errors)
          }
     }
     return {doRequest,errors};
}