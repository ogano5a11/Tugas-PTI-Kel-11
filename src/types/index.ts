export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  partner: {
    id: string;
    name: string;
    address: string;
  };
  details?: {
    verificationStatus: string;
    paymentType: string;
    workingHours: string[];
    serviceArea: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
