 const admincaegoryModel=require('../model/admincategory.model');

 exports.AddCategory= (request, response) => {
    admincaegoryModel.create({
        categoryName: request.body.categoryName,
        categoryImage: "https://angular-123.herokuapp.com/images/" + request.file.filename
    })
        .then(result => {
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(403).json({ message: 'Opps Something went wrong' });
        });
};


exports.CategoryList=(request, response) => {
    admincaegoryModel.find()
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            response.status(500).json({ message: 'Opps ! Something went wrong....' });
        })
};

exports.DeleteCategory=(request, response) => {
    admincaegoryModel.deleteOne({ _id: request.body.id })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: 'delete successfully' });
            else
                return response.status(204).json({ message: 'not deleted' });

        }).catch(err => {
            response.status(500).json({ message: 'Opps ! Something went wrong....' });
        })
};

exports.UpdateCategory=(request, response) => {
    admincaegoryModel.updateOne({ _id:request.body.id },
        {
            $set: {
                categoryName: request.body.categoryName,
                categoryImage: "https://angular-123.herokuapp.com/images/" + request.file.filename
            }
        }).then(result => {
            if (result.modifiedCount)
                return response.status(202).json({ message: 'update successfully' });
            else
                return response.status(204).json({ message: 'update cancel' });
        }).catch((err)=>{
            return response.status(500).json({ message: 'Opps Something went wrong..........' });
        });
};
