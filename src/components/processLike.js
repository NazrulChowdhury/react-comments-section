export const processLike = (id,parentId,comments) => {
    if(!parentId) {
        const updatedComments= comments.map(comment =>{
           if(comment.comId == id) {
               comment.likeCount++ 
            }
            return comment
        })  
        return updatedComments     
    } else {
        const updatedComments = comments.map(comment => {
            const {replies} = comment
            if(replies){
                const updatedReplies = replies.map(reply =>{
                    if(reply.comId == id){
                        reply.likeCount++
                    }
                    return reply
                })
                return updatedReplies
            }
        })
        return updatedComments
    }
}