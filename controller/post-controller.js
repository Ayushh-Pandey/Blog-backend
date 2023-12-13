
const Post = require("../model/post");


const createPost = async (request, response) => {
    try {
        const post = (request.body);
 
        if(!post){
            console.log(post);
            return response.send('some error while saving')
        }
        const title = post.title;
        const titleFound = await Post.find({title:title})
        if(titleFound.length>0){
            console.log(titleFound)
            return response.status(400).json({msg:'Please choose a different title'});
        }

        const newPost = await new Post(post);
        newPost.save();
        response.status(200).json('Post saved successfully');
    } catch (error) {

        response.status(500).json(error);
    }
}

const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(!post)
            return response.status(404).json({ msg: 'Post not found' });

        await post.deleteOne();

        response.status(200).json({msg:'post deleted successfully'});
    } catch (error) {
        response.status(500).json(error)
    }
}

const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    
    let posts;
    try {
        if(username) {
            posts = await Post.find({ username: username });
        }
            
        else if (category) {
            posts = await Post.find({ categories: category });
        }
            
        else 
            posts = await Post.find({});
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = {getAllPosts,getPost,deletePost,createPost,updatePost};