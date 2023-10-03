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

  export const handlePremium = async (req, res) => {
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
  };

  