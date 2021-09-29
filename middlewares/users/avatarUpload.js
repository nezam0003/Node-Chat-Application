/*********** Dependencies *********/
const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpeg, .jpg, .png formate allowed"
  );

  //   call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(400).json({
        error: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
