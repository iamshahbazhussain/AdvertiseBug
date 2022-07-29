const { query } = require('express');
const Post = require('../models/post');
const POSTS = require('../models/post');
const Day = require('../models/day');

const fs = require('fs');
const { promisify } = require("util")
const pipeline = promisify(require("stream").pipeline)


const getAllPostTitle = async (req, res, next) => {
    console.log("in get all post title")
    let today = new Date(Date.now()).toLocaleDateString("en-US")
    let today_posts = await Day.find({ date: today })
    let titles = []
    console.log(today_posts[0].posts)
    today_posts[0].posts.forEach(el => {
        titles.push(el.title)

    });
    console.log(titles);
    res.send({ status: 200, data: titles });
};

const searchPost = async (req, res, next) => {
    console.clear();
    const query = req.query?.query || '';
    if (query !== '') {
        const search_query = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { company: { $regex: query, $options: 'i' } },
                { link: { $regex: query, $options: 'i' } }
            ]
        }
        try {
            const response = await POSTS.find(search_query);
            let result = [];
            const forLoop = async _ => {
                for (let index = 0; index < response.length; index++) {
                    const post = response[index];
                    result.push({
                        ...post,
                        border: 'blue'
                    });
                }
            }
            await forLoop();
            return res.status(200).json({ output: result });
        } catch (error) {
            console.log(error);
            return res.status(403).json({ output: error.message });
        }
    } else {
        return res.status(200).json({ output: [] });
    }
}


