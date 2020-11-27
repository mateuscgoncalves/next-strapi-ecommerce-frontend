import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import products from '../products.json'
import {fromImgToUrl} from "../utils/urls";
import {twoDecimals} from "../utils/formats";

export default function Home() {

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            {
                products.map(product => (
                    //Respects the BEM methodology: block-name__element-name ( but not using - because its javascript)
                    <div key={product.name} className={styles.product}>
                        <Link href={`/products/${product.slug}`}>
                            <a>
                                <div className={styles.product__rows}>
                                    <div className={styles.product__colimg}>
                                        <img src={fromImgToUrl(product.image)} alt=""/>
                                    </div>
                                    <div className={styles.product__col}>
                                        {product.name} ${twoDecimals(product.price)}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
