import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../redux/services/orderApi';
import ContactLoader from '../../components/Loaders/ContactLoader/ContactLoader';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toFixed from '../../utils/toFixed';
import cartItemType from '../../utils/shop-utils/cartItemType';
import { decryptFormData, resetCart, setStep } from '../../redux/features/cart/cartSlice';

interface FieldsType {
  name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zipPostalCode?: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orderLoader, setOrderLoader] = useState(false);
  const { cartItemsAmount, subtotal, totalPrice, shippingPrice, cartItems, step, fields } =
    useSelector((state: RootState) => state.cart);
  const { isProduct, isWelcomeWiener, isEcard } = cartItemType(cartItems);
  const hasRun = useRef(false);
  const fieldsRef = useRef<FieldsType | null>(null);

  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!hasRun.current) {
      dispatch(decryptFormData());
      dispatch(setStep({ step1: true, step2: true, step3: true }));
      hasRun.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [step.step3],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(totalPrice)),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader(true);
      return actions.order.capture().then(async (details: any) => {
        const shippingAddress = {
          address: fieldsRef.current?.address,
          city: fieldsRef.current?.city,
          state: fieldsRef.current?.state,
          zipPostalCode: fieldsRef.current?.zipPostalCode,
        };

        await createOrder({
          name: fieldsRef.current?.name,
          orderItems: cartItems,
          subtotal,
          totalPrice,
          paypalOrderId: details.id,
          email: fieldsRef.current?.email,
          ...(isProduct && { shippingAddress }),
          ...(isProduct && { shippingPrice }),
          totalItems: cartItemsAmount,
          isProduct,
          isWelcomeWiener,
          isEcard,
          requiresShipping: isProduct,
          status: isProduct ? 'Pending Fulfillment' : 'Digital Order',
        })
          .unwrap()
          .then((data: any) => {
            dispatch(resetCart());
            navigate(`/order/${data?.order?.orderId}`);
            setOrderLoader(false);
          })
          .catch((err: any) => {
            setOrderLoader(false);
          });
      });
    },
    onError: (err: any) => {
      console.error('ON ERROR: ', err);
    },
  } as any;
  return (
    <Fragment>
      {orderLoader && <ContactLoader text='Your donation is greatly appreciated' />}
      <div className='max-w-sm mx-auto'>
        <PayPalButtons
          style={payPalComponents.style}
          forceReRender={payPalComponents.forceRerender}
          createOrder={payPalComponents.createOrder}
          onApprove={payPalComponents.onApprove}
        />
      </div>
    </Fragment>
  );
};

export default Payment;
