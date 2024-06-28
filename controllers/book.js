import Book from "../models/bookModel.js";
import asyncHandler from "../middleware/async.js";
import { error, response, success } from "../utils/response.js";
import { generateFilter, paginate } from "../helpers/paginate.js";


  export const createBook = asyncHandler(async(req, res) => {
    try {
        const { body } = req;

        let book = await Book.findOne({
            $or: [{ title: body.title}, { ISBN: body.ISBN }],
        });

        if(book) return response(res, 400, "Book already exists")
      

        if(req.user.role !== 'admin'){
            return response(res, 401, `You are authorized`)
        }

        let newBook = { ...body };

        
        book = await new Book(newBook).save();
        
        return success(res, 201, book);
    } catch (err) {
      return error(res, 500, err);
    }
  });


  export const getBooks = asyncHandler( async (req, res) => {
    try {
        const {
            query: { page, limit }
        }  = req;

        const filter = generateFilter({ ...req.query });

        const modelName = "Book";

        const options = { page, limit, filter, modelName, sort: { createdAt: -1 } };

      const books = await paginate(options);

      return success(res, 200, books);

    } catch (err) {

      return error(res, 500, err);
    }
  });

  
  export const getBook = asyncHandler(async(req, res) => {
    try {
        const { params: { id }} = req;

        const book = await Book.findById({ _id: id });

        if (!book) return response(res, 404, `Book not found` );

        return success(res, 200, book);

    } catch (err) {

      return error(res, 500, err);
    }
  });

  
  export const updateBook = asyncHandler(async(req, res) => {
    try {
        const { params: { id }, body } = req;

        let book = await Book.findById({_id: id});

        if(!book){
            return response(res, 404, `Not found`,`Book not found`)
        }

        if(req.user.role !== 'admin'){
            return response(`You are not authorized`)
        }

      book = await Book.findByIdAndUpdate({ _id: id }, 
        { $set: { ...body } }, { new: true });
      
      return success(res, 200, book );

    } catch (err) {

      return error(res, 500, err);
    }
  });

  
  export const deleteBook = asyncHandler(async(req, res) => {
    try {
        const { params: { id }, body } = req;

        let book = await Book.findById({ _id: id });

        if(!book) {
            return response(res, 404, `Book not found`)
        }

        if(req.user.role !== 'admin'){
            return response(`You are not authorized`)
        }
        
        book = await Book.findByIdAndDelete({ _id: id });
        
        return success(res, 200, book );

    } catch (err) { 
        
        return error(res, 500, err);
    }
  });


  export const checkBookAvailability = asyncHandler(async(req, res) => {
    try {
      const { params: { id } } = req; 

      const book = await Book.findById({ _id: id });
  
      if (!book) {
        return response(res, 404, `Book not found` );
      }
  
      return success(res, 200, book.availabilityStatus );
    } catch (err) {
      return error(res, 500, err );
    }
  });