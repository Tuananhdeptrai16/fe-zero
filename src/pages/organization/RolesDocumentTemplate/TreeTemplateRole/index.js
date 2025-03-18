import React, { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { AppLoader } from 'src/@crema';
import { useParams } from 'react-router-dom';

const TreeTemplateRole = ({
  onChange,
  initCheckboxTemplateByOrganization,
  isSearchTemplateDepartment,
  idOrganizationSearchByDepartment,
}) => {
  const [listCheckbox, setListCheckboxTemplate] = useState(
    initCheckboxTemplateByOrganization,
  );
  const { id: organizationId } = useParams();

  useEffect(() => {
    onChange(listCheckbox);
  });

  const { isLoading, data } = useFetch({
    url: isSearchTemplateDepartment
      ? API.GET_LIST_DOCUMENT_TEMPLATE_BY_ORGANIZATION
      : API.GET_LIST_DOCUMENT_TEMPLATE,
    method: METHOD_FETCH.POST,
    body: {
      filters: isSearchTemplateDepartment
        ? [
            {
              name: 'organization_id',
              operation: 'eq',
              value: organizationId || idOrganizationSearchByDepartment,
            },
          ]
        : [],
      pageable: {
        page: 1,
        page_size: 1000,
      },
      sort: [{ property: 'display_name', direction: 'asc' }],
    },
  });

  const dataDocumentTypes = data?.result?.items?.map((item) => {
    return {
      id: isSearchTemplateDepartment ? item?.document_template_id : item?.id,
      document_type_id: isSearchTemplateDepartment
        ? item?.document_template_response?.document_type_id
        : item?.document_type_id,
      document_type: isSearchTemplateDepartment
        ? item?.document_template_response?.document_type
        : item?.document_type,
      name: isSearchTemplateDepartment
        ? item?.document_template_response?.name
        : item?.name,
      group_type: isSearchTemplateDepartment
        ? item?.document_template_response?.group_type
        : item?.group_type,
    };
  });

  const newDataDocumentTypesFillterNotDocument_type = dataDocumentTypes?.filter(
    (item) => {
      return item?.document_type !== undefined;
    },
  );

  const dataDocumentSortByName =
    newDataDocumentTypesFillterNotDocument_type?.sort((a, b) => {
      return a?.document_type?.name - b?.document_type?.name;
    });

  let dataUniqueDocumentTypes = [];
  dataDocumentSortByName?.forEach((documentType) => {
    const indexData = dataUniqueDocumentTypes?.findIndex((item) => {
      return item?.document_type_id === documentType?.document_type_id;
    });

    if (indexData === -1) {
      dataUniqueDocumentTypes?.push(documentType);
    } else {
      const newDocumentType = {
        ...documentType,
        document_type: {
          ...documentType?.document_type,
          isRepeat: true,
        },
      };
      dataUniqueDocumentTypes.splice(indexData + 1, 0, newDocumentType);
    }
  });

  const dataDocumentTypesFilter = dataUniqueDocumentTypes?.filter((item) => {
    return item?.document_type !== undefined && item?.document_type !== null;
  });

  const dataSourceTableTemplate = dataDocumentTypesFilter
    ?.map((item) => {
      const document_templates = {
        ...item,
        isChild: true,
      };
      return [item?.document_type, document_templates];
    })
    .flat();

  const listRow = dataSourceTableTemplate?.map((item, index) => {
    return {
      ...item,
      key: `template-${index}`,
    };
  });

  const filterListRow = listRow?.filter((item) => {
    return item?.isRepeat !== true;
  });

  const columns = [
    {
      title: 'Biểu mẫu',
      dataIndex: 'name',
      key: 'name',
      width: 450,
      render: (value, item) => {
        if (item?.isChild) {
          return <div style={{ marginLeft: '1.6rem' }}>{item.name}</div>;
        }
        if (item.display_name && item.isRepeat !== true) {
          return (
            <span
              style={{
                fontWeight: 500,
              }}>
              {item.display_name}
            </span>
          );
        }
        return null;
      },
    },
    {
      title: 'Được sử dụng',
      dataIndex: 'document_template',
      key: 'document_template',
      align: 'center',
      render: (value, item) => {
        if (item?.isChild) {
          return (
            <>
              <Checkbox
                defaultChecked={initCheckboxTemplateByOrganization?.includes(
                  item?.id,
                )}
                onChange={(e) => {
                  const dataCheckBoxTemplate = e?.target?.data;
                  setListCheckboxTemplate((prev) => {
                    const indexOldCheckBox = prev?.findIndex((item) => {
                      return item === dataCheckBoxTemplate;
                    });
                    if (indexOldCheckBox === -1) {
                      onChange([...prev, dataCheckBoxTemplate]);
                      return [...prev, dataCheckBoxTemplate];
                    } else {
                      const newDataCheckbox = prev;
                      newDataCheckbox.splice(indexOldCheckBox, 1);
                      onChange([...newDataCheckbox]);
                      return newDataCheckbox;
                    }
                  });
                }}
                data={item?.id}></Checkbox>
            </>
          );
        }
      },
    },
  ];

  if (isLoading || !data) {
    return <AppLoader />;
  }

  return (
    <Table
      size={'small'}
      columns={columns}
      dataSource={filterListRow}
      pagination={false}
      scroll={{ x: 'max-content' }}
      sticky={{
        offsetHeader: -26,
      }}
    />
  );
};

TreeTemplateRole.propTypes = {};

TreeTemplateRole.defaultProps = {};

export default TreeTemplateRole;
