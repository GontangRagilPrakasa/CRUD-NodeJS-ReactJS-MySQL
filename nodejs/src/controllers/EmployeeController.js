const controllers = {}

//import model dan sequelize
var Employee = require('../model/Employee');
var Role = require('../model/Role');
var sequelize = require('../model/database');

sequelize.sync();

//edit data
controllers.get = async (req, res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
    where: { id: id},
    include: [ Role ]
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  })
  res.json({success:true, data:data});
}

controllers.update = async (req,res) => {
    //paramter id
    const {id} = req.params;
    const {name, email, address, phone, role} = req.body;
    //update data
    const data = await Employee.update({
      name:name,
      email:email,
      address:address,
      phone:phone,
      roleId: role
    },{
      where: {id:id}
    }).then( function(data){
      return data;
    }).catch(error => {
      return error;
    })
    res.json({
      success:true,
      message: "Data anda telah terupdate",
      data:data
    })
}

controllers.delete = async (req,res) => {
  //paramter post
  const {id} = req.body;
  //delete sequalize
  const del = await Employee.destroy({
    where: {id:id}
    
  })
  res.json({
    success:true,
    deleted:del,
    message:"Data telah terhapus"
  })
}


controllers.list = async (req,res) => {
    const data = await Employee.findAll({
        include: [ Role ]
    }).then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({
        success: true,
        data : data
    });
};

controllers.create = async (req,res) => {
    // data
    const { name, email, address, phone, role } = req.body;
    // create
    const data = await Employee.create({
      name: name,
      email: email,
      address: address,
      phone: phone,
      roleId: role
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      console.log("Gagal menambahkan"+error)
      return error;
    })
    // return res
    res.status(200).json({
      success: true,
      message:"Data ditambahkan",
      data: data
    });
  }

  
// controllers.testdata= async (req,res)=>{
    
//     const response = await sequelize.sync().then(function(){
      
//      //membuat role
//     Role.create({
//         role: 'Admin'
//     });
//     //create Employee
//     Employee.create({
//         name: 'Ganteng',
//         email: 'gontangprakasa04@gmail,com',
//         address: 'yogyakarta',
//         phone: 089608489982,
//         roleId: 1
//     });
        
//         const data = Employee.findAll();
//         return data;
//     })
//     .catch(err => {
//     return err;
//   });
//     res.json({
//         success: true,
//         data: response
//     });
// };

controllers.test = (req,res) =>{
    const data = {
        name: "Gontang Ragil Prakasa",
        age: 22,
        city: "Yogyakarta"
    };
    console.log("Execute from controller emplyee");
    res.json(data);
    
};

module.exports = controllers;
