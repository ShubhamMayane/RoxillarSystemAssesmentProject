const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, //ithe image chi url aapan database madhe store karto
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        require:true
    },
    dateOfSale: {
        type: Date
    }
});


//logic to define that above structure is for document of employees collection. 
const productsModel = mongoose.model('products', ProductSchema);


/*he model export katayache khalil pramane so aaplyala controllers chya js file madhe
he model import karun ya employee colllection var crud operation perform karayache asatat.
*/

module.exports = productsModel;
