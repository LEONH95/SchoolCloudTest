export interface Corporativo {
    id:                         number;
    S_NombreCorto:              string;
    S_NombreCompleto:           string;
    S_LogoURL:                  string;
    S_DBName:                   string;
    S_DBUsuario:                string;
    S_SystemUrl:                string;
    S_Activo:                   number;
    D_FechaIncorporacion:       string;
    created_at:                 string;
    updated_at:                 string;
    tw_users_id:                number;
    FK_Asignado_id:             number;
    user_created:               Usuario;
    asignado:                   Usuario;
    tw_contactos_corporativo:   Contacto;
}

export class CorporativoModel {
    id:                         number;
    S_NombreCorto:              string;
    S_NombreCompleto:           string;
    S_LogoURL:                  string;
    S_Activo:                   number;
    D_FechaIncorporacion:       string;
    FK_Asignado_id:             number;

    constructor(id, nombreCorto, nombreCompleto, img, activo, fechaIncorporacion, fkAsignado){

        this.id = id;
        this.S_NombreCorto = nombreCorto;
        this.S_NombreCompleto = nombreCompleto;
        this.S_LogoURL = img;
        this.S_Activo = activo;
        this.D_FechaIncorporacion = fechaIncorporacion;
        this.FK_Asignado_id = fkAsignado;

    }
}

export interface Contacto {
    id:                     number;
    S_Nombre:               string;
    S_Puesto:               string;
    S_Comentarios:          string;
    N_TelefonoFijo:         number;
    N_TelefonoMovil:        number;
    S_Email:                string;
    created_at:             string;
    updated_at:             string;
    tw_corporativo_id:      number;
}

interface Usuario {
    id:                 number;
    username:           string;
    email:              string;
    S_Nombre:           string;
    S_Apellidos:        string;
    S_FotoPerfilURL:    string;
    S_Activo:           number;
    verification_token: string;
    verified:           string;
    tw_role_id:         number;
    created_at:         string;
    updated_at:         string;
    deleted_at:         string;
    banned:             number;

}

export class CorporativoList {
    id:                 number;
    nombreCorto:        string;
    nombreCompleto:     string;
    foto:               string;
    url:                string;
    incorporacion:      string;
    creadoEl:           string;
    creadoPor:          string;
    asignadoA:          string;
    status:             number;
    edit:               string;
    
    constructor(corporativo: Corporativo){
        this.id            = corporativo.id;
        this.nombreCorto   = corporativo.S_NombreCorto;
        this.nombreCompleto= corporativo.S_NombreCompleto;
        this.foto          = corporativo.S_LogoURL;
        this.url           = "devschoolcloud.com/sa/#/" + corporativo.S_SystemUrl;
        this.incorporacion = corporativo.D_FechaIncorporacion;
        this.creadoEl      = corporativo.created_at;
        this.creadoPor     = corporativo.user_created.S_Nombre;
        this.asignadoA     = corporativo.asignado.S_Nombre;
        this.status        = corporativo.S_Activo;
        this.edit          = "";

    }
}
