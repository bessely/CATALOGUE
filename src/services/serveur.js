import { packageJSON } from "./globalFunction";

const SERVEUR = {
      "HOSTNAME"           : window.location.hostname, // HOST NAME WEB
      "SYNAPSE"            : "160.155.220.179", //<- SERVEUR IP WOLD WILD WEB
      "SYNAPSE_LOCAL"      : "192.168.1.150",   //<- SERVEUR IP LOCAL WEB
      "SYNAPSE_VIRTUAL"    : "192.168.1.195",   //<- SERVEUR IP LOCAL WEB
      "MEDIO"              : "DESKTOP-UEDFLUD", //<- medio PC dans le réseau SYNAPSE
      "AXEL"               : "DESKTOP-7864OJN", //<- Axel PC PERSO  dans le réseau SYNAPSE
      "AXEL_PRO"           : "DESKTOP-1166FQ2", //<- Axel PC PRO  dans le réseau SYNAPSE
      "CAMARA_PC"          : "Ahmed-Camara",    //<- CAMARA PC  dans le réseau SYNAPSE
      "JUNIOR_PC"          : "JUNIORPCDEV", //<- JUNIOR PC  dans le réseau SYNAPSE
      "PORT"               : "8291",
      "PROTOCOL"           : window.location.protocol+"//" // http: || https:
};
var  BASEURL  =`${SERVEUR.PROTOCOL}${SERVEUR.SYNAPSE}:${SERVEUR.PORT}/synapse`;
var  BASEROOT =packageJSON.homepage; // le chemin vers le htdoc : le nom du dossier dans htdoc
var  LOGO_URL =`${SERVEUR.PROTOCOL}${SERVEUR.SYNAPSE}:83/SERVEUR_IMG/logo/getlogo/`;
if (process.env.NODE_ENV==="development") {
      BASEURL  = `${SERVEUR.PROTOCOL}${SERVEUR.SYNAPSE}:${SERVEUR.PORT}/synapse`;
      BASEROOT =packageJSON.homepage; // le chemin vers le htdoc : le nom du dossier dans htdoc
}

export { BASEROOT, BASEURL, LOGO_URL, SERVEUR };

