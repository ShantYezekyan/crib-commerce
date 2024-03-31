export type Listing = {
  id: number;
  title: string;
  city: string;
  address: string;
  zip: string;
  price: number;
  rooms: number;
  bathrooms?: number;
  livingSqFt?: number;
  otherDetails?: string;
  imgUrl?: string;
  authorId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};
