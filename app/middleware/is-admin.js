export default function isAdmin(req, res, next) {
  console.log(req.session.user)
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next();
  } else {
    return res.status(403).send('Accès refusé');
  }
}
