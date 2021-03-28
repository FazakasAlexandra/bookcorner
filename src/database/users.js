export default class UsersDatabase {
    constructor() {
        this.baseUrl = 'http://afazakas.com/bookcorner/users'
    }

    signIn({email, password}) {
        return fetch(`${this.baseUrl}/${email}/${password}`)
            .then(response => response.json())
    }

    signUp(user) {
        return fetch(this.baseUrl, {
            method: "POST",
            hadeaders: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }

    getUser(id) {
        return fetch(`${this.baseUrl}/id/${id}`)
            .then(res => res.json())
    }

    postUser(user) {
        return fetch(this.baseUrl, {
            method: "POST",
            hadeaders: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then(res => res.json())
    }
}