const adminproductModel=require('../model/adminproduct.model');

exports.addProduct= (request, response) => {
    adminproductModel.create({
        name: request.body.name,
        price: request.body.price,
        productImage: "http://localhost:3000/images/" + request.file.filename,
        description: request.body.description,
        quantity: request.body.quantity,
        day: request.body.day,
        catId: request.body.catId
    }).then(result => {
        return response.status(201).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.productList = (request, response) => {
    adminproductModel.find(request.body)
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.deleteProduct = (request,response)=>{
    adminproductModel.deleteOne({ _id: request.body.id })
    .then(result => {
        console.log(result);
        if (result.deletedCount)
            return response.status(202).json({ message: 'delete successfully' });
        else
            return response.status(204).json({ message: 'not deleted' });

    }).catch(err => {
        response.status(500).json({ message: 'Opps ! Something went wrong....' });
    })
};


exports.updateProduct=(request, response) => {
    adminproductModel.updateOne({ _id:request.body.id },
        {
            $set: {
                name: request.body.name,
                price:request.body.price,
                productImage: "http://localhost:3000/images/" + request.file.filename,
                description:request.body.description,
                quantity:request.body.quantity,
                day:request.body.day
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
