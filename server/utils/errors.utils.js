module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Pseudo incorrect ou déjà pris";
  }
  if (err.message.includes("email")) {
    errors.email = "Email incorrect ou déjà pris";
  }
  if (err.message.includes("password")) {
    errors.password = "le mot de passe doit faire plus de 6 caractères";
  }

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "le fichier dépasse 500ko";
  else errors.other = err.message;

  return errors;
};
