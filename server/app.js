require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userDb = require("./model/userSchema")
require("./db/dbCon"); // mongoDB connection


const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET_KEY
const googelCallbackUrl = process.env.GOOGLE_CALLBACK_URL


app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"MY SECRET KEY",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: googleId,
        clientSecret: googleSecret,
        callbackURL: googelCallbackUrl,
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userDb.findOne({googleId: profile.id});

            if(!user){
                user = new userDb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/dashboard",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login", user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:5173");
    })
})

app.listen(PORT,()=>{
    console.log(`server start at port No. ${PORT}`)
})