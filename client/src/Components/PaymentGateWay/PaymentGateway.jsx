import './PaymentGateway.css'
import { useNavigate } from 'react-router-dom'

const PaymentGateway = () => {

  const navigate = useNavigate()
  const backToProduct = () => {
    navigate('/user/products')
    alert("Payment was Successful")
  }

  return (
    <div className='payment'>
        <img src={"/assets/images/account-details.pics.png"} alt="payment card" onClick={backToProduct}/>
    </div>
)}

export default PaymentGateway
