


import { Request, Response } from "express";
import {User} from "../entity/User";

import{getNonValidatedAccount} from "./Tenant"
  //this function  returns Tenants which have non validated accounts
export async function getUserByID(_req: Request, res: Response) {

  const  idUser= _req.params.id
    const user = await User.findOneOrFail(idUser);
    
   return res.json(user)
}

export async function getByID(id:number,res: Response) {

    
      const user = await User.findOneOrFail(id);
      
     return res.json(user)
  }
  
        

    

