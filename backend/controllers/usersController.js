//-----------Registration-----------
const register = async (req, res) => {
  res.json({
    status: true,
    message: "Registration was successfull",
  });
};
//-----------Login------------------
//-----------Logout-----------------
//-----------Profile----------------
//-----------Check user auth status---

module.exports = {
  register,
};
