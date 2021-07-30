
const Sauce =  require('../models/sauce');
const fs = require('fs');
const script =  require('../js/script');
/*Birthdate DATE  
MASKED WITH (FUNCTION = 'default()') NOT NULL*/
let arraylikes = [];
let arrayDisliked = [];
exports.createSauce = (req, res, next) => {
    const url = req.protocol+'://'+req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        imageUrl: '/../../assets/'+req.file.filename,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
        userId: req.body.sauce.userId,
        likes: 0,
        dislikes: 0,
        usersLiked:arraylikes,
        usersDisliked:arrayDisliked
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Sauce saved successfully'
            })
        }
        ).catch((error) => {
        res.status(400).json({
          message: error
        });
        }
        );
    }

exports.getOneSauce =    (req, res, next) => {
        Sauce.findOne({
            _id: req.params.id
        }).then(
            (sauces) => {
                res.status(200).json(sauces);
            }
        ).catch(
            (error) => {
                res.status(400).json(
                    {
                      message: error
                    });
            }
        );
    }

    exports.modifySauce = (req, res, next) => {
        let sauce = new Sauce({ _id: req.params._id });
        if (req.file) {
          const url = req.protocol + '://' + req.get('host');
          req.body.sauce = JSON.parse(req.body.sauce);
          sauce = {
            _id: req.params.id,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            imageUrl: '/../../assets/'+req.file.filename,
            mainPepper: req.body.sauce.mainPepper,
            heat: req.body.sauce.heat,
            userId: req.body.sauce.userId,
          };
        } else {
          sauce = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            //imageUrl: req.body.imageUrl,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            userId: req.body.userId
          };
        }
        Sauce.updateOne({_id: req.params.id}, sauce).then(
          () => {
            res.status(201).json({
              message: 'Sauce updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              message: error
            });
          }
        );
      };
    
exports.deleteSauce = (req, res, next) => {
        Sauce.findOne({_id: req.params.id}).then(
          (sauce) => {
            const filename = sauce.imageUrl.split('/../../assets/')[1];
            fs.unlink('/../../assets/'+filename, () => {
              Sauce.deleteOne({_id: req.params.id}).then(
                () => {
                  res.status(200).json({
                    message: 'Sauce Deleted!'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    message: error
                  });
                }
              );
            });
          }
        );
};

exports.getAllSauce =   (req, res, next) => {
  Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json(
                {
                  message: error
                });
        }
    );
    }
exports.likeSauce = (req, res, next) => {
  /*const usersArray = new Sauce({ _id: req.params.id});
  console.log(req.params.id)
  console.log("usersArray")
  console.log(usersArray)
  console.log("usersLikes")
  console.log(usersLikes)*/

  var userslikes = new Sauce({ _id: req.params.id});
  let sauce = new Sauce({ _id: req.params.id });
      if (req.body.like == 1){
        Sauce.findOne({
          _id: req.params.id
        }).then(
          (sauces) => {
            arraylikes = sauces.usersLiked; 
            if (script.exitsUser(arraylikes,req.body.userId) == true ){
            }else{
            arraylikes = script.checkUser(arraylikes,req.body.userId,'Add')
            sauce = {
              _id: req.params.id,
              likes: sauces.likes+1,
              usersLiked: arraylikes 
            }; 
            }
          Sauce.updateOne({_id: req.params.id}, sauce).then(
            () => {
              res.status(201).json({
                message: 'Sauce liked successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                message: 'Error'+error
              });
            }
          );
        
        }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );
    }
      if (req.body.like == 0){
        Sauce.findOne({
          _id: req.params.id
        }).then(
          (sauces) => {
            arraylikes = sauces.usersLiked;
            arrayDisliked = sauces.usersDisliked;
            if (script.exitsUser(arraylikes,req.body.userId) == true ){
              arraylikes = sauces.usersLiked;
              arraylikes = script.checkUser(arraylikes,req.body.userId,'Delete');
              sauce = {
                _id: req.params.id,
                likes: sauces.likes-1,
                usersLiked: arraylikes
              };

            }else{
              console.log("Doesn't exist");
            }
            if (script.exitsUser(arrayDisliked,req.body.userId) == true ){
            arrayDisliked = sauces.usersDisliked;
            arrayDisliked = script.checkUser(arrayDisliked,req.body.userId,'Delete');
              sauce = {
                _id: req.params.id,
                dislikes: sauces.dislikes-1,
                usersDisliked: arrayDisliked
              };
            }else{
              console.log("Doesn't  exist");
            }
            Sauce.updateOne({_id: req.params.id}, sauce).then(
                () => {
                  res.status(201).json({
                    message: 'Sauce  disliked successfully!'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    message: 'Error'+error
                  });
                }
              );
          }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );

        
      }
      if (req.body.like == -1){
        Sauce.findOne({
          _id: req.params.id
        }).then(
          (sauces) => {
        arrayDisliked = sauces.usersDisliked;
        arrayDisliked = script.checkUser(arrayDisliked,req.body.userId,'Add')
        sauce = {
          _id: req.params.id,
          dislikes: sauces.dislikes+1,
          usersDisliked: arrayDisliked
          };
          Sauce.updateOne({_id: req.params.id}, sauce).then(
            () => {
              res.status(201).json({
                message: 'Sauce disliked successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                message: 'Error'+error
              });
            }
          );
          
        }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );

    }
        
    };
  
