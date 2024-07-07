const express = require("express")
const jwt = require("jsonwebtoken")
const { token } = require("morgan")

const router = express.Router()

const mockUser = {
	username: "authguy",
	password: "mypassword",
	profile: {
		firstName: "Chris",
		lastName: "Wolstenholme",
		age: 43,
	},
}

router.post("/login", (req, res) => {
	console.log('R-B',req.body)
	const { username, password } = req.body
	console.log(username);

	if (
		username === mockUser.username &&
		password === mockUser.password
	) {
		const payload = {
			username: mockUser.username,
			name: mockUser.profile.firstName,
		}
		const token = jwt.sign(payload, process.env.JWT_SECRET)
		console.log( token )
		res.status(200).json({ token })
	} else {
		res
			.status(401)
			.json({
				error: "Incorect username or password. Please try again",
			})
	}
})

router.get("/profile", (req, res) => {
    console.log('REQ',req.headers)
	const token = req.headers.authorization
	try {
		jwt.verify(token, process.env.JWT_SECRET)
		res.status(201).json({ user: mockUser.profile })
	} catch (e) {
		res.status(401).json({ error: "Sorry, Login failed" })
	}
})

module.exports = router
