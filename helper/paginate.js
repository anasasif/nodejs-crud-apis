module.exports = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.size) || 10;
    req.page = parseInt(req.query.page) - 1 || 0;
    req.limit = parseInt(req.query.size) || 10;
    req.offset = limit * page;
    req.currentPage = parseInt(req.query.page);
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid request" });
  }
};