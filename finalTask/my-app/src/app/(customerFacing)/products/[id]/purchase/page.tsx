import { ProductCard } from '@/components/ProductCard';
import db from '@/db/db';
import { Product } from '@prisma/client';
import PurchaseClientComponent from './PurchaseClientComponent';

type Props = {
  params: { id: string };
};

export default async function PurchasePage({ params }: Props) {
  const { id } = params;

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return <PurchaseClientComponent product={product} />;
}
