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
        console.log('user session: ', req.session.user)
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

    update_comment: (req, res) => {
        // const db = req.app.get('db')
    },

    delete_comment: (req, res) => {
        try {
            const db = req.app.get('db')

            db.delete_comment(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log(err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },
}
