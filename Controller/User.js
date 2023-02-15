const  User = require ('../Entity/User.js')
const bcrypt = require ('bcryptjs')
module.exports = function Register (req,res){
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    } else {
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    }
});
}
module.exports = function Login(req , res){
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
               res.status(200).json(user)
            }
             else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
}