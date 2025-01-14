const express = require('express')
const app = express()
const cors = require ('cors')

app.use(cors())
app.use(express.json())
//user apne api acess karta hai / 
 

    const profiles = [
        {
            id:"1",
            name:"mohammad",
            desc: "i am developer.",
            link: "insta-mohammad"
        },

        {
            id:"2",
            name:"saad",
            desc: "i am bca student.",
            link: "insta-saad  "
        },
        {
            id:"3",
            name:"basheer",
            desc: "i am gamer",
            link: "insta-basheer"
        }
    ]   

    app.get('/',(req,res)=>{
        res.send("test 1")
    })
   
    //get all profile
    app.get('/profiles',(req,res)=>{
        res.send(profiles)
    })

// params dynamic cheezo ke data ko store kar ke rakh ta hai

//get single profile 
app.get('/profile/:id',(req,res)=>{
    const id =
     req.params.id;
    const profile = profiles.find((profile)=>{
        return profile.id == id
    }) 
    res.send(profile??'not found');
})
//create new profile
app.post('/profileCreate/',(req,res)=>{
    const profile = req.body;
    profiles.push(profile);
    res.status(200).json (profiles);
})

//update new profile 
app.put('/profileUpdate/',(req,res)=>{
    const profile = req.body;
    const updateProfile = profiles.find((item)=>{
        return item.id == profile.id
    }) 
    res.status(200).json (updateProfile??"not found")
});




app.listen('8000',()=>{
    console.log('server is running on port 8000...')
})

//http methods

//get-> get values 

//post-> to save/create data

//put/patch-> to update data

//delete -> delete data 
    