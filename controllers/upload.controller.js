const fs = require('fs');
const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipos
    const tiposValidos = ['hospitales','medicos', 'usuarios'];
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ok: false, msg:'No files were uploaded.'});
      }

      //Procesar la imagen
      const file = req.files.imagen;
      const nombreCortado = file.name.split('.');
      const extensionFile = nombreCortado[nombreCortado.length - 1];

      //Validar extension
      const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
      if( !extensionesValidas.includes(extensionFile)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension valida'
        });
      }

      //Generar nombre de archivo
      const nombreArchivo = `${ uuidv4() }.${ extensionFile }`;
      //Crear Path para guardar la imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;

      // Use the mv() method to place the file somewhere on your server - Mover la imagen
  file.mv(path, (err) => {
    if (err){
        console.log(err);
        res.status(500).json({
            ok: false, 
            msg: 'Error al mover la imagen'
        })
        
    }

    //Actualizar BD
    actualizarImagen(tipo, id, nombreArchivo);

    res.status(200).json({
        ok: true, 
        msg: 'archivo subido',
        nombreArchivo
    })
      
  });

    

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto}`);

    //Imagen por defecto
    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg );
    } else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }
    

}

module.exports = {
    fileUpload,
    retornaImagen
}