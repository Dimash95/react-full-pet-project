export type DetailProductType = {
  id: number;
  images?: string[];
  title?: string;
  description?: string;
  category?: { id?: number; name?: string };
  price?: number;
};
