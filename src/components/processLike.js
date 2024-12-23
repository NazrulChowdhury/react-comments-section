export const processLike = (userId,id,parentId,comments, action) => {
    if(!parentId) {
        const updatedComments= comments.map(comment =>{
           if(comment.comId == id) {
               if(action =='like') {
                comment.likeCount++
                comment.likersId.push(userId)
               } else {
                   comment.likeCount--
                   comment.likersId = comment.likersId.filter(id => id !== userId)
               }         
            }
            return comment
        })  
        return updatedComments     
    } 
    if(parentId){
        const updatedComments = comments.map(comment => {
            if(comment.replies){
                const updatedReplies = comment.replies.map(reply =>{
                    if(reply.comId == id){
                        if(action =='like') {
                            reply.likeCount++
                            reply.likersId.push(userId)
                        } else {
                            reply.likeCount--
                            reply.likersId = reply.likersId.filter(id => id !== userId)
                        } 
                    }
                    return reply
                })
                comment.replies = updatedReplies
                return comment
            } else {
                return comment
            }
        })
        return updatedComments
    }
    
}