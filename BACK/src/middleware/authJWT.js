const jwt = require("jsonwebtoken");
const { ForbiddenError, UnauthorizedError } = require("../ERRORS/CustomError");

function verifyToken(req, res, next) {
  const authHeader = req.headers.auth;

  console.log("Accesstoken present: ", authHeader?.length, req.url);
  if (!authHeader) {
    return next(
      new UnauthorizedError("No estás autorizado. No existe token de acceso.")
    );
  }
  const token = authHeader;
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(
        new ForbiddenError("El token de acceso no es válido, o está vencido.")
      );
    }
    /*-----Esta el mail tmb pero no lo uso, agregar dsp roles /ADMIN*/
    console.log(user);
    req.user = { ...user };
    next();
  });
}

/*-------------------------------VERIFICACION DE TOKEN EN CASO
                            DE OLVIDARSE EL PASSWORD Y Q MANDAMOS EL 
                            SECRETLINK----------------------------------------------------------------*/
function verifyEmailLink(req, res, next) {
  const { secretToken } = req.params;
  if (!secretToken) {
    return next(new UnauthorizedError("No estás autorizado."));
  }
  jwt.verify(secretToken, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(
        new ForbiddenError(
          "El link no es válido o expiró. Requerí nuevamente un mail de cambio de contraseña."
        )
      );
    }
    req.userChangingPwd = { _id: user._id, forgotPwdToken: secretToken };
    next();
  });
}
module.exports = { verifyEmailLink, verifyToken };
