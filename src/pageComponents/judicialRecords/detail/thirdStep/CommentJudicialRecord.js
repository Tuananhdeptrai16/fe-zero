import React, { useState } from 'react';
import { Button, Spin, Typography } from 'antd';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntInput from 'src/@crema/component/AntInput';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import RenderDate from 'src/@crema/component/TableRender/RenderDate';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import useFetch from 'src/@crema/hook/fetchData/useFetch';

const CommentJudicialRecord = ({ id, requestOrganizationId }) => {
  const [newComment, setNewComment] = useState('');
  let {
    isLoading,
    data: rs,
    fetchData,
  } = useFetch(
    {
      url: API.SEARCH_COMMENT_ORGANIZATION_JUDICIAL_RECORD,
      method: 'post',
      useCache: false,
      body: {
        filters: [],
        pageable: {
          page: 1,
          page_size: 100,
        },
        id,
      },
    },
    [id],
  );
  const data = rs?.result?.items || [];

  const postCommentToServer = ({ content }) => {
    return instanceCoreApi.post(
      API.INSERT_COMMENT_ORGANIZATION_JUDICIAL_RECORD,
      {
        content: content,
        citizen_profile_request_organization_id: requestOrganizationId,
      },
    );
  };

  const { send: sendComment, loading: loadingSendComment } = useCallApi({
    callApi: postCommentToServer,
    success: () => {
      notification.success('Thêm phản hồi thành công');
      fetchData(true);
      setNewComment('');
    },
  });

  const onAddComment = async () => {
    if (!newComment) {
      return;
    }
    await sendComment({ content: newComment });
  };

  return (
    <Spin spinning={isLoading}>
      <Typography.Title level={4} className='mb-4'>
        <IntlMessages id='table.note' />
      </Typography.Title>
      <div className={'mb-4'}>
        {data.map((item, index) => {
          const lastIndex = index === data.length - 1;
          return (
            <div
              key={`comment-item-${index}`}
              className={lastIndex ? 'mb-2' : ''}>
              <Typography.Text strong>
                <RenderNameUser user={item?.user} />
              </Typography.Text>
              : <Typography.Text>{item.content}</Typography.Text>
              <Typography.Text
                className='ml-1'
                type='secondary'
                style={{ fontSize: '12px' }}>
                <RenderDate value={item.created_at} />
              </Typography.Text>
            </div>
          );
        })}
      </div>
      <div className={'mb-4'}>
        <AntInput
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          placeholder='Nhập nội dung'
        />
      </div>
      <Button
        type='link'
        className='px-0'
        loading={loadingSendComment}
        onClick={onAddComment}>
        <IntlMessages id='confirm.sendFeedback' />
      </Button>
    </Spin>
  );
};

CommentJudicialRecord.propTypes = {};

CommentJudicialRecord.defaultProps = {};

export default CommentJudicialRecord;
