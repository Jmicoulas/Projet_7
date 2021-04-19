const path = require("path");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../frontend/feed.html`));
};

module.exports = {
  getHome: home
};