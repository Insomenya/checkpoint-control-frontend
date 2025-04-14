import { ExpeditionTypes } from "@/models/expeditions";

export const getTypeName = (type: ExpeditionTypes) =>{
    switch (type) {
        case 'auto':
            return 'Авто';
        case 'selfout':
            return 'Самовынос';
        case 'selfauto':
            return 'Самовывоз';
        default: '-';
    }
};
