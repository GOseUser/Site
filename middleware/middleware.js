var ads = function (req, res ,next){
    let firstAd='buy RTX 3090 for only $90'
    if (req.data) req.data.ads =  { firstAd }
    else req.data = { ads:{ firstAd } }
    next()
}
module.exports = { addAd:ads }