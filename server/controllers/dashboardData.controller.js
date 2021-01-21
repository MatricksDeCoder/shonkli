const dashboardData = require('../data/dashboard');

// check a test route ([GET] ../dev/test)
exports.getDashBoardData = async (req,res,next) => {
    console.log('getDashBoardData: [GET] /dashboard-data')
    res.json(dashboardData)
}
