const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
  async store(req, res) {
    this.box = await Box.findById(req.params.id);

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });

    this.box.files.push(file);

    await this.box.save();

    // eslint-disable-next-line no-underscore-dangle
    req.io.sockets.in(this.box._id).emit('file', file);

    return res.json(file);
  }
}

module.exports = new FileController();
