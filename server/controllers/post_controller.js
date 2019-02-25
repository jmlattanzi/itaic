/**
 * POST CONTROLLER
 * This controller handles all the posting methods such as pushing a post to the database.
 * I believe S3 is integrated into here but for now we will just store image urls in the ITAIC db.
 */

require('dotenv').config()
const moment = require('moment')

// MOVE AWS UPLOAD TO UTILITY FILE
const aws = require('aws-sdk')
const s3Bucket = new aws.S3({
    Bucket: process.env.BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

module.exports = {
    test: (req, res) => {
        res.json(req.session.user)
    },
    upload_post: (req, res) => {
        console.log('req.file: ', req.file)
        console.log('upload_post session', req.session.user)
        try {
            const db = req.app.get('db')

            // setup S3 params
            const params = {
                Bucket: process.env.BUCKET,
                Key: req.file.originalname,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }

            // upload to S3 Bucket
            s3Bucket.upload(params, (err, data) => {
                if (err) {
                    console.log('Error in callback', err)
                    res.status(500).json({ err: 'error in upload' })
                }

                console.log('data from s3Bucket.upload: ', data)

                // add the post to our posts table
                db.add_post([
                    req.body.user_id,
                    data.Location,
                    req.body.caption,
                    Date.now().toString(),
                ])
                    .then((results) => res.status(200).json(results))
                    .catch((err) => console.log('err in upload', err))

                console.log('Image has been uploaded successfully.')
            })
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    // get all posts
    get_all_posts: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_all_posts()
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    // getPost and getComments shouldnt have to be separate
    get_single_post: (req, res) => {
        const db = req.app.get('db')
        try {
            db.get_post(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in getPost', err))
        } catch (e) {
            res.staus(500).json('Internal server error')
        }
    },

    get_user_posts: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_user_posts(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (e) {
            res.status(500).json('Internal server error in get_user_posts')
        }
    },

    update_post: (req, res) => {
        const db = req.app.get('db')

        db.update_caption([req.params.id, req.body.caption])
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json('Error in update caption.', err))
    },

    delete_post: (req, res) => {
        const db = req.app.get('db')

        try {
            db.delete_comments(req.params.id)
                .then((data) => {
                    db.delete_post(req.params.id)
                        .then((data) => res.status(200).json(data))
                        .catch((err) => console.log('error in delete_post', err))
                })
                .catch((err) => console.log('error in delete_comments', err))
        } catch (err) {
            res.status(500).json('error in delete_post', err)
        }
    },

    like_post: (req, res) => {
        const db = req.app.get('db')

        try {
            db.like_post(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (err) {
            res.status(500).json('error in like_post', err)
        }
    },

    get_likes: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_likes(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (err) {
            res.status(500).json('error in get_likes')
        }
    },
}
