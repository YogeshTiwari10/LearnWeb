import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import courses from '../../components/Courses/courses.json'
import './CheckOut.scss'

const CheckOut = () => {
    const { slug } = useParams();
    const [details, setDetails] = useState([]);
    const[coupon, setCoupon] = useState(0);
    const[newcoupon, setNewcoupon] = useState(0);
    const [total, setTotal] = useState(details.price);

    useEffect(() => {
        setDetails(courses.courses[slug]);
        setTotal(details.price)
    }, [details, slug])

    const handleDiscount = (e) => {
        e.preventDefault();

        setNewcoupon(coupon)

        if(coupon ){
            setTotal(Number(details.price - Number(coupon)));
            console.log(total)
        }
// <<<<<<< HEAD
//         setTotal(Number(details.price - Number(coupon)));
//         console.log("yee"+total)
// =======
// >>>>>>> 8371968 (add payment)
    }

    const makePayment = async ()=>{

        const stripe = await loadStripe("pk_test_51N7hl3SHBE45jscNJjyppjKEql4Q4sNTM1qiN2nqlxWHYBJN5MUy0vvf0H0V3YfgiuMIqvsfeKZReSqMn74f0bmi00hL39P2ji")
    
        const header = {
            "Content-type" : "application/json"
        }
    
        const body = {
            product : details
        } 

        body.product.price = total
        // console.log("aaara data")
        const response = await fetch('http://127.0.0.1:5001/payment/create-checkout-session',{
            // const response = await fetch(`${apiURL}/create-checkout-session`,{
            method:"POST",
            headers: header,
            body:JSON.stringify(body)
        })
    
        const session = await response.json()
    
    
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <div className='checkout'>
            <div className='c-left'>
                <h2> <br /> <br /></h2>
                {/* <div class="relative overflow-x-auto"> */}
                <table class="w-fit text-l text-left rtl:text-right text-black-500 dark:text-gray-400">
                    <thead class=" text-white text-lg uppercase bg-pink-600">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                course Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Instructor
                            </th>
                            <th scope="col" class="px-6 py-3 rounded-e-lg">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody className='rounded'>
                        <tr class="bg-pink-100 text-gray-900 rounded-lg ">
                            <th scope="row" class="px-6 py-4 font-medium rounded-s-lg text-gray-900 whitespace-nowrap">
                                <img src={details.c_image} alt="" style={{ width: "200px", borderRadius: "15px" }} />
                                <div className='text-l text-gray-900 font-bold mt-4'>{details.course_name}</div>
                            </th>
                            <td class="px-6 py-4 text-l text-gray-900 font-bold">
                                {details.tutor_name}
                            </td>
                            <td class="px-6 py-4 text-l text-gray-900 font-bold">
                                ₹ {details.price}
                            </td>
                        </tr>

                    </tbody>
                </table>
                {/* </div> */}
                <div className='discount'>
                    <div className='dis-text'> Got Your Coupons? Apply Here</div>
                    <div><input type="text" placeholder='Coupon Code' value={coupon} onChange={(e)=> setCoupon(e.target.value)} className='input-field1' /> <button className='p-button1' onClick={handleDiscount}>Apply</button></div>
                </div>
            </div>
            <div className='c-right'>
                <h2> Checkout </h2>
                {/* <div class="relative overflow-x-auto"> */}
                <table class="text-l text-left rtl:text-right text-black-500 dark:text-gray-400 rounded-lg w-full">
                    {/* <thead class=" text-white text-lg uppercase bg-pink-600 rounded-lg">
                            <tr>
                                <th scope="col" class="px-6 py-3 rounded-lg">
                                    course Name
                                </th>
                            </tr>
                        </thead> */}
                    <tbody className='rounded'>
                        <tr class="bg-pink-100 text-gray-900  ">
                            <td class="px-6 py-4 text-l rounded-lg text-gray-900">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div className='w-2/3'>{details.course_name}</div>
                                    <div className='font-bold'> ₹ {details.price}</div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-pink-100 text-gray-900  ">
                            <td class="px-6 py-4 text-l rounded-lg text-gray-900">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div className='w-2/3'> Discount </div>
                                    <div className='font-bold'> ₹ {newcoupon}</div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-pink-100 text-gray-900  ">
                            <td class="px-6 py-4 text-l rounded-lg text-gray-900">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div className='w-2/3'> Total </div>
                                    <div className='font-bold'> ₹ {total}</div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <button className='w-full text-white text-lg uppercase rounded-lg buy-btn' onClick={makePayment}> Make Payment</button>
                <br /> <br /> <br />
            </div>
        </div>
    )
}

export default CheckOut