const MemberModel = require('./Member');
const SubscriptionModel = require('./Subscription');

const getMembers = () =>
{
    return new Promise((resolve, reject) =>
    {
        MemberModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        });
    })
}

const getMember = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        MemberModel.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        });
    })
}


const addMember = (obj) =>
{
    return new Promise((resolve, reject) =>
    {

        let member = new MemberModel({
            name : obj.name,
            email : obj.email,   
            city: obj.city
        });

        member.save( function(err)
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




const updateMember = (id,obj) =>
{
    return new Promise((resolve, reject) =>
    {

        MemberModel.findByIdAndUpdate(id, {
            name : obj.name,
            email : obj.email,   
            city: obj.city
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


const deleteMember = (id) =>
{
    return new Promise((resolve, reject) =>
    {

        MemberModel.findByIdAndDelete(id, function(err)
      {
          if(err)
          {
              reject(err)
          }
          else
          {
              resolve('Deleted');
          }
      }).then(
        SubscriptionModel.deleteMany({ member: id }, function (err)
        {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    );
    })
}


module.exports =  {getMembers, getMember, addMember, deleteMember, updateMember};