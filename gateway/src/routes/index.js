const express = require('express');
const router = express.Router();
const { springProxy, dotnetProxy } = require('../services/proxyService');

// Spring Boot Routes (Port 8081)
router.use('/auth', springProxy);
router.use('/api/auth', springProxy);
router.use('/client', springProxy);
router.use('/api/client', springProxy);
router.use('/planner', springProxy);
router.use('/api/planner', springProxy);
router.use('/admin/dashboard', springProxy);
router.use('/admin/clients', springProxy);
router.use('/admin/planners', springProxy);
router.use('/admin/bookings', springProxy);
router.use('/api/admin', springProxy);
router.use('/packages', springProxy);
router.use('/planners', springProxy);
router.use('/cities', springProxy);
router.use('/api/cities', springProxy);
router.use('/bookings', springProxy);
router.use('/api/bookings', springProxy);
router.use('/api/images', springProxy);
router.use('/notifications', springProxy);
router.use('/api/payments', springProxy);
router.use('/payments', springProxy);
router.use('/admin/payments', springProxy);

// ASP.NET Core Routes (Port 5000)
router.use('/api/feedback', dotnetProxy);
router.use('/reviews', dotnetProxy);
router.use('/admin/reports/feedback', dotnetProxy);

module.exports = router;
