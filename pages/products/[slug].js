import Head from 'next/head'
import {API_URL, fromImgToUrl} from "../../utils/urls";
import {twoDecimals} from "../../utils/formats";
import BuyButton from "../../components/BuyButton";


const Product = ({product}) => {
    return(
        <div>
            <Head>
                {product.meta_title &&
                    <title>{product.meta_title}</title>
                }
                {product.meta_description &&
                <meta name={'description'} content={product.description}/>
                }
            </Head>
            <h3>{product.name}</h3>
            <img src={fromImgToUrl(product.image)} alt=""/>
            <p>${twoDecimals(product.price)} <BuyButton product={product}/></p>
            <p>{product.content}</p>
        </div>
    )
}

export async function getStaticProps({params: { slug }}){
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
    const found = await product_res.json();

    return{
        props: {
            product: found[0] //Because api response for querys is an array
        }
    }
}

export async function getStaticPaths(){
    //Retrieve all the possible paths
    const products_res = await fetch(`${API_URL}/products/`);
    const products = await products_res.json();

    //Return then to NextJS context
    return {
        paths: products.map(product => ({
            params: {slug: String(product.slug)}
        })),
        fallback: false //Show 404 if the params it's not match
    }

}

export default Product;