const _404_page_get = (req, res, next) => {
  res.status(404).render("404", { path: req.url });
};
module.exports = { _404_page_get }