const Car = require('../models/Car')

class CarsController {

    constructor(dao){
        this.dao = dao;
    }

    index = async (req, res) => {

        const cars = await this.dao.find();
        return res.status(201).json(cars)
    }

    create = async (req, res) => {
        const car = await this.dao.create(req.body);

        return res.status(201).json({ return: true, data: car._id })
    }

    update = async (req, res) => {
        try{
            const { id } = req.params;
            const { name, url } = req.body;

            const car = await this.dao.updateOne({_id: id}, {
                name: name,
                url: url
            });
            
            return res.status(201).json({ return: true })
        }catch(err){
            return res.status(400).json({ return: false, message: err })
        }
    }
}

module.exports = new CarsController(Car);