const addPost = async (req, res) => {
    console.log("----", req.body);
    console.log("----**************8", req.file);
    let errrorMessage = "";
    console.log('add post');
    if (req.body.title === undefined || req.body.title === null || req.body.title === "") {
        errrorMessage = "Missing address for  package!!!";
        res.send({ errrorMessage });
    } else {
        try {
            let parsedPages = JSON.parse(req.body.pages)
            let parsedendTime = JSON.parse(req.body.endTime)
            let parsedstartTime = JSON.parse(req.body.startTime)
            let parsedisTopPage = JSON.parse(req.body.isTopPage)

            const fileName = "img" + Math.floor(Math.random() * 1000) + req.file.originalName;
            console.log(fileName)
            await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../uploads/${fileName}`))

            let post = new Post({
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
                subject: req.body.subject,
                subSubject: req.body.subsubject,
                startTime: parsedstartTime,
                endTime: parsedendTime,
                isTopPage: parsedisTopPage,
                pages: parsedPages,
                company: req.body.company,
                image: {
                    fileName: "b1.jpg",
                    filePath: `uploads\\${fileName}`,
                    fileSize: "159.72 KB",
                    fileType: "image/jpeg",
                }
            })
            console.log("is top is %s", parsedstartTime)
            let isTop = parsedisTopPage
            let pages = parsedPages
            let topHome = 0
            let topSub = 0
            let topSubsub = 0
            for (let i = 0; i < isTop.length; i++) {
                if (isTop[i] == true) {
                    if (pages[i] == "Home") {
                        topHome += 1
                    } else if (pages[i] == req.body.subject) {
                        topSub += 1
                    } else if (pages[i] == req.body.subsubject) {
                        topSubsub += 1
                    }
                }
            }
            console.log("starting to add post")
            let start = parsedstartTime
            console.log(start)
            let days_dates = []
            for (let i = 0; i < start.length; i++) {
                console.log(new Date(start[i]).toLocaleDateString("en-US"))
                days_dates.push(new Date(start[i]).toLocaleDateString("en-US"))
            }
            days_dates = [...new Set(days_dates)]
            console.log(days_dates.length)
            for (let i = 0; i < days_dates.length; i++) {
                //if no day exists create new day if already exist edit existing day
                console.log("before get all the posts equal to day:")
                let posts = await Day.find({ date: days_dates[i] });
                console.log("get all the posts equal to day:")
                console.log(posts)
                if (posts.length != 0) {
                    console.log("has posts")
                    await Day.updateOne(
                        { date: days_dates[i] },
                        { $push: { posts: post }, $inc: { topHome: topHome, topSub: topSub, topSubsub: topSubsub } })
                        .exec();
                    console.log("after update")

                } else {
                    console.log("doesnt have posts")
                    let day = new Day({
                        posts: [post],
                        date: days_dates[i],
                        topHome: topHome,
                        topSub: topSub,
                        topSubsub: topSubsub,
                    })
                    await day.save()
                }
            }
            console.log("after for")
            await post.save();
            res.send({ post })
        } catch (err) {
            errrorMessage = "Error creating a package: " + err;
            console.log(errrorMessage)
            res.send({ errrorMessage });
        }
    }

};


const listAllAds = async (req, res, next) => {
    console.log('request post list')
    try {
        let posts = await Post.find({});
        posts = posts.map(post =>
            (post));
        console.log(posts)
        res.send({ posts });


    } catch (err) {
        let error = "Error" + err;
        res.send({ error });
    }
};


const getPagePosts = async (req, res, next) => {
    console.log('request page posts')
    try {
        console.log(req.query.page)
        let top_posts = [];
        let non_top_posts = []
        console.log("lala")
        if (req.query.page != undefined) {
            let current = req.query.page

            console.log(Date.now())
            let today = new Date(Date.now()).toLocaleDateString("en-US")
            console.log(today)
            let t_post = await Day.find({ date: today })
            console.log("----- TPOST ------- ", t_post);
            t_post = t_post[0]
            console.log("-----AFTER TPOST ------- ", t_post);
            for (let i = 0; i < t_post.posts.length; i++) {
                console.log(t_post.posts[i].pages)
                console.log(current)
                if (t_post.posts[i].pages.includes(current)) {
                    console.log(current)
                    let indx = t_post.posts[i].pages.indexOf(current)
                    if (t_post.posts[i].isTopPage[indx]) {
                        top_posts.push({ ...t_post.posts[i]._doc, border: "black" })
                    } else {
                        non_top_posts.push({ ...t_post.posts[i], border: "blue" })
                    }

                }
            }
            //     console.log("in")
            //     let top_posts=[];
            //     let non_top_posts=[]
            //     let posts=await Post.find({pages:{$elemMatch:{$eq: req.query.page}}});
            //     let indexes= await Post.aggregate([{$project:{index:{$indexOfArray:["$pages",req.query.page ]}}}])
            //     let i=0;
            //     console.log(non_top_posts)
            //     indexes.forEach(el=>{
            //         if (el.index!=null && !(el.index<0) ){//&& posts[i].startTime>Date.now() && posts[i].endTime<Date.now()){
            //             if (posts[i].isTopPage[el.index] ){

            //                 top_posts.push({...posts[i]._doc,border:"black"})
            //             }else{
            //                 non_top_posts.push({...posts[i]._doc,border:"blue"})
            //             }
            //             i+=1;
            //         }   
            //     })
            //only 6
            // if(top_posts.length<6){

            //     let j=top_posts.length
            //     for (j; j<6; j++){
            //         console.log(j)
            //         top_posts.push({
            //             title: 'AdWithUs',
            //             description: 'This spot is open.\n click on "Adevrtise with us" button on the top of the page to add you ad',
            //             link: 'https://OUR_SITE.com',
            //             elevation: 24,

            //         })
            //     }
            // }
            let result = [...top_posts, ...non_top_posts]
            // console.log("result is:")
            // for (const post of result) {
            //     console.log(post.imgOrVideoId)
            //     if (post.imgOrVideoId != undefined) {
            //         const files = await SingleFile.find({ id: post.imgOrVideoId.toString() });
            //         console.log(files)
            //         post.image = files[0];
            //         console.log(files)

            //     } else {
            //         post.image = { filePath: "https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg" }
            //     }
            // }
            // console.log(top_posts)
            res.send({ posts: result });
        }


    } catch (err) {
        let error = "Error" + err;
        console.log(error);
    }
};

//fast way of doing it not best way!
const more_than_capacity = async (req, res, next) => {
    //req=start_time,end_time,
    //subject
    let posts = await Post.find({ pages: { $elemMatch: { $eq: req.query.page } } });
}

const getTopRated = async (req, res, next) => {
    console.log('request post list')
    if (req.query.data.length > 0) {
        try {
            req.query.data.array.forEach(async (element) => {
                let top10 = 10
                let topRated = []
                let posts = await Post.find({});
                ratings = posts.map(el => el.likes);
                posts = posts.map(el => el._id);
                while (top10 > 0) {
                    let rate = posts.max(...ratings)
                    let postRate = await Post.find({ _id: posts.indexOf(rate) });
                    posts.splice(ratings.indexOf(rate), 1)
                    ratings.splice(ratings.indexOf(rate), 1)
                    topRated.push(postRate)
                }
                allTopRatings.push({ element: topRated })
            });

            res.send({ posts: allTopRatings });

        }
        catch (err) {
            let error = "Error" + err;
            res.send({ error });
        }
    }
};


const getTopPage = async (req, res, next) => {
    try {
        if (req.query.subject != undefined) {
            let posts = await Post.find({ isTopPage: true, subject: req.query.subject });
            console.log(posts);
            res.send({ posts });
        }

    } catch (err) {
        let error = "Error" + err;
        res.send({ error });
    }

};
// router.post('/deletePost', async (req, res) => {
//     try {
//         if(req.query.subject!=undefined){
//             let posts=await Post.find({isTopPage:true, subject:req.query.subject});
//             res.send({posts});
//         }+

//     } catch (err) { 
//         let error="Error"+err;
//         res.send({error});
//     }

// });
// router.post('/editPost', async (req, res) => {
//     try {
//         if(req.query.subject!=undefined){
//             let posts=await Post.find({isTopPage:true, subject:req.query.subject});
//             res.send({posts});
//         }

//     } catch (err) { 
//         let error="Error"+err;
//         res.send({error});
//     }

// });

const getAmountTopPage = async (req, res, next) => {
    try {

        console.log(req.query.date)
        let cur_date = req.query.date;
        if (req.query.date != undefined) {
            let _date = new Date(parseInt(cur_date)).toLocaleDateString("en-US");
            let day = await Day.find({ date: _date });
            console.log(day[0].topHome)
            res.send({ topHome: day[0].topHome, topSub: day[0].topSub, topSubsub: day[0].topSubsub });
        }

    } catch (err) {
        let error = "Error" + err;
        res.send({ error });
    }

};

module.exports = {
    addPost,
    getAmountTopPage,
    getTopPage,
    getTopRated,
    listAllAds,
    getPagePosts,
    getAllPostTitle,
    searchPost
}