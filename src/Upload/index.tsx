import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { connect } from 'dva';
import { DeleteOutlined } from '@ant-design/icons';
import { Upload, Button, message, Spin } from 'antd';

const MyUpload = (props: any) => {
  const { dispatch, refInstance, uploadType = 'list', multiple } = props;
  const [uploadFileList, setUploadFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  let myRef: any = useRef(null);

  // 对外暴露
  useImperativeHandle(refInstance, () => ({
    setFileList: (data = []) => {
      setUploadFileList(data);
    },
    getFileList: (param = {}) => {
      return uploadFileList;
    },
  }));

  const uploadProps = {
    multiple: multiple ? multiple : false,
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined />,
    },
    maxCount: uploadType == 'singer' ? 1 : 10,
    beforeUpload: (file: any, fileList: any) => {
      if (file.size / 1024 / 1024 > 30) {
        message.error('附件大小应不超过30M!');
        return false;
      }
    },
    customRequest: (e: any) => {
      const formData = new FormData();
      formData.append('files', e.file);
      setLoading(true);
      dispatch({
        type: 'attachment/addAttachment',
        payload: formData,
        callback: (data: any) => {
          setUploadFileList([
            ...uploadFileList,
            { name: e.file.name, id: data?.[0] },
          ]);
          setLoading(false);
        },
        errCallback: () => {
          setLoading(false);
        },
      });
    },
    onRemove: (file: any) => {
      let index = uploadFileList.findIndex((item: any) => item.id === file.id);
      if (index !== -1) {
        // 移除已上传的
        dispatch({
          type: 'attachment/deleteAttachment',
          payload: { id: file.id },
          callback: () => {
            const newFileList = uploadFileList.slice();
            newFileList.splice(index, 1);
            setUploadFileList(newFileList);
          },
        });
      }
    },
    onPreview: (file: any) => {
      dispatch({
        type: 'attachment/download',
        payload: { id: file.id },
      });
    },
  };

  return (
    <Spin spinning={loading}>
      <Upload ref={myRef} fileList={uploadFileList} {...uploadProps}>
        {uploadType == 'list' ? (
          <Button type="link">上传文件</Button>
        ) : uploadType == 'singer' && uploadFileList.length == 0 ? (
          <Button type="link">上传文件</Button>
        ) : null}
      </Upload>
    </Spin>
  );
};

const MU = connect(({}: any) => {
  return {};
})(MyUpload);

export default forwardRef((props: any, ref) => (
  <MU {...props} refInstance={ref} />
));
