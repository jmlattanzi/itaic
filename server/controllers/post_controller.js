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
    create: async (req, res) => {
        console.log(req.file)

        const params = {
            Bucket: process.env.BUCKET,
            Key: req.file.originalname,
            Body: req.file.buffer,
        }

        try {
            const db = req.app.get('db')

            // confirm that a user is logged in
            if (req.session.user) {
                // upload to S3 Bucket
                s3Bucket.upload(params, (err, data) => {
                    if (err) {
                        console.log('error in callback')
                        res.status(500).json({ err: err })
                    }

                    console.log('success')
                    res.status(200).json(data.Location)
                })
            } else {
                res.status(409).json('you must be logged in to do this')
            }
        } catch (e) {
            res.status(500).json('internal server error')
        }
    },

    read: async (req, res) => {
        // get a post, like when a user clicks on one
    },

    update: async (req, res) => {
        // edit a post caption or comment
    },

    delete: async (req, res) => {
        // delete a post
    },
}
