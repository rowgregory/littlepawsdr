import { memo } from 'react';
import { StyledEditBtn, TableRow } from '../../styles/admin/Styles';
import { OnlineCircle } from '../../svg/circle';
import { Text } from '../../styles/Styles';
import { formatDateTime } from '../../../utils/formatDateTime';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MemoizedTableRow = memo(
  ({ user, userInfo, handleShow, setId, id }: any) => {
    const state = useSelector((state: any) => state);
    const userDeleteLoading = state.userDelete.loading;
    return (
      <TableRow key={user?._id}>
        <td>
          <OnlineCircle online={user.online} />
        </td>
        <td>
          <Text>{user?.name}</Text>
        </td>
        <td>
          <Text>
            <a href={`mailto: ${user?.email}`}>{user.email}</a>
          </Text>
        </td>
        <td>
          <Text>{formatDateTime(user?.createdAt)}</Text>
        </td>
        <td>
          {user?.isAdmin ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
        </td>
        <td>
          {user?.email !== userInfo?.email && (
            <Link to={`/admin/user/${user?._id}/edit`}>
              <StyledEditBtn>
                <i style={{ color: '#9761aa' }} className='fas fa-edit'></i>
              </StyledEditBtn>
            </Link>
          )}
        </td>
        <td>
          {user?.email !== userInfo?.email && (
            <StyledEditBtn
              className='border-0'
              onClick={() => {
                setId(user?._id);
                handleShow();
              }}
            >
              {userDeleteLoading && id === user?._id ? (
                <Spinner size='sm' animation='border' />
              ) : (
                <i style={{ color: '#cc0000' }} className='fas fa-trash'></i>
              )}
            </StyledEditBtn>
          )}
        </td>
      </TableRow>
    );
  }
);

export default MemoizedTableRow;
