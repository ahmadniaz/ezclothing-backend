module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0946bdc552d3bce84baddc6bda0c8df6'),
  },
});
