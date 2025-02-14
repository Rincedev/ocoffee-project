export default function isAdmin(req, res, next) {
  console.log(req.session)
  if (req.session.cookie.isAdmin === true) {
    return next();
  } else {
    return res.status(403).send('Accès refusé');
  }
}
