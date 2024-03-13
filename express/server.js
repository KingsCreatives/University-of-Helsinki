const express = require('express')
const app = express()


const PORT = 2121

const friends = [
    {
        id: 0,
        name : "Kofi Mole"
    },
    {
        id : 1, 
        name : "Kwame Mintah"
    }
]

app.get('/', (req, res) => {
    res.send("Hello, reviewing my express basics")
})

app.get('/messages' , (req, res) => {
    res.send("Loading messages .....")
})

app.get('/friends' , (req, res) => {
    res.json(friends)
})

app.get('/friends/:id' , (req, res) => {
    const friendId = Number(req.params.id)
    const friend = friends[friendId]
    
    if(friend){
        res.status(200).json(friend)
    }else{
     res.status(404).json({
       error: "friend does not exist",
     });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}, you better catch it!`)
})


