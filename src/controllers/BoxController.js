const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    this.box = await Box.create({ title: req.body.title });

    return res.json(this.box);
  }

  async show(req, res) {
    this.box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    });
    return res.json(this.box);
  }
}

module.exports = new BoxController();
