const db = require('../db')
const bcrypt = require('bcrypt')


class Users {
    static async addUser ({username, password, email}) {
        const hashedPassword = await bcrypt.hash(password, 12)
        let result = await db.query(`INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING username, email`, 
        [username, hashedPassword, email])
        const user = result.rows
        return user
    }

    static async userLogin (username, password) {
        let result = await db.query(`SELECT username, password FROM users WHERE username = $1`, [username]
        )
        let user = result.rows[0]
        if(user) {
            let value = await bcrypt.compare(password, user.password)
                if(value) {
                    return user
                }
        }
    }
    
}

module.exports = Users
