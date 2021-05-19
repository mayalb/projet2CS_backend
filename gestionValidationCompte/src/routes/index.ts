

import "reflect-metadata";
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Router } from 'express';









const app: express.Application = express();

app.use(cors());
app.use(morgan("dev"));

const router = Router();
import {getUserByID} from '../controllers/User';
import {addTenant, getNonValidatedAccount ,validateTenantAccount,get,getTenantByID} from '../controllers/Tenant'
router.post('/add-tenant', addTenant)

router.get('/get-tenant',getNonValidatedAccount)
router.put('/update-tenant/:id',validateTenantAccount)
router.get('/', get);
router.get('/user/:id',getUserByID);
router.get('/get-tenant/:id',getTenantByID);



export default router;