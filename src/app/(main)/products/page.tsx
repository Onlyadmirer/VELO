import ProductsItem from "./components/ProductsItem";

function ProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produk</h1>
        <p className="text-muted-foreground mt-1">
          Temukan koleksi pakaian terbaru kami
        </p>
      </div>
      <ProductsItem />
    </div>
  );
}

export default ProductsPage;
