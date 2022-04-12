declare module 'myTypes' {
    type UserType = {
        uid: string,
        email: string,
      };
      interface UserProps {
        user: UserType,
      }
  }
  
  module.exports = {
    UserType,
    UserProps,
  };