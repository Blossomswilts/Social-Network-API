import { Schema, model } from 'mongoose';

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // use ReplySchema to validate data for a reply
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

//create a ReactionSchema which is used as reaction field's sub-document schema in ThoughtSchema
const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought's _id field
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        // set a timestamp on creation
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
export default Thought;

