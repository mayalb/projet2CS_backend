


import { Request, Response } from "express";
import { createQueryBuilder, getManager } from "typeorm";
import {Tenant} from "../entity/Tenant";
import {User} from "../entity/User";
import { getByID } from "./User";

export const addTenant = async (req: Request, res: Response) => {
    const tenant = Tenant.create({
        idTenant : req.body.idTenant, 
   
        profilePicture: req.body.profilePicture,
        permitPicture: req.body.permitPicture,
        accountState: req.body.accountState, 
        stateMessage:req.body.stateMessage,
    })
    console.log()
    await tenant.save()
    res.send(tenant)
}
  //this function  returns Tenants which have non validated accounts
export async function getNonValidatedAccount(_req: Request, res: Response) {
  var tenants:any = await getManager()
  .createQueryBuilder()
  .select()
  .from(Tenant,"tenant")
  .where('tenant.accountState = :id', { id:"Pending"  })
  .getRawMany()
  
    for(var i=0;i<tenants.length;i++){
      console.log(i);
      const user = await User.findOne({idUser:tenants[i].idUser});
    
      if(user){
        let data=await getManager()
          .createQueryBuilder()
          .select("tenant.*")
          .addSelect("user.userName as userName")
          .from(Tenant, "tenant")
          .where('tenant.accountState = :id', { id:"Pending"  }) 
          .andWhere('tenant.idTenant = :v', { v:tenants[i].idTenant })       
          .innerJoin(User, "user", "tenant.idUser=user.idUser")
          .getRawOne()
          tenants[i]=data    

      }
    }
   return res.json(tenants)
}
export async function getTenantByID(_req: Request, res: Response) {
  
 
    const  idUser= _req.params.id

    const tenant = await Tenant.findOneOrFail(idUser);
    if(tenant){ 
      let data=await getManager()
        .createQueryBuilder()
        .select("tenant.*")
        .addSelect("user.userName as userName")
        .addSelect("user.phoneNumber as phoneNumber")
        .from(Tenant, "tenant")
        .where('tenant.idTenant = :id', { id:idUser })
        .innerJoin(User, "user", "user.idUser=tenant.idUser")
        .getRawOne()
     
        return res.json(data)
    }else{
      console.log("utilisateur non trouvé");
      return 0;
    }
  

}
export async function get(_req: Request, res: Response) {
    res.end("Hello this is get tenant.");
 }
 //This functions  updates accountState and StateMessage of a Tenant 
 export const validateTenantAccount = async (_req: Request, res: Response) => {
        const idTenant = _req.params.id ;
        const accountState = _req.body.accountState;
        const stateMessage=_req.body.stateMessage;
        console.log(accountState);

    
        try {
          const tenant = await Tenant.findOneOrFail(idTenant);
    
          tenant.accountState = accountState || tenant.accountState;
         tenant.stateMessage=stateMessage|| tenant.stateMessage;
      
    
          await tenant.save();
    
          return res.status(200).json({
            tenant,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "Something went wrong" });
        }
      }
    

    

