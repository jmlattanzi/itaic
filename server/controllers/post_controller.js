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

            // make sure there is a user logged in
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
                        req.session.user.id,
                        data.Location,
                        req.body.caption,
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

    // get all posts
    read: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_posts(req.query.n)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    // getPost and getComments shouldnt have to be separate
    getPost: (req, res) => {
        const db = req.app.get('db')
        try {
            db.get_post(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in getPost', err))
        } catch (e) {
            res.staus(500).json('Internal server error')
        }
    },

    getComments: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_comments(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in getComments', err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    addComment: (req, res) => {
        const db = req.app.get('db')

        try {
            db.add_comment([
                req.body.post_id,
                req.body.user_id,
                req.body.comment,
            ])
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    update: async (req, res) => {
        // edit a post caption or comment
    },

    // ...sounds like a next week thing to me
    delete: (req, res) => {
        const db = req.app.get('db')
        if (req.session.user) {
            db.delete_post(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json({ err: err }))
        } else {
            res.status(500).json('You must be logged in to delete a post.')
        }
    },
}
