import {Router} from 'express';

const router = Router();

router.post("/image", (req, res) => {
    console.log(req, res);
    res.send("ok");
});

export default router;