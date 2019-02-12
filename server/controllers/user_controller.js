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
}
