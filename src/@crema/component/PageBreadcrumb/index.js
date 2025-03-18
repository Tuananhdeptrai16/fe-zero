import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'src/shared/utils/Typeof';
import { getBreadcrumb } from 'src/@crema/utility/VerticalMenuUtils';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import BreadcrumbList from '../BreadcrumbList';
import SubHeaderAppTemplate from '../SubHeaderApp/SubHeaderAppTemplate';
import routesConfig from 'src/pages/routeConfig';

const PageBreadcrumb = () => {
  const { pathname } = useLocation();
  const [breadcrumbItem, setBreadcrumbItem] = useState([]);
  const [pageTitle, setPageTitle] = useState('sidebar.home');

  useEffect(() => {
    let breadcrumbList = getBreadcrumb(routesConfig, pathname);
    setBreadcrumbItem(breadcrumbList);
    if (!isEmpty(breadcrumbList)) {
      const title = breadcrumbList[breadcrumbList.length - 1]?.title;
      setPageTitle(title);
    } else {
      setPageTitle('');
    }
  }, [pathname]);

  if (isEmpty(breadcrumbItem)) {
    return null;
  }

  return (
    <SubHeaderAppTemplate
      title={<IntlMessages id={pageTitle} />}
      subTitle={<BreadcrumbList items={breadcrumbItem} />}
    />
  );
};

export default PageBreadcrumb;
