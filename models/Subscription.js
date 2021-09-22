const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },

    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    },
    
   
    
    date: {
        type: Date
        
    }
    
    
});

module.exports = mongoose.model('subscription', SubscriptionSchema);
