import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from '../../utility/IntlMessages';
import { AntBreadcrumb } from '../AntBreadcrumb';
import Link from '../Link';
import { Breadcrumb } from 'antd';

const BreadcrumbList = ({ items }) => {
  return (
    <AntBreadcrumb>
      {items.map((breadcrumb) => (
        <Breadcrumb.Item
          className='page_breadcrumb__item'
          key={breadcrumb.title}>
          {breadcrumb.path ? (
            <Link to={breadcrumb.path}>
              <IntlMessages id={breadcrumb.title} values={breadcrumb?.values} />
            </Link>
          ) : (
            <IntlMessages id={breadcrumb.title} values={breadcrumb?.values} />
          )}
        </Breadcrumb.Item>
      ))}
    </AntBreadcrumb>
  );
};

BreadcrumbList.propTypes = {
  items: PropTypes.array,
};

BreadcrumbList.defaultProps = {};

export default BreadcrumbList;
