
// const comment = require('../model/comment');
const Comment = require('../model/comment');


const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

const getComments = async (request, response) => {
    try {
        let id = request.query.postId;
        const comments = await Comment.find({ postId: id });
        // console.log(comments)
        // if(!comments)
        //     return response.status(200).json('No comments yet')
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.deleteOne();

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = {deleteComment,getComments,newComment};