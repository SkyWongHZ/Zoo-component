import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Table, PaginationProps, TableProps } from 'antd';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';

export type AntdTableRefType = {
  resetTable: (param?: any) => Promise<void>;
};
export type AntdTablePropsType = {
  total: number;
  columns: TableProps<any>['columns'];
  dataSource: TableProps<any>['dataSource'];
  onFetch?: () => void;
  pagination?: TableProps<any>['pagination'];
  refresh?: number;
  isPagination?: boolean;
  [propName: string]: any;
};

const AntdTable = forwardRef<AntdTableRefType, AntdTablePropsType>(
  (props, ref) => {
    const {
      onFetch = () => {},
      total,
      columns,
      dataSource,
      pagination = {},
      refresh = 0,
      isPagination = true,
      ...rest
    } = props;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<any>(10);

    const handleChange: PaginationProps['onChange'] = (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    };

    useEffect(() => {
      onFetch(page, pageSize);
    }, [page, pageSize]);
    useEffect(() => {
      if (refresh) {
        onFetch(page, pageSize);
      }
    }, [refresh]);

    useImperativeHandle(ref, () => ({
      // 一般用于筛选项刷新列表，需要回到第一页
      resetTable: async (param = {}) => {
        if (page === 1) {
          onFetch(page, pageSize);
        } else {
          setPage(1);
        }
      },
      // 一般用于增删改，不需要重置页码
      refreshTable: async () => {
        onFetch(page, pageSize);
      },
      // 设置页码
      setPagation: async (page: any, pageSize: any) => {
        if (page) {
          setPage(typeof page == 'string' ? parseInt(page) : page);
        }
        if (pageSize) {
          setPageSize(
            typeof pageSize == 'string' ? parseInt(pageSize) : pageSize,
          );
        }
      },
      // 获取页码
      getPagation: () => {
        return { page, pageSize };
      },
    }));

    return (
      <div className={styles.wrap}>
        <ProTable
          style={{ flex: 1 }}
          columns={columns}
          rowKey="key"
          size="small"
          dataSource={dataSource}
          pagination={
            isPagination
              ? {
                  showQuickJumper: true,
                  size: 'small',
                  showTotal: (total) => {
                    return `共${total}条`;
                  },
                  current: page,
                  pageSize,
                  total,
                  onChange: handleChange,
                  ...pagination,
                }
              : false
          }
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
          search={false}
          options={{
            fullScreen: false,
            reload: false,
            density: false,
          }}
          {...rest}
        />
      </div>
    );
  },
);

export default AntdTable;
