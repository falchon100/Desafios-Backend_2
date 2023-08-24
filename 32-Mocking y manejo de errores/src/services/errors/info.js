export const generateUserErrorInfo = user =>{
    let userInfo = `uno o mas parametros no son validos
    -first_name :necesita recibir un String, recibio ${user.first_name}
    -last_name: necesita recibir un String, Recibio: ${user.last_name}
    -email: necesita recibir un String, recibio: ${user.email}`
    
    return userInfo
}