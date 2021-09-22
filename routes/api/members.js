const express = require('express');
const memberBL = require('../../models/memberBL');

const router = express.Router();

router.route('/')
    .get(function(req, resp)
    {
        memberBL.getMembers().then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .get(function(req, resp)
    {
        let id = req.params.id;

        memberBL.getMember(id).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .delete(function(req, resp)
    {
        let id = req.params.id;

        console.log(id)

        memberBL.deleteMember(id).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .put(function(req, resp)
    {
        let obj = req.body;
        let id = req.params.id;


        memberBL.updateMember(id,obj).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/')
    .post(function(req, resp)
    {
        let obj = req.body;
        console.log(obj);

        memberBL.addMember(obj).then(data =>
            {
                return resp.json(data);
            })
    })


module.exports = router;