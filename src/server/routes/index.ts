import { Router } from "express";

const router = Router();

router.post('/',(req,res)=>{
    console.log('app POST default route');
})

export {router}