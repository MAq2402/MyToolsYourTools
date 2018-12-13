import {Offer} from '../models/offer';
import { OfferStatus } from '../enums/OfferStatus';


export const OFFERS: Offer[] = [
    {name: 'Łopata', groupId: 1, category: 'kopiąceXD',
     description: 'to urządzenie kopie dziury', ownerId: 1, status: OfferStatus.active,
     imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'},
    {name: 'Kosiarka', groupId: 2, category: 'koszące',
    description: 'to urządzenie kosi', ownerId: 1, status: OfferStatus.active,
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png'  },
    {name: 'Piła mechaniczna', groupId: 1, category: 'piłujące',
    description: 'to urządzenie piłuje', ownerId: 2, status: OfferStatus.borrowed,
    imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'}
  ];
