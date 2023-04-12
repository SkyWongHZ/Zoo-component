import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Image, Upload, Spin, Popover } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import Utils from '@/utils/utils';
import _ from 'lodash';

const UploadImgList = forwardRef((props, ref) => {
  const {
    readOnly,
    deleteCallback,
    editImgInfo,
    uploadLoading = false,
  } = props;

  const [list, setList] = useState([]);

  // const [uploadLoading, setUploadLoading] = useState(false);

  const upload = () => {
    Utils.uploadFile((url, id) => {
      console.log(url);
      console.log(id);

      // list.push({
      //   url,
      //   id,
      // });

      console.log({ url, id });

      setList({ url, id });

      // console.log(list)

      let tmp = _.cloneDeep(list);
      tmp.push({ url, id });
      setList(tmp);

      // console.log(list)
      // console.log(editImgInfo)
      editImgInfo?.();
    }, 'url');
    // console.log("@")
    // console.log(list)
    let tmp = _.cloneDeep(list);
    setList(tmp);
    // console.log(list)
    editImgInfo;
    editImgInfo();
    editImgInfo ? editImgInfo() : '';
  };

  useImperativeHandle(ref, () => ({
    // 初始化图片
    initImg: (data: any) => {
      setList(data || []);
    },
    // 添加图片
    pushImg: (data: any, callback: any) => {
      let tmp = _.cloneDeep(list);
      tmp.push(data);
      setList(tmp);
      console.log(list);
    },
    // 获取所有图片
    getList: () => {
      return list;
    },
  }));

  // 删除图片
  const handleDelete = (data) => {
    let tmp = _.cloneDeep(list);
    tmp = tmp.filter((val) => val.id != data.id);
    setList(tmp);
    deleteCallback?.(tmp);
  };

  // 设置删除样式
  const setDeleteStyle = (id, bool) => {
    let tmp = _.cloneDeep(list);
    tmp = tmp.map((val: any) => {
      if (bool && val.id == id) {
        val.showDel = true;
      } else {
        delete val.showDel;
      }
      return val;
    });
    setList(tmp);
  };

  return (
    <div className={styles.wrap}>
      {!readOnly && (
        <Spin spinning={uploadLoading}>
          <div
            className={styles.add_wrap}
            onClick={() => {
              upload();
            }}
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传图片</div>
          </div>
        </Spin>
      )}
      {list?.map?.((val: any, index: any) => {
        const imageComp = (
          <div className={styles.item} key={index}>
            {val.showDel && (
              <div
                className={styles.item_delete}
                onClick={() => {
                  handleDelete(val);
                }}
                onMouseEnter={() => {
                  setDeleteStyle(val.id, true);
                }}
                onMouseLeave={() => {
                  setDeleteStyle(val.id, false);
                }}
              />
            )}
            <Image
              width={90}
              height={90}
              src={val.url}
              onMouseEnter={() => {
                setDeleteStyle(val.id, true);
              }}
              onMouseLeave={() => {
                setDeleteStyle(val.id, false);
              }}
            />
          </div>
        );

        return imageComp;
      })}
    </div>
  );
});
export default UploadImgList;
