export const productAdapter = (product) => {
    return {
      id: product.id,
      title: product.title,
      images: product.images,
      price: product.price,
      description: product.description,
      category: product.category,
      discountPercentage: product.discountPercentage,
      brand: product.brand,
      thumbnail: product.thumbnail
    };
  };