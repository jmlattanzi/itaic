/**
 * POST CONTROLLER
 * This controller handles all the posting methods such as pushing a post to the database.
 * I believe S3 is integrated into here but for now we will just store image urls in the ITAIC db.
 */

require('dotenv').config()

// MOVE AWS UPLOAD TO UTILITY FILE
const aws = require('aws-sdk')
const s3Bucket = new aws.S3({
    Bucket: process.env.BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

module.exports = {
    create: (req, res) => {
        console.log(req.file)

        try {
            const db = req.app.get('db')
            if (req.session.user) {
                // setup S3 params
                const params = {
                    Bucket: process.env.BUCKET,
                    Key: req.file.originalname,
                    Body: req.file.buffer,
                }

                // upload to S3 Bucket
                s3Bucket.upload(params, (err, data) => {
                    if (err) {
                        console.log('Error in callback')
                        res.status(500).json({ err: err })
                    }

                    // add the post to our posts table
                    db.add_post([
                        data.Location,
                        req.body.caption,
                        req.session.user.id,
                        Date.now().toString(),
                    ])
                        .then((results) => res.status(200).json(results))
                        .catch((err) => console.log(err))

                    console.log('Image has been uploaded successfully.')
                })
            } else {
                res.status(401).json('You must be logged in to do this')
            }
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    read: async (req, res) => {
        // get a post, like when a user clicks on one
    },

    update: async (req, res) => {
        // edit a post caption or comment
    },

    // fix the db key system to get this working
    // the way the foreign keys are setup prevents me from deleting a post as it's still referenced
    // as a foreign key in the users table

    // ...sounds like a next week thing to me
    delete: (req, res) => {
        const db = req.app.get('db')
        // if (req.session.user) {
        db.delete_post(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err: err }))
        // } else {
        //     res.status(500).json('You must be logged in to delete a post.')
        // }
    },
}
