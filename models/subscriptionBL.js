const SubscriptionModel = require('./Subscription');

const getSubscriptions = () =>
{
    return new Promise((resolve, reject) =>
    {
        SubscriptionModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        }).populate('member', ['name', 'email', 'city']).populate('movie', ['name', 'genres', 'premiered', 'image']);
    })
}

const getSubscription= (id) =>
{
    return new Promise((resolve, reject) =>
    {
        SubscriptionModel.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        }).populate('member', ['name', 'email', 'city']).populate('movie', ['name', 'genres', 'premiered', 'image']);
    })
}




const addSubscription = (obj) =>
{
    return new Promise((resolve, reject) =>
    {

        let subscription = new SubscriptionModel({
            movie: obj.movie,
            member: obj.member,
            date: obj.date
        });

        subscription.save( function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Created");
            }
        });
    })
}




const updateSubscription = (id,obj) =>
{
    return new Promise((resolve, reject) =>
    {

        SubscriptionModel.findByIdAndUpdate(id, {
            movie: obj.movie,
            member: obj.member,
            date: obj.date
        }, function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Updated");
            }
        })

    })
}


const deleteSubscription = (id) =>
{
    return new Promise((resolve, reject) =>
    {

        SubscriptionModel.findByIdAndDelete(id, function(err)
      {
          if(err)
          {
              reject(err)
          }
          else
          {
              resolve('Deleted');
          }
      })
    })
}


module.exports =  {getSubscriptions, getSubscription, addSubscription, deleteSubscription, updateSubscription};