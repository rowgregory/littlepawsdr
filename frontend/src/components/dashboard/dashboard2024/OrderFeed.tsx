import { Flex, Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';
import { RootState } from '../../../redux/toolkitStore';


// function formatDate(inputDate: any) {
//   const date = new Date(inputDate);
//   const options = { month: 'long', day: 'numeric', year: 'numeric' } as const;
//   const formattedDate = date.toLocaleDateString('en-US', options);
//   return formattedDate;
// }

// const getStatusCircle = (item: any) => {
//   const digital = !item?.requiresShipping;
//   const needsToBeShipped = item?.requiresShipping && !item?.isShipped;
//   return (
//     <Flex
//       alignItems='center'
//       justifyContent='center'
//       width='100%'
//       marginLeft='auto'
//       marginRight='auto'
//       maxWidth='72px'
//     >
//       <Flex justifyContent='start' alignItems='center'>
//         <Status
//           lineargradient={
//             digital
//               ? 'linear-gradient(90deg, rgba(203,177,255,1) 0%, rgba(177,139,255,1) 100%)'
//               : needsToBeShipped
//               ? 'linear-gradient(132deg, rgba(255, 165, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)'
//               : 'linear-gradient(90deg, rgba(105,211,71,1) 0%, rgba(53,135,27,1) 100%)'
//           }
//         />
//         <Text fontFamily='Rust' color='#bfbfbf'>
//           {digital ? 'Digital' : needsToBeShipped ? 'Needs Shipping' : 'Shipped'}
//         </Text>
//       </Flex>
//     </Flex>
//   );
// };

const OrderFeed = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const dashboardDetails = dashboard?.currentYearData;
  const loading = dashboard?.loading;

  return (
    <div className='w-100 h-100'>
      <Flex flexDirection='column' padding='24px 18px'>
        <Text fontFamily='Rust' fontSize='17px'>
          Order Feed
        </Text>
        <Text fontFamily='Rust' fontSize='12px' color='gray'>
          Instant updates on recent orders
        </Text>
      </Flex>
      {loading ? (
        <Flex height='calc(100% - 92px)' flex='0' alignItems='center'>
          <JumpingRumpLoader color='#ceb6ff' />
        </Flex>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Date Order</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {dashboardDetails?.tenMostRecentOrders?.map((item: any, i: number) => (
              <></>
              // <Row key={i} i={i}>
              //   <td>{item?.name}</td>
              //   <td>{item?.email}</td>
              //   <td>{formatDate(item?.createdAt)}</td>
              //   <td> {getStatusCircle(item)}</td>
              //   <td>
              //     <Link to={`/admin/order/${item?._id}`}>
              //       <GreenViewBinoculars className='fa-solid fa-binoculars'></GreenViewBinoculars>
              //     </Link>
              //   </td>
              // </Row>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderFeed;
