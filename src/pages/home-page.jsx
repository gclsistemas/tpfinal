import { useEffect, useState } from "react";
import { getProducts, getProductsSearch } from "./products/services/product-service";
import { productAdapter } from "./products/adapter/index";
import { ProductCard } from "./products/components/index";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, setFavorite } from "../redux/slices/user-slice";

// useDebounce
// https://codesandbox.io/p/sandbox/rr40wnropq?file=%2Fsrc%2Findex.js

const HomePage = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector((state) => state.user.userLogged);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState("");
    const [searchDebounce, setSearchDebounce] = useDebounce(search, 300);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts();
                const productList = res.data.products.map(itm => productAdapter(itm));
                // console.log('HomePage - fetchData', productList);
                setProducts(productList);
                // setProducts(res.data.products);
                setLoading(false);
            } catch (error) {
                console.log('HomePage - fetchData - Error', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductsSearch(searchDebounce);
                const productList = res.data.products.map(itm => productAdapter(itm));
                // console.log('HomePage - fetchData', productList);
                setProducts(productList);
                // setProducts(res.data.products);
                setLoading(false);
            } catch (error) {
                console.log('HomePage - fetchData - Error', error);
            }
        };

        setLoading(true);
        fetchData();
    }, [searchDebounce]);

    const handleFavorite = (item, add) => {
        if (add) {
            // setFavoritesProducts(prevStat => [...prevStat, item]);
            dispatch(setFavorite(item));
        } else {
            // const lst = favoritesProducts.filter(curr => curr.id !== item.id);
            // setFavoritesProducts(lst);
            dispatch(removeFavorite(item.id));
        }
    }

    // const isFavorite = (id) => {
    //     return favoritesProducts.find(curr=> curr.id === id) ? true : false;
    // };

    // const isProductFavorite = (id) => {
    //     // if (!userLogged) {
    //     //     return false;
    //     // }
    //     return dispatch(isFavorite(id));
    // };

    // console.log('HomePage - products', products);
    // if (!loading) console.log('HomePage - products', products);

    return (
        <div className="container  mx-auto">
            {/* <section className="bg-red-700 text-white"> */}
            <section>
                <div className="bg-red-700 md:h-full max-md:flex-grow grid place-items-center mt-3">
                    {/* <p className="font-semibold text-5xl">Home Products App</p> */}
                    {/* <input type="text" id="search" name="search" value={search} onChange={(evt) => setSearch(evt.currentTarget.value)} /> */}
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={search} onChange={(evt) => setSearch(evt.currentTarget.value)}/>
                </div>

                <div className="md:h-full grid grid-cols-4 gap-4 p-2 mt-6">
                    {/* <p className="font-semibold text-5xl">Product 1</p>
                    <p className="font-semibold text-5xl">Product 2</p>
                    <p className="font-semibold text-5xl">Product 3</p>
                    <p className="font-semibold text-5xl">Product 4</p> */}
                    {loading
                        ? <></>
                        : products && products.map(curr => <ProductCard key={curr.id} item={curr} favorite={!userLogged?false:(userFavoriteProducts.find(cf => cf.id === curr.id)?true:false)} handleFavorite={handleFavorite} user={userLogged} />)
                        // : products && products.map(curr => console.log(curr))
                    }
                </div>
            </section>
        </div>
    );
};

export default HomePage;