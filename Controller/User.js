import bcrypt from 'bcryptjs'
import User from '../Entity/User.js'
import jwt from 'jsonwebtoken'

const secret_key = "boom";
export function Register (req,res){
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    } else {
        const newUser = new User({
            username: req.body.username,
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
export function Login(req , res){
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({   message: "Email is not Registered Please SignUp",
                status: res.statusCode,
                token: ''});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const userDetail= {
                    username : user.username,
                    id : user._id
                }
                const token = jwt.sign(userDetail,secret_key, {
                    expiresIn: "60s",
                });
               res.status(200).json({
                   message: "Logged In successfully",
                   status: res.statusCode,
                   token
               })
            }
             else {
                return res
                    .status(400)
                    .json({ message: "Invalid Crendential given",
                        status: res.statusCode,
                        token: ''});
            }
        });
    });
}
