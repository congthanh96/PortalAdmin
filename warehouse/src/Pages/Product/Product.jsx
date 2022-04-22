import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { productAPI } from '../../APIs';
export default function Product() {
    let { productID } = useParams();
    useEffect( async() => {
      getDetailProduct()
       
    }, [])
    const getDetailProduct = async () => {
        try {
            const res  = await productAPI.getDetailProduct(productID)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {productID}
        </>
    )
}