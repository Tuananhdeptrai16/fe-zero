import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Grid, Row, Space } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import FilterItem from 'src/@crema/core/DataTable/DataTableFilter/FilterItem';
import PropTypes from 'prop-types';
import { FILTER_OPERATION, FILTER_TYPE } from 'src/shared/constants/DataTable';
import { isEmpty } from 'src/shared/utils/Typeof';

import styles from './style.module.scss';
import moment from 'moment/moment';
import { toSQLDate } from 'src/shared/utils/filter';
import FormContent from 'src/@crema/component/FormContent';

const { useBreakpoint } = Grid;

const GRID = {
  xxl: 6,
  xl: 8,
  lg: 8,
  md: 12,
  sm: 24,
};

const DataTableFilter = ({
  filters,
  initialValues,
  layout,
  onQuery: onQueryProps,
}) => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const { setFilter, setPage, event } = useDataTableContext();
  const [collapse, setCollapse] = useState(true);

  const minItemShowFilter = useMemo(() => {
    const grid = ['xxl', 'xl', 'lg', 'md', 'sm'];
    const nameGridActive = grid.find((name) => screens[name] && GRID[name]);

    if (nameGridActive) {
      return Math.ceil(24 / GRID[nameGridActive] - 1 || 1);
    }

    return 1;
  }, [screens]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  const isShowCollapse = filters?.length > minItemShowFilter;

  const onQuery = (values) => {
    const filterQuery = {};
    Object.keys(values).map((key) => {
      const value = values[key];
      if (!isEmpty(value)) {
        const filter = filters.find((filter) => filter?.name === key);

        if (filter?.buildQuery) {
          const query = filter?.buildQuery(value);
          if (query) {
            filterQuery[key] = query;
          }
          return;
        }

        switch (filter?.type) {
          case FILTER_TYPE.PERCENT:
          case FILTER_TYPE.NUMBER:
            if (!isEmpty(value[0])) {
              filterQuery[`${key}gte`] = {
                name: key,
                operation: FILTER_OPERATION.GTE,
                value: (value || [])[0],
              };
            }
            if (!isEmpty(value[1])) {
              filterQuery[`${key}lte`] = {
                name: key,
                operation: FILTER_OPERATION.LTE,
                value: (value || [])[1],
              };
            }
            break;
          case FILTER_TYPE.RANGE_DATE_PICKER:
            if (value[0]) {
              filterQuery[`${key}gte`] = {
                name: key,
                operation: FILTER_OPERATION.GTE,
                value: moment((value || [])[0])
                  .startOf('day')
                  .valueOf(),
              };
            }
            if (value[1]) {
              filterQuery[`${key}lte`] = {
                name: key,
                operation: FILTER_OPERATION.LTE,
                value: moment((value || [])[1])
                  .endOf('day')
                  .valueOf(),
              };
            }
            break;
          case FILTER_TYPE.DATE:
            if (value?.length > 1) {
              const startDate = moment((value || [])[0]).startOf('day');
              const endDate = moment((value || [])[1]).endOf('day');
              filterQuery[key] = toSQLDate(
                [startDate, endDate],
                filter.formatStr,
              );
            }
            break;
          case FILTER_TYPE.SELECT_AREA:
          case FILTER_TYPE.SELECT_PROVINCE:
          case FILTER_TYPE.SELECT:
          case FILTER_TYPE.SELECT_ASYNC:
            filterQuery[key] = {
              name: key,
              operation: FILTER_OPERATION.EQ,
              value: value[filter?.fieldNames?.value] || value,
            };
            break;
          case FILTER_TYPE.TEXT:
            filterQuery[key] = {
              name: key,
              operation: FILTER_OPERATION.LIKE_IGNORE_CASE,
              value: value,
            };
            break;
          default:
            filterQuery[key] = {
              name: key,
              operation: FILTER_OPERATION.LIKE,
              value: `%${value}%`,
            };
        }
      }
    });
    if (!isEmpty(onQueryProps)) {
      onQueryProps({ filterQuery, values });
    }
    setPage(1);
    setFilter(filterQuery);
  };

  const onReset = () => {
    form.resetFields();
    setFilter({});
    if (event?.onReset) {
      event?.onReset();
    }
  };

  const spanAction = useMemo(() => {
    if (collapse || !isShowCollapse) {
      return {
        xxl: { span: GRID.xxl },
        xl: { span: GRID.xl },
        lg: { span: GRID.lg },
        md: { span: GRID.md },
        span: GRID.sm,
      };
    } else {
      return {
        span: GRID.sm,
      };
    }
  }, [collapse, isShowCollapse]);

  return (
    <FormContent
      initialValues={initialValues}
      form={form}
      onFinish={onQuery}
      className={classNames(styles.dataTableFilter, {
        [styles.collapse]: collapse,
      })}>
      <Row gutter={[32, 8]} wrap>
        {filters.map((filter, index) => {
          const isHidden = collapse && index >= minItemShowFilter;
          const { type, label, name, ...options } = filter;
          return (
            <Col
              key={`filter-item-${index}`}
              xxl={{ span: GRID.xxl }}
              xl={{ span: GRID.xl }}
              lg={{ span: GRID.lg }}
              md={{ span: GRID.md }}
              span={GRID.sm}
              hidden={isHidden}>
              <FilterItem
                type={type}
                label={label}
                name={name}
                {...options}
                layout={layout}
              />
            </Col>
          );
        })}

        <Col {...spanAction} style={{ marginLeft: 'auto' }}>
          <Space className='ant-justify-end ant-w-100' size={[8, 0]}>
            <Button type='default' onClick={onReset}>
              Xóa bộ lọc
            </Button>
            <Button type='primary' htmlType='submit'>
              Áp dụng bộ lọc
            </Button>
            {isShowCollapse && (
              <Button type='link' onClick={toggleCollapse}>
                {collapse ? (
                  <>
                    Mở rộng&nbsp;
                    <DownOutlined />
                  </>
                ) : (
                  <>
                    Thu gọn&nbsp;
                    <UpOutlined />
                  </>
                )}
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </FormContent>
  );
};

DataTableFilter.propTypes = {
  filters: PropTypes.array,
  initialValues: PropTypes.object,
};

DataTableFilter.defaultProps = {
  filters: [],
  initialValues: {},
};

export default DataTableFilter;
