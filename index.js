const express = require('express')
const app = express()
const cors = require ('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())


// MongoDB connection URI and Database
const uri = 'mongodb://localhost:27017/basic'; // Replace with your MongoDB URI
const dbName = 'basic'; // Database name
const collectionName = 'profiles'; // Collection name

// Connect to MongoDB
let db;
mongoose.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB...'); 
    })
    .catch(error => console.error(error));

    const profileSchema = new mongoose.Schema({
        id: { type: String, required: true },
        name: { type: String, required: true },
        desc: { type: String, required: true },
        link: { type: String, required: true }
    });
       
    const Profile = mongoose.model('Profile', profileSchema);
//user apne api acess karta hai / 
 

    // const profiles = [
    //     {
    //         id:"1",
    //         name:"mohammad",
    //         desc: "i am developer.",
    //         link: "insta-mohammad"
    //     },

    //     {
    //         id:"2",
    //         name:"saad",
    //         desc: "i am bca student.",
    //         link: "insta-saad  "
    //     },
    //     {
    //         id:"3",
    //         name:"basheer",
    //         desc: "i am gamer",
    //         link: "insta-basheer"
    //     }
    // ]    

    const data = [
        {
            "id": "1",
            "name": "mohammad",
             "adress": {
                "city":"mumbra",
                "state":"maha"
             },
             "images": [ 
                "img1",
                "img2"
             ],
             "imagesWithkey": [
                {
                    "path":"/images/",
                    "name":"img1"
                },
                {
                    "path":"/images/",
                    "name":"img2"
                },
             ]
        },

        {
            "id": "2",
            "name": "saad",
             "adress": {
                "city":"kalwa",
                "state":"maha"
             },
             "images": [
                "img3",
                "img4"
             ],
             "imagesWithkey": [
                {
                    "path":"/images/",
                    "name":"img4"
                },
                {
                    "path":"/images/",
                    "name":"img3"
                },
             ]
        },

        {
            "id": "3",
            "name": "basheer",
             "adress": {
                "city":"mumbra",
                "state":"maha"
             },
             "images": [
                "img1",
                "img2"
             ],
             "imagesWithkey": [
                {
                    "path":"/images/",
                    "name":"img1"
                },
                {
                    "path":"/images/",
                    "name":"img2"
                },
             ]
        },
    ]

    app.get('/',(req,res)=>{
        res.send("test 1")
    })
   
    app.get('/home',(req,res)=>{
        const result = data.filter ((item)=>{
            const naam = item.imagesWithkey.findIndex((obj)=>{
                return obj.name == "img2"
            })
            if(naam == -1){
                return false;
            }else {
                return true;
            }
        }) 
        res.send(result)
    })

    //get all profile
    app.get('/profiles', async(req,res)=>{
        const profiles = await Profile.find();
        console.log(profiles)
        res.send(profiles).json(profiles.lenght !== 0 ? profiles : [])
    })

// params dynamic cheezo ke data ko store kar ke rakh ta hai

//get single profile 
app.get('/profile/:id', async (req,res)=>{
    const newId = req.params.id;
     const profile = await Profile.findOne({ id : newId })
    // const profile = profiles.find((profile)=>{
    //     return profile.id == id
    // }) 
    res.send(profile??'not found');
})
//create new profile
app.post('/profileCreate/', async(req,res)=>{
    const profile = req.body;
    //create a new profile and save it to mongodb
    const newProfile = new Profile(profile);
    await newProfile.save ()
    const Profiles = await Profile.find ();
    // profiles.push(profile);
    res.status(200).json (profiles);
})

//update new profile 
app.put('/profileUpdate/',async (req,res)=>{
    const profile = req.body;
    const result = await Profile.updateOne(
        {id : profile.id}, //
        {$set: profile} //
    );
    if (result.matchedCount === 0)
        res.status(404).json('not found');
    const profiles = await Profile.find();
    res.status(202).json(profiles);


    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == newprofile.id
    // }) 
    // if(profileIndex == -1){
    //     res.status(404).json("Not found..");
    // }
    // profiles[profileIndex] = newProfile;
    // res.status(200).json (profiles);
});

//delete the old profile delete
app.delete('/profileDelete/:id', async(req,res)=>{
    const id = req.params.id;
 const profile = await Profile.findOneAndDelete({id: id});

    // const profileIndex =  profiles.findIndex ((item)=>{
    //     return item.id == id
    // })
    if(!profile){
        res.status(404).json ('Not found..');
    }
    const profiles = await Profile.find();  
    // profiles.splice(profileIndex,1)
    res.status(200).json(profiles);
})

app.listen('8000',()=>{
    console.log('server is running on port 8000...')
})



//http methods

//get-> get values 

//post-> to save/create data

//put/patch-> to update data

//delete -> delete data 
    
// koi bhi chiz ko rukne ke liye await likh te hai 

//async uska syntex hai

// ye dono monogdb ke liye kaam karta hai

// framework jo kaam bohot baar repeat hone wala hai to frameowrk usey assan karta hai or usme  

// e.preventdefault a tag ke andar ke chizo ko rukana hai to use karta hai e.preventdefault
// e ka full form event event function ka naam hai 

//put and patch different 

//put : jitna bhi bhi right me hai usko left me kardega 
// patch : jitna chiz hai usko hi upadate kar renga 

//wrapper : ek baar use kar sakta hu \
//mixin : kitne baar bhi use karsakte hai 

//schema : schema bata ta hai ke kitne database me kitne value jaane wale hai

// absolute : hawa me udta hai  
//relative : hawa me nhi udta hai ek hi jage pe rehta hai 



 



