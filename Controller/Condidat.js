import Condidat from "../Entity/Condidat.js";

export function save(req , res)
{

    const forum = new Condidat (req.body)
    forum.save().then((forum) => res.json(forum)).catch((err) => console.log(err));
}
