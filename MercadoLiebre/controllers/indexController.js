const fs = require('fs');

const controller = {
    login : function(req,res){
        res.render('login');
    },
    register : function(req,res){
        res.render('register');
    },
    postLogin: function(req,res){

        let archivoUsuario= fs.readFileSync(__dirname + "/../data/usuarios.json", 'utf-8'); //leo el archivo usuarios
        
        let usuarios= JSON.parse(archivoUsuario); // descomprimo la lista, 
       
        let usuarioALoguearse;
        for(let i=0; i < usuarios.length; i++){
            if (usuarios[i].email == req.body.email && usuarios[i].password == req.body.password){               
                usuarioALoguearse =usuarios[i]; //encontró al  usuario
                break;                
            }
        }            

        if (usuarioALoguearse != undefined){// si encuentra al usuario
            res.send('¡Hola, '+usuarioALoguearse.nombre+"!");
            
        }else{
            res.send('credenciales invalidos');
        }
    },
    postRegister:function(req,res){
        let usuario = { //como usamos post no vamos a usar query sino body
            nombre: req.body.nombre, 
            nombre: req.body.usuario,             
            email: req.body.email,
            domicilio: req.body.domicilio,
            password: req.body.password
            //password: bcrypt.hashSync(req.body.password, 10), //para encriptar el password 
        };
        
        //leemos el archivo  
        let archivoUsuario= fs.readFileSync('./data/usuarios.json', 'utf-8');
        
        let usuarios;      
        if(archivoUsuario==""){ //si el archivo esta vacio creo un array para guardar los usuarios
            usuarios=[];
        } else{
            usuarios= JSON.parse(archivoUsuario); // descomprimo la lista
        }

        let existe= false;
        for(var i=0; i < usuarios.length; i++){
            if( usuarios[i].email == usuario.email){
                existe= true;
                break;
            }           
        }

        if (!existe){ //si el usuario no existe en la base de datos
            usuarios.push(usuario);
        //lo volvemos a convertir a formato string 
        usuariosJSON= JSON.stringify(usuarios);

         // guardo la info  
        fs.writeFileSync(__dirname + "/../data/usuarios.json", usuariosJSON);

        res.send('succes');
        }else{
            res.send('El registro no se pudo completar porque el email ingresado ya se encuentra registrado')
        }        
    }

}

module.exports = controller;


