const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '05ed37d867464a3da7014e4388d55018'
});

const handleApiCall = (req, res) => {
    app.models
      .predict(
       Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then( data => {
	      res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req,res,db) => {
   const { id } = req.body;

   db('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then(entries => {
	   console.log(entries);
	   if ( entries.length ) {
	      res.json(entries[0]);
	   } else {
	      res.status(400).json('enable to get entries');
	   }
   })
   .catch(err => {
	   res.status(400).json('enable to get entries');
   })
}

module.exports = {
	handleImage,
	handleApiCall
}