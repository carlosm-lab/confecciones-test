// ──────────────────────────────────────────────────────────────
// ZONAS DE ENVÍO — Confecciones Liss / El Salvador
// ──────────────────────────────────────────────────────────────
// Lógica de cálculo de costos de envío por zona geográfica.
// El precio exacto depende del departamento; el municipio se
// muestra solo para dar "sensación de control" al usuario.
//
// Zonas:
//   LOCAL  → San Miguel (gratis en taller / $1 punto medio)
//   ORIENTAL → Usulután, La Unión, Morazán ($1–3)
//   NACIONAL → Resto del país ($3–5)
// ──────────────────────────────────────────────────────────────

export type ShippingZone = "LOCAL" | "ORIENTAL" | "NACIONAL";

export interface ShippingInfo {
  department: string;
  municipality: string;
  zone: ShippingZone;
  /** Costo estimado en USD (valor medio de la zona) */
  cost: number;
  /** Rango mostrado al usuario, ej: "$1 – $3" */
  label: string;
  /** Descripción del método de entrega */
  method: string;
}

// ── Definición de departamentos ───────────────────────────────

export interface Department {
  name: string;
  zone: ShippingZone;
  municipalities: string[];
}

/** Costo representativo por zona (para el total estimado) */
export const SHIPPING_ZONE_COST: Record<ShippingZone, number> = {
  LOCAL: 0,
  ORIENTAL: 2,
  NACIONAL: 4,
};

export const SHIPPING_ZONE_LABEL: Record<ShippingZone, string> = {
  LOCAL: "Gratis (entrega en San Miguel)",
  ORIENTAL: "$1 – $3 (Zona Oriental)",
  NACIONAL: "$3 – $5 (Envío nacional)",
};

export const SHIPPING_ZONE_METHOD: Record<ShippingZone, string> = {
  LOCAL: "Recogida en el taller o punto de entrega acordado en San Miguel",
  ORIENTAL: "Envío por agencia o transporte de confianza a la Zona Oriental",
  NACIONAL: "Envío nacional por empresa de paquetería (pago al recibir)",
};

