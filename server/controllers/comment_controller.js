module.exports = {
    get_comments: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_comments(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(`error in getComments`, err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    add_comment: (req, res) => {
        const db = req.app.get('db')

        try {
            if (req.session.user) {
                db.add_comment([
                    req.body.post_id,
                    req.body.user_id,
                    req.body.comment,
                ])
                    .then((data) => res.status(200).json(data))
                    .catch((err) => console.log(err))
            } else {
                res.status(409).json('You must be logged in to add a comment')
            }
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    update_comment: (req, res) => {
        // const db = req.app.get('db')
    },

    delete_comment: (req, res) => {
        const db = req.app.get('db')

        if (req.session.user) {
            db.delete_comments(req.params.id)
                .then((data) => {
                    db.delete_post(req.params.id)
                        .then((data) => console.log(data))
                        .catch((err) =>
                            console.log('error in delete_post', err)
                        )
                    res.status(200).json(data)
                })
                .catch((err) => console.log('error in delete_comments', err))
        } else {
            res.status(500).json('You must be logged in to delete a post.')
        }
    },
}
