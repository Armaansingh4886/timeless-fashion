
const uploadFile = async (req, res) => {

    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // You can process the uploaded file here
    console.log('Uploaded file:', file);
    res.send({message:'File uploaded successfully.',path:file.path});

}
module.exports = uploadFile;