export const DEPARTMENTS: Department[] = [
  {
    name: "San Miguel",
    zone: "LOCAL",
    municipalities: [
      "San Miguel",
      "Moncagua",
      "San Jorge",
      "Nueva Guadalupe",
      "Ciudad Barrios",
      "Sesori",
      "Chinameca",
      "El Tránsito",
      "Uluazapa",
      "Comacarán",
      "Lolotique",
      "San Luis de la Reina",
      "San Gerardo",
      "Quelepa",
      "Chirilagua",
      "San Rafael Oriente",
      "San Antonio",
      "Carolina",
      "Nuevo Edén de San Juan",
    ],
  },
  {
    name: "Usulután",
    zone: "ORIENTAL",
    municipalities: [
      "Usulután",
      "Santiago de María",
      "Jiquilisco",
      "Berlín",
      "Alegría",
      "Jucuapa",
      "Puerto El Triunfo",
      "Mercedes Umaña",
      "Santa Elena",
      "San Agustín",
      "Nueva Granada",
      "El Triunfo",
      "California",
      "Ereguayquín",
      "Estanzuelas",
      "Ozatlán",
      "Concepción Batres",
      "Tecapán",
      "Jucuarán",
      "San Buenaventura",
      "San Francisco Javier",
    ],
  },
  {
    name: "La Unión",
    zone: "ORIENTAL",
    municipalities: [
      "La Unión",
      "Santa Rosa de Lima",
      "El Carmen",
      "Pasaquina",
      "Anamorós",
      "Conchagua",
      "Intipucá",
      "San Alejo",
      "Bolívar",
      "El Sauce",
      "Lislique",
      "Nueva Esparta",
      "Polorós",
      "San José",
      "Yayantique",
      "Yucuaiquín",
      "Meanguera del Golfo",
    ],
  },
  {
    name: "Morazán",
    zone: "ORIENTAL",
    municipalities: [
      "San Francisco Gotera",
      "Jocoro",
      "Osicala",
      "Cacaopera",
      "Sensembra",
      "Jocoaitique",
      "Perquín",
      "Meanguera",
      "Sociedad",
      "Torola",
      "San Simón",
      "El Divisadero",
      "Corinto",
      "Arambala",
      "Chilanga",
      "Guatajiagua",
      "Gualococti",
      "Joateca",
      "Lolotiquillo",
      "San Carlos",
      "San Fernando",
      "San Isidro",
      "Yamabal",
      "Yoloaiquín",
      "Delicias de Concepción",
    ],
  },
  {
    name: "San Salvador",
    zone: "NACIONAL",
    municipalities: [
      "San Salvador",
      "Soyapango",
      "Mejicanos",
      "Apopa",
      "Ilopango",
      "San Marcos",
      "Cuscatancingo",
      "San Martín",
      "Tonacatepeque",
      "Aguilares",
      "Guazapa",
      "Nejapa",
      "Panchimalco",
      "Rosario de Mora",
      "Santiago Texacuangos",
      "Santo Tomás",
      "El Paisnal",
      "Ayutuxtepeque",
    ],
  },
  {
    name: "La Libertad",
    zone: "NACIONAL",
    municipalities: [
      "Santa Tecla",
      "Antiguo Cuscatlán",
      "Nuevo Cuscatlán",
      "Colón",
      "La Libertad",
      "Quezaltepeque",
      "San José Villanueva",
      "Opico",
      "Zaragoza",
      "Jayaque",
      "Jicalapa",
      "Tamanique",
      "Comasagua",
      "Sacacoyo",
      "San Matías",
      "Talnique",
      "Teotepeque",
      "Tepecoyo",
    ],
  },
  {
    name: "Santa Ana",
    zone: "NACIONAL",
    municipalities: [
      "Santa Ana",
      "Chalchuapa",
      "Metapán",
      "Coatepeque",
      "El Congo",
      "Candelaria de la Frontera",
      "Texistepeque",
      "Santiago de la Frontera",
      "Masahuat",
      "El Porvenir",
      "San Sebastián Salitrillo",
      "Santa Rosa Guachipilín",
      "San Antonio Pajonal",
    ],
  },
  {
    name: "Sonsonate",
    zone: "NACIONAL",
    municipalities: [
      "Sonsonate",
      "Acajutla",
      "Izalco",
      "Juayúa",
      "Nahuizalco",
      "Armenia",
      "Caluco",
      "Cuisnahuat",
      "Nahulingo",
      "Salcoatitán",
      "San Antonio del Monte",
      "San Julián",
      "Santa Catarina Masahuat",
      "Santa Isabel Ishuatán",
      "Santo Domingo de Guzmán",
      "Sonzacate",
    ],
  },
  {
    name: "La Paz",
    zone: "NACIONAL",
    municipalities: [
      "Zacatecoluca",
      "Olocuilta",
      "San Luis La Herradura",
      "San Luis Talpa",
      "San Juan Nonualco",
      "Santiago Nonualco",
      "Cuyultitán",
      "El Rosario",
      "Jerusalén",
      "Mercedes La Ceiba",
      "Paraíso de Osorio",
      "San Antonio Masahuat",
      "San emigdio",
      "San Francisco Chinameca",
      "San Juan Tepezontes",
      "San Miguel Tepezontes",
      "San Pedro Masahuat",
      "San Pedro Nonualco",
      "Santa María Ostuma",
      "Tapalhuaca",
    ],
  },
  {
    name: "Chalatenango",
    zone: "NACIONAL",
    municipalities: [
      "Chalatenango",
      "La Palma",
      "San Ignacio",
      "Agua Caliente",
      "Arcatao",
      "Azacualpa",
      "Citalá",
      "Comalapa",
      "Concepción Quezaltepeque",
      "Dulce Nombre de María",
      "El Carrizal",
      "El Paraíso",
      "La Laguna",
      "La Reina",
      "Las Vueltas",
      "Nombre de Jesús",
      "Nueva Concepción",
      "Nueva Trinidad",
      "Ojos de Agua",
      "Potonico",
      "San Antonio Los Ranchos",
      "San Fernando",
      "San Francisco Lempa",
      "San Francisco Morazán",
      "San Isidro Labrador",
      "San Luis del Carmen",
      "San Miguel de Mercedes",
      "San Rafael",
      "Santa Rita",
      "Tejutla",
    ],
  },
  {
    name: "Cuscatlán",
    zone: "NACIONAL",
    municipalities: [
      "Cojutepeque",
      "Suchitoto",
      "San Pedro Perulapán",
      "El Carmen",
      "Monte San Juan",
      "Oratorio de Concepción",
      "San Bartolomé Perulapía",
      "San Cristóbal",
      "San José Guayabal",
      "San Ramón",
      "Santa Cruz Analquito",
      "Santa Cruz Michapa",
      "Suchitoto",
      "Tejutepeque",
    ],
  },
  {
    name: "Cabañas",
    zone: "NACIONAL",
    municipalities: [
      "Sensuntepeque",
      "Ilobasco",
      "San Isidro",
      "Cinquera",
      "Dolores",
      "Guacotecti",
      "Jutiapa",
      "San José Las Flores",
      "Tejutepeque",
      "Victoria",
    ],
  },
  {
    name: "San Vicente",
    zone: "NACIONAL",
    municipalities: [
      "San Vicente",
      "Apastepeque",
      "Guadalupe",
      "San Cayetano Istepeque",
      "San Esteban Catarina",
      "San Ildefonso",
      "San Lorenzo",
      "San Sebastián",
      "Santa Clara",
      "Santo Domingo",
      "Tecoluca",
      "Tepetitán",
      "Verapaz",
    ],
  },
  {
    name: "Ahuachapán",
    zone: "NACIONAL",
    municipalities: [
      "Ahuachapán",
      "Atiquizaya",
      "Concepción de Ataco",
      "Apaneca",
      "El Refugio",
      "Guaymango",
      "Jujutla",
      "San Francisco Menéndez",
      "San Lorenzo",
      "San Pedro Puxtla",
      "Tacuba",
      "Turín",
    ],
  },
];

/**
 * Obtiene la información de envío dado un departamento y municipio.
 */
export function getShippingInfo(
  department: string,
  municipality: string
): ShippingInfo {
  const dept = DEPARTMENTS.find((d) => d.name === department);
  const zone: ShippingZone = dept?.zone ?? "NACIONAL";

  return {
    department,
    municipality,
    zone,
    cost: SHIPPING_ZONE_COST[zone],
    label: SHIPPING_ZONE_LABEL[zone],
    method: SHIPPING_ZONE_METHOD[zone],
  };
}
