

import "reflect-metadata";
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Router } from 'express';









const app: express.Application = express();

app.use(cors());
app.use(morgan("dev"));

const router = Router();

import {addTenant, getNonValidatedAccount ,validateTenantAccount,get} from '../controllers/Tenant'
router.post('/add-tenant', addTenant)

router.get('/get-tenant',getNonValidatedAccount)
router.put('/update-tenant/:id',validateTenantAccount)
router.get('/', get);


export default router;