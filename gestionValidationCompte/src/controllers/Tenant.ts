


import { Request, Response } from "express";
import {Tenant} from "../entity/Tenant";


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
    const tenants = await Tenant.find({ where:[{ accountState: "pending" },{ accountState: "Pending" },{ stateMessage: "PENDING" }]  });
   return res.json(tenants)
}
export async function get(_req: Request, res: Response) {
    res.end("Hello this is get tenant.");
 }
 //This functions  updates accountState and StateMessage of a Tenant 
 export const validateTenantAccount = async (_req: Request, res: Response) => {
        const idTenant = _req.params.id ;
        const accountState = _req.body.accountState;
        const statemessage=_req.body.statemessage;
    
        try {
          const tenant = await Tenant.findOneOrFail(idTenant);
    
          tenant.accountState = accountState || tenant.accountState;
         tenant.stateMessage=statemessage|| tenant.stateMessage;
      
    
          await tenant.save();
    
          return res.status(200).json({
            tenant,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "Something went wrong" });
        }
      }
    

    

