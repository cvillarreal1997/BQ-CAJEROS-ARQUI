export class User{
    constructor(        
        public id: string = "",
        public tipoIdentificacion: string = "",
        public identificacion: string = "",
        public fullName: string = "",
        public provincia: string = "",
        public canton: string = "",
        public parroquia: string = "",
        public direccion: string = "",
        public telefono: string = "",
        public email: string = "",
        public fechaNacimiento: string = "",
        public estadoCivil: string = "",
        public estadoBancaWeb: string = "",
        public estado: string = ""       
    ){}
}