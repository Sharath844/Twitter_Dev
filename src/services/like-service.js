import Tweet from '../models/tweet.js';
import { TweetRepository, LikeRepository, CommentRepository} from '../repository/index.js';

class LikeService {
     constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
     }

     async toggleLike(modelId, modelType, userId) {
        if(modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId);
        } else if(modelType == 'Comment') {
            //var likeable = await this.commentRepository.get(modelId);
        } else{
           throw new Error('Unknown model type');
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        //console.log("exists",exists);
        if(exists) {
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.deleteOne();
            var isAdded = false;

        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
           // console.log("New like",newLike);
            likeable.likes.push(newLike);
            await likeable.save()

            var isAdded = true;
        }

        return isAdded;
     }
     
}
export default LikeService;