const router = require('express').Router();
//api routes
import apiRoutes from './api';

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error! Page Not Found</h1>');
});

export default router;
