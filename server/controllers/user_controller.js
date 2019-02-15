module.exports = {
    get_user: (req, res) => {
        const db = req.app.get('db')

        try {
            db.get_user_info(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => console.log('error in get_user', err))
        } catch (e) {
            res.status(500).json('Internal server error')
        }
    },
}
