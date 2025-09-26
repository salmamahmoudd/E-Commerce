export interface Ipassword extends IForgotpassword {
    newPassword:string
}
export interface IForgotpassword {
    email:string,
}
export interface IResetpassword {
    resetCode:string,
}
