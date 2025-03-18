import React from 'react';
import CodeBox from 'src/@crema/core/DataDisplay/CodeBox';
import { CITIZEN_RELATIONS } from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import RenderGender from 'src/@crema/component/TableRender/RenderGender';
import RenderDate from 'src/@crema/component/TableRender/RenderDate';

export const CitizenRelationInformation = ({ data }) => {
  const { name, relations } = data || {};
  return (
    <div>
      <p>
        Thông tin thân nhân của đối tượng:
        <span className='warning-text-color'> {name}</span>
      </p>
      <CodeBox>
        {(relations || [{}, {}]).map((relation, index) => {
          const relationName =
            CITIZEN_RELATIONS.find((item) => item.value === relation?.relation)
              ?.label || 'Không xác định';
          const { full_name, other_name, gender, date_of_birth, cccd_number } =
            relation || {};
          return (
            <CodeBox.CodeBoxMeta key={`relation-item-${index}`}>
              <CodeBox.CodeBoxTitle>
                Quan hệ: {relationName}
              </CodeBox.CodeBoxTitle>
              <CodeBox.CodeBoxDescription>
                <p>
                  <IntlMessages id='table.citizenCCCDNumber' />: {cccd_number}
                </p>
                <p>
                  <IntlMessages id='table.citizenFullName' />: {full_name}
                </p>
                <p>
                  <IntlMessages id='table.citizenOtherName' />: {other_name}
                </p>
                <p>
                  <IntlMessages id='table.citizenGender' />:{' '}
                  <RenderGender value={gender} />
                </p>
                <p>
                  <IntlMessages id='table.citizenDateOfBirth' />:{' '}
                  <RenderDate value={date_of_birth} />
                </p>
              </CodeBox.CodeBoxDescription>
            </CodeBox.CodeBoxMeta>
          );
        })}
      </CodeBox>
    </div>
  );
};
