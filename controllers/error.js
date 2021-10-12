exports.get404 = (req,res,next)=>{
    console.log(' Page not Found');
    res.status(404).render('404',{
        docTitle: "Error" , 
        path:"404",  
        isLoggedIn: req.session.isLoggedIn,
    })};