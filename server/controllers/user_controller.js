module.exports = {
    getPosts: (req, res) => {
        const db = req.app.get('db')
        console.log(req.params)

        try {
            db.get_user_posts(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in getPosts', err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },

    get_user: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_user_info(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in getOP', err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },
}
