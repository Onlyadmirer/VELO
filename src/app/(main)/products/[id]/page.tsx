import ProductDetails from "./components/ProductDetails";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ProductDetails slug={id} />;
}

export default page;
