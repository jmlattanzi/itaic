module.exports = {
    get_user: (req, res) => {
        const db = req.app.get('db')
        console.log('get_user id:', req.params.id)
        try {
            if (req.params.id === undefined) {
                console.log('get_user error: req.params.id came in as undefined')
            } else {
                db.get_user_info(req.params.id)
                    .then((data) => res.status(200).json(data))
                    .catch((err) => console.log('error in get_user', err))
            }
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    get_account: (req, res) => {
        const db = req.app.get('db')

        db.get_account(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },

    change_bio: (req, res) => {
        try {
            const db = req.app.get('db')

            db.change_bio([req.params.id, req.body.bio])
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
        } catch (err) {
            res.satus(500).json('Internal server error')
        }
    },
}
