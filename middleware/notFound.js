const notFound = (req,res) =>{
    res.status(400).json({msg:"No route was found"})
}

module.exports = notFound;