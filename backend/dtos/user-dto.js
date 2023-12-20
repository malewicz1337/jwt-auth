class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    // this.name = model.name;
    // this.surname = model.surname;
    // this.avatar = model.avatar;
    // this.phone = model.phone;
    // this.address = model.address;
    // this.city = model.city;
    // this.country = model.country;
    // this.zip = model.zip;
    // this.role = model.role;
    // this.createdAt = model.createdAt;
    // this.updatedAt = model.updatedAt;
    // this.deletedAt = model.deletedAt;
    // this.lastLogin = model.lastLogin;
    // this.lastLogout = model.lastLogout;
    // this.lastLoginIp = model.lastLoginIp;
    // this.lastLogoutIp = model.lastLogoutIp;
    // this.lastLoginDevice = model.lastLoginDevice;
    // this.lastLogoutDevice = model.lastLogoutDevice;
    // this.lastLoginBrowser = model.lastLoginBrowser;
  }
}

export default UserDto;
