import UserDao from "../DAO/UserDao.js";

const userDao = new UserDao;

 export const updateCtrl=  async (req, res) => {
    const uid = req.params.uid;
    const files = req.files;
    if (!files) {
      return res.status(400).json({ error: "No se han proporcionado archivos" });
    }
  
    let user = await userDao.getByEmail(uid);
  
    const imageInfoArray = files.map((file) => ({ //hago un nuevo array ya que pueden venir varios archivos
      name: file.originalname,
      reference: file.filename,
    }));
  
    user.documents.push(...imageInfoArray); // Agrego los nuevos archivos al arreglo de documentos
    user.save(); //actualizo la db
    res.redirect('/products')
  }

 /*  export const handlePremium = async (req, res) => {
    const uid = req.params.uid;
    let user = await userDao.getByEmail(uid);
    console.log(user.documents);
    if (user.role === 'user') {
      user.role = 'premium';
    } else {
      user.role = 'user';
    }
  
    try {
      await user.save(); // Espera a que se complete la operación de guardado
      res.redirect('/products');
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }; */

 export const handlePremium = async(req, res) => {
    //Tomo el usuario por pametro sino lo encuentra envio un usuario no encontrado
    const uid = req.params.uid;
    let user = await userDao.getByEmail(uid);
  if(!user){
    return res.status(400).json({msg:' usuario no encontrado'})
  }
    //si el usuario es usuario valido que tenga los 3 documentos
    if (user.role ==='user'){
    const identification = user.documents.some(doc=>doc.reference.includes('identification'))
    const proofOfAddress = user.documents.some(doc=>doc.reference.includes('proofOfAddress'))
    const accountStatus = user.documents.some(doc=>doc.reference.includes('accountStatus'))
    //si los tiene procede a cambiar a premium y envio mensaje de success
    if(identification&&proofOfAddress&&accountStatus){
      user.role='premium'
    await  user.save()
      res.status(200).render('profile',({user: JSON.parse(JSON.stringify(user)),statusSuccess:'Felicidades ahora es Premium'}))
    }else{
      //si falta alguno de los documentos envio mensaje de failled
      res.status(400).render('profile',({user: JSON.parse(JSON.stringify(user)),statusFailled:'Debe cargar Identificación, Comprobante de domicilio y Comprobante de estado de cuenta para actualizar a premium'}))
    }

  }else{
    //si el usuario ya es premium y clickea nuevamente envio failled que ya es premium
    res.status(400).render('profile',{user: JSON.parse(JSON.stringify(user)),statusFailled:'Usted ya es premium!'});
  }
   }

