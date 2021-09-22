const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({

    name: {
    type: String
    },
    
    genres: {
        type: [String],
        
    },
    
    premiered: {
        type: Date
    },
 
  image: {
    type: String
  }
  
});

module.exports = mongoose.model('movie', MovieSchema);
