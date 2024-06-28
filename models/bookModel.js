import mongoose, { Schema }  from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import paginator from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const UniqueObjectId = new Schema({
    _id: {
        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    }
})

const bookSchema = new Schema ({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    availabilityStatus: {type: String,
      enum: ['available', 'checked out', 'reserved'],
      default: 'available',
    },
    ISBN: { type: String, required: true, unique: true },
},
{
    timestamps: true,
  }
);



bookSchema.plugin(paginator);
bookSchema.plugin(mongooseAggregatePaginate);

bookSchema.add(UniqueObjectId)

const Book = mongoose.model("Book", bookSchema);

export default Book